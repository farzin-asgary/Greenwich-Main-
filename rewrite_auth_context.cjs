const fs = require('fs');
const content = `
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, hasPermission, Permission } from '../permissions';

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
  isLoading: boolean;
  login: (phone: string, role: UserRole, name?: string) => void;
  logout: () => void;
  checkPermission: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isLive = import.meta.env.VITE_API_MODE === 'live';
const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (isLive) {
          const response = await fetch(\`\${API_BASE}/auth/me\`, { credentials: 'include' });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            setUser(null);
          }
        } else {
          // Mock mode: Keep the old localstorage behavior for UI testing, but default to null if not logged in
          const savedRole = localStorage.getItem('greenwich_active_role') as UserRole;
          if (savedRole) {
            const DEFAULT_USERS: Record<string, UserAccount> = {
              CUSTOMER: { id: 'u-cust-01', name: 'علی علوی', phone: '09121112233', role: 'CUSTOMER' },
              CAFE: { id: 'u-cafe-01', name: 'مدیریت کافه نادری', phone: '09128889900', role: 'CAFE', organizationName: 'کافه نادری', branchName: 'شعبه جمهوری' },
              STAFF: { id: 'u-staff-01', name: 'کارمند کافه', phone: '09123334455', role: 'STAFF', organizationName: 'کافه نادری', branchName: 'شعبه جمهوری' },
              ADMIN: { id: 'u-admin-01', name: 'راهبر ارشد', phone: '09120000000', role: 'ADMIN' },
              CONTENT_WRITER: { id: 'u-writer-01', name: 'نویسنده', phone: '09125556677', role: 'CONTENT_WRITER' },
            };
            setUser(DEFAULT_USERS[savedRole] || null);
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMe();
  }, []);

  const role = user?.role || 'CUSTOMER';

  const login = (phone: string, selectedRole: UserRole, name?: string) => {
    const newUser: UserAccount = {
      id: \`u-\${Date.now()}\`,
      name: name || 'کاربر سیستم',
      phone,
      role: selectedRole,
    };
    setUser(newUser);
    if (!isLive) localStorage.setItem('greenwich_active_role', selectedRole);
  };

  const logout = async () => {
    if (isLive) {
      try {
        await fetch(\`\${API_BASE}/auth/logout\`, { method: 'POST', credentials: 'include' });
      } catch (e) {
        console.error('Logout error', e);
      }
    }
    localStorage.removeItem('greenwich_active_role');
    setUser(null);
  };

  const checkPermission = (permission: Permission): boolean => {
    return hasPermission(role, permission);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#0b1312] flex items-center justify-center text-[#d4af37]">در حال بررسی وضعیت دسترسی...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
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
`;
fs.writeFileSync('src/app/auth/AuthContext.tsx', content);

// Now fix PublicLayout.tsx to remove role switcher banner
let layoutCode = fs.readFileSync('src/layouts/public/PublicLayout.tsx', 'utf8');
layoutCode = layoutCode.replace(/const { role, switchRole, isAuthenticated } = useAuth\(\);/, 'const { isAuthenticated } = useAuth();');

// The banner starts at <div className="bg-[#121e1c] border-b border-emerald-900/60 py-2 px-4 and ends before <header
const headerIndex = layoutCode.indexOf('      {/* Main Public Header */}');
if (headerIndex !== -1) {
    const bannerRegex = /\{\/\* Quick Role Switcher Banner for Evaluation & Testing \*\/\}.*?(?=      \{\/\* Main Public Header \*\/})/s;
    layoutCode = layoutCode.replace(bannerRegex, '');
    fs.writeFileSync('src/layouts/public/PublicLayout.tsx', layoutCode);
}
