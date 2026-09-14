import fs from 'fs';
const file = 'app/routes/home/intro.module.css';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('height: 100vh;', 'height: 100vh;\n  height: 100dvh;\n  min-height: 100vh;\n  min-height: 100dvh;');
fs.writeFileSync(file, content);
