const fs = require('fs');
let code = fs.readFileSync('src/app/router/AppRouter.tsx', 'utf8');

// Replace LoginPage import
code = code.replace(
  "import { LoginPage } from '../../features/marketing/LoginPage';",
  `import { LoginPage } from '../../features/auth/LoginPage';
import { ForgotPasswordPage } from '../../features/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '../../features/auth/ResetPasswordPage';
import { FirstTimePasswordPage } from '../../features/auth/FirstTimePasswordPage';
import { LockedAccountPage } from '../../features/auth/LockedAccountPage';`
);

// Add the auth routes
const authRoutes = `<Route path="/login" element={<LoginPage />} />
          <Route path="/login/forgot" element={<ForgotPasswordPage />} />
          <Route path="/login/reset/:token" element={<ResetPasswordPage />} />
          <Route path="/login/first-time" element={<FirstTimePasswordPage />} />
          <Route path="/login/locked" element={<LockedAccountPage />} />`;

code = code.replace('<Route path="/login" element={<LoginPage />} />', authRoutes);

fs.writeFileSync('src/app/router/AppRouter.tsx', code);
