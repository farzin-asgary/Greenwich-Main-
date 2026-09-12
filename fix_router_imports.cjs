const fs = require('fs');
let code = fs.readFileSync('src/app/router/AppRouter.tsx', 'utf8');

// The file might contain multiple imports for the same things.
const lines = code.split('\n');
const seenImports = new Set();
const newLines = [];
for (const line of lines) {
  if (line.trim().startsWith('import ') && line.includes(' from ')) {
    if (seenImports.has(line.trim())) {
      continue;
    }
    seenImports.add(line.trim());
  }
  newLines.push(line);
}

fs.writeFileSync('src/app/router/AppRouter.tsx', newLines.join('\n'));
