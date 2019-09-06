const os = require('os');
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.dirname(path.dirname(process.cwd()));

const source = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.source.json')).toString());
let target;
if (!fs.existsSync(path.join(BASE_DIR, 'package.json'))) {
  target = source;
  target.author = path.basename(os.homedir()).replace(/(^| )[a-z]/g, (a) => a.toUpperCase());
  target.name = path.basename(BASE_DIR);
} else {
  target = JSON.parse(fs.readFileSync(path.join(BASE_DIR, 'package.json')).toString());
  Object.assign(target.dependencies, source.dependencies);
  Object.assign(target.devDependencies, source.devDependencies);
  target.scripts.start = source.scripts.start;
}
fs.writeFileSync(path.join(BASE_DIR, 'package.json'), JSON.stringify(target, null, 2));

fs.copyFileSync(path.join(__dirname, 'tsconfig.json'), path.join(BASE_DIR, 'tsconfig.json'));
fs.copyFileSync(path.join(__dirname, '.babelrc'), path.join(BASE_DIR, '.babelrc'));
fs.copyFileSync(path.join(__dirname, 'webpack.config.js'), path.join(BASE_DIR, 'webpack.config.js'));

if (!fs.existsSync(path.join(BASE_DIR, 'src'))) {
  fs.mkdirSync(path.join(BASE_DIR, 'src'));
}
fs.copyFileSync(path.join(__dirname, 'src', 'index.html'), path.join(BASE_DIR, 'src', 'index.html'));

if (!fs.existsSync(path.join(BASE_DIR, 'src', 'js'))) {
  fs.mkdirSync(path.join(BASE_DIR, 'src', 'js'));
}
fs.copyFileSync(path.join(__dirname, 'src', 'js', 'App.tsx'), path.join(BASE_DIR, 'src', 'js', 'App.tsx'));
fs.copyFileSync(path.join(__dirname, 'src', 'js', 'index.tsx'), path.join(BASE_DIR, 'src', 'js', 'index.tsx'));