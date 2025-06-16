const { execSync } = require('child_process');

try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('npm install succeeded.');
} catch (err) {
  console.error('npm install failed.');
  process.exit(1);
}
