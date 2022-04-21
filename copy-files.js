const fs = require('fs');

//cpx \"{package.json,README.md}\" dist

fs.copyFileSync('package.json', 'dist/package.json');
fs.copyFileSync('README.md', 'dist/README.md');