import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, hasPermission, Permission, getDefaultRouteForRole } from '../permissions';

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  organizationName?: string;
  branchName?: string;
}

interface AuthContextType {
  user: UserAccount | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (phone: string, role: UserRole, name?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  checkPermission: (permission: Permission) => boolean;
}

const DEFAULT_USERS: Record<UserRole, UserAccount> = {
  CUSTOMER: {
    id: 'u-cust-01',
    name: 'علی علوی',
    phone: '09121112233',
    role: 'CUSTOMER',
  },
  CAFE: {
    id: 'u-cafe-01',
    name: 'مدیریت کافه نادری',
    phone: '09128889900',
    role: 'CAFE',
    organizationName: 'کافه نادری',
    branchName: 'شعبه جمهوری',
  },
  ADMIN: {
    id: 'u-admin-01',
    name: 'راهبر ارشد گرینویچ',
    phone: '09120000000',
    role: 'ADMIN',
    organizationName: 'ستاد مرکزی گرینویچ کلاب',
  },
  CONTENT_WRITER: {
    id: 'u-writer-01',
    name: 'مریم سهرابی (نویسنده)',
    phone: '09125556677',
    role: 'CONTENT_WRITER',
    organizationName: 'استودیو محتوای گرینویچ',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('greenwich_active_role');
    return (saved as UserRole) || 'CAFE';
  });

  const [user, setUser] = useState<UserAccount | null>(() => {
    const savedRole = localStorage.getItem('greenwich_active_role') as UserRole;
    return DEFAULT_USERS[savedRole || 'CAFE'];
  });

  useEffect(() => {
    localStorage.setItem('greenwich_active_role', role);
  }, [role]);

  const switchRole = (newRole: UserRole) => {
    setRole(newRole);
    setUser(DEFAULT_USERS[newRole]);
  };

  const login = (phone: string, selectedRole: UserRole, name?: string) => {
    const newUser: UserAccount = {
      id: `u-${Date.now()}`,
      name: name || (selectedRole === 'CUSTOMER' ? 'کاربر گرینویچ' : 'مدیر سیستم'),
      phone,
      role: selectedRole,
      organizationName: selectedRole === 'CAFE' ? 'کافه نادری' : undefined,
    };
    setUser(newUser);
    setRole(selectedRole);
  };

  const logout = () => {
    setUser(null);
  };

  const checkPermission = (permission: Permission): boolean => {
    return hasPermission(role, permission);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
