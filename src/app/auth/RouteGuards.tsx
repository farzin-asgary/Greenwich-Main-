import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { UserRole, Permission, getDefaultRouteForRole } from '../permissions';

interface GuardProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<GuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

interface RoleGuardProps extends GuardProps {
  allowedRoles: UserRole[];
}

export const RequireRole: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to default route for their role
    return <Navigate to={getDefaultRouteForRole(role)} replace />;
  }

  return <>{children}</>;
};

interface PermissionGuardProps extends GuardProps {
  requiredPermission: Permission;
}

export const RequirePermission: React.FC<PermissionGuardProps> = ({ children, requiredPermission }) => {
  const { checkPermission, role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!checkPermission(requiredPermission)) {
    return <Navigate to={getDefaultRouteForRole(role)} replace />;
  }

  return <>{children}</>;
};
