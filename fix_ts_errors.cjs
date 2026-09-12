const fs = require('fs');

// 1. Add reference for ImportMeta
let clientCode = fs.readFileSync('src/shared/api/client.ts', 'utf8');
clientCode = '/// <reference types="vite/client" />\n' + clientCode;
fs.writeFileSync('src/shared/api/client.ts', clientCode);

let authCode = fs.readFileSync('src/app/auth/AuthContext.tsx', 'utf8');
authCode = '/// <reference types="vite/client" />\n' + authCode;
fs.writeFileSync('src/app/auth/AuthContext.tsx', authCode);

// 2. Add STAFF role
let permCode = fs.readFileSync('src/app/permissions/index.ts', 'utf8');
permCode = permCode.replace("export type UserRole = 'CUSTOMER' | 'CAFE' | 'ADMIN' | 'CONTENT_WRITER';", "export type UserRole = 'CUSTOMER' | 'CAFE' | 'STAFF' | 'ADMIN' | 'CONTENT_WRITER';");

// And also add REDEEM_COUPON to RolePermissions
const staffPerms = `  STAFF: [
    'VIEW_OWN_PROFILE',
    'REDEEM_COUPON',
  ],`;
permCode = permCode.replace("export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {", "export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {\n" + staffPerms);

// We need to add REDEEM_COUPON to the Permission type union if it's not there, or to CAFE.
// Let's just check the file first.
fs.writeFileSync('src/app/permissions/index.ts', permCode);
