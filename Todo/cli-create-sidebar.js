const fs = require('fs');
const path = require('path');
const dirname = __dirname;

const filelist = fs.readdirSync(path.join(dirname, 'docs'));
console.log(filelist);
let content = '';
filelist.forEach((value, index) => {
  content += `- [${value}](/docs/${value})\n`;
});

fs.writeFileSync(path.join(dirname, '_sidebar.md'), content, {});
console.log(content);

// nodemon cli-create-sidebar.js