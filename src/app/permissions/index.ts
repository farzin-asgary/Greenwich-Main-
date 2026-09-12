/**
 * Permission & Role Definitions for Greenwich Club
 */

export type UserRole = 'CUSTOMER' | 'CAFE' | 'STAFF' | 'ADMIN' | 'CONTENT_WRITER';

export type Permission =
  | 'VIEW_OWN_PROFILE'
  | 'REDEEM_COUPON'
  | 'VIEW_OWN_VISITS'
  | 'VIEW_CAFE_CUSTOMERS'
  | 'MANAGE_CAFE_OFFERS'
  | 'MANAGE_CAFE_TABLES'
  | 'MANAGE_CAFE_STAFF'
  | 'VIEW_PLATFORM_ANALYTICS'
  | 'MANAGE_ORGANIZATIONS'
  | 'MANAGE_PLATFORM_USERS'
  | 'CREATE_CONTENT'
  | 'EDIT_OWN_CONTENT'
  | 'PUBLISH_CONTENT'
  | 'MANAGE_ALL_CONTENT';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  STAFF: [
    'VIEW_OWN_PROFILE',
    'REDEEM_COUPON',
  ],
  CUSTOMER: [
    'VIEW_OWN_PROFILE',
    'VIEW_OWN_VISITS',
  ],
  CAFE: [
    'VIEW_OWN_PROFILE',
    'VIEW_CAFE_CUSTOMERS',
    'MANAGE_CAFE_OFFERS',
    'MANAGE_CAFE_TABLES',
    'MANAGE_CAFE_STAFF',
  ],
  ADMIN: [
    'VIEW_OWN_PROFILE',
    'VIEW_CAFE_CUSTOMERS',
    'MANAGE_CAFE_OFFERS',
    'MANAGE_CAFE_TABLES',
    'MANAGE_CAFE_STAFF',
    'VIEW_PLATFORM_ANALYTICS',
    'MANAGE_ORGANIZATIONS',
    'MANAGE_PLATFORM_USERS',
    'CREATE_CONTENT',
    'EDIT_OWN_CONTENT',
    'PUBLISH_CONTENT',
    'MANAGE_ALL_CONTENT',
  ],
  CONTENT_WRITER: [
    'VIEW_OWN_PROFILE',
    'CREATE_CONTENT',
    'EDIT_OWN_CONTENT',
  ],
};

export function hasPermission(role: UserRole | null | undefined, permission: Permission): boolean {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function getDefaultRouteForRole(role: UserRole): string {
  switch (role) {
    case 'CUSTOMER':
      return '/panel/user';
    case 'STAFF':
      return '/dashboard/redeem';
    case 'CAFE':
      return '/dashboard/overview';
    case 'ADMIN':
      return '/admin-panel/overview';
    case 'CONTENT_WRITER':
      return '/content-studio/dashboard';
    default:
      return '/';
  }
}
