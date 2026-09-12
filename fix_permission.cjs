const fs = require('fs');
let code = fs.readFileSync('src/app/permissions/index.ts', 'utf8');

code = code.replace(
  "  | 'VIEW_OWN_PROFILE'",
  "  | 'VIEW_OWN_PROFILE'\n  | 'REDEEM_COUPON'"
);

code = code.replace(
  "    case 'CAFE':",
  "    case 'STAFF':\n      return '/dashboard/redeem';\n    case 'CAFE':"
);

fs.writeFileSync('src/app/permissions/index.ts', code);
