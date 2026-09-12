const fs = require('fs');
const files = [
  'src/features/marketing/LandingPage.tsx',
  'src/features/marketing/ForCafesPage.tsx',
  'src/features/marketing/InteractivePersonasPage.tsx',
  'src/features/marketing/PricingPage.tsx',
  'src/features/marketing/FeaturesPage.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/..\/..\/shared\/ui\/PublicLayout/g, '../../layouts/public/PublicLayout');
    fs.writeFileSync(file, content);
  }
});
