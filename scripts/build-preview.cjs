const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const schema = JSON.parse(fs.readFileSync(path.join(root,'config/fields.json'),'utf8'));
fs.writeFileSync(path.join(root,'preview/config.js'),'window.MCDCI_CONFIG = '+JSON.stringify({schema},null,2)+';\n');
console.log('Offline preview configuration updated.');
