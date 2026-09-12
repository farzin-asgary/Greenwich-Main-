#!/bin/bash

# 1. Create API Structure
mkdir -p api/requirements api/greenwich/settings api/apps/{accounts,organizations,visits,offers,feedback,analytics,content}
touch api/requirements/{base.txt,dev.txt,prod.txt}
touch api/greenwich/__init__.py api/greenwich/settings/__init__.py
touch api/greenwich/settings/{base.py,dev.py,staging.py,prod.py}

cat << 'INNER_EOF' > api/manage.py
#!/usr/bin/env python
import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'greenwich.settings.dev')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError("Couldn't import Django.") from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
INNER_EOF

cat << 'INNER_EOF' > api/greenwich/urls.py
from django.urls import path
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('api/health', health_check),
]
INNER_EOF

for app in accounts organizations visits offers feedback analytics content; do
    touch api/apps/$app/__init__.py
    cat << INNER_EOF > api/apps/$app/apps.py
from django.apps import AppConfig

class ${app^}Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.$app'
INNER_EOF
done

# 2. Create Infra Structure
mkdir -p infra/nginx

cat << 'INNER_EOF' > infra/Dockerfile.web
FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY infra/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
INNER_EOF

cat << 'INNER_EOF' > infra/Dockerfile.api
FROM python:3.12-slim
WORKDIR /app
COPY api/requirements/base.txt .
COPY api/requirements/prod.txt .
RUN pip install -r prod.txt
COPY api/ .
EXPOSE 8000
CMD ["gunicorn", "greenwich.wsgi:application", "--bind", "0.0.0.0:8000"]
INNER_EOF

cat << 'INNER_EOF' > infra/docker-compose.yml
version: '3.8'
services:
  web:
    build: 
      context: ..
      dockerfile: infra/Dockerfile.web
    ports:
      - "80:80"
    depends_on:
      - api
  api:
    build:
      context: ..
      dockerfile: infra/Dockerfile.api
    environment:
      - DJANGO_SETTINGS_MODULE=greenwich.settings.dev
  db:
    image: postgres:17-alpine
    environment:
      - POSTGRES_USER=greenwich
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=greenwich
  redis:
    image: redis:7-alpine
INNER_EOF

cat << 'INNER_EOF' > infra/nginx/default.conf
server {
    listen 80;
    
    location /api/ {
        proxy_pass http://api:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
INNER_EOF

cat << 'INNER_EOF' > api/.env.example
DJANGO_SETTINGS_MODULE=greenwich.settings.prod
SECRET_KEY=
ALLOWED_HOSTS=
DATABASE_URL=postgres://...
REDIS_URL=redis://redis:6379/0
CELERY_BROKER_URL=redis://redis:6379/1
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
SMS_PROVIDER=
SMS_API_KEY=
DEMO_MODE=false
SESSION_COOKIE_SECURE=true
INNER_EOF

echo "Foundation structure generated."
