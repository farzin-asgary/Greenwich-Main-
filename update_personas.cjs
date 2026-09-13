const fs = require('fs');
let code = fs.readFileSync('src/features/marketing/InteractivePersonasPage.tsx', 'utf8');

// Replace the grid with flex layout for better centering of 5 items
code = code.replace(
  '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">',
  '<div className="flex flex-wrap justify-center gap-6 lg:gap-8">'
);

code = code.replace(
  /className=\{`greenwich-card group relative(.*?) \$\{index === 3 \? 'lg:col-start-2' : ''\}`\}/,
  'className={`greenwich-card group relative$1 w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm`}'
);

fs.writeFileSync('src/features/marketing/InteractivePersonasPage.tsx', code);
