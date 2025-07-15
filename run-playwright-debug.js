const path = require('path');
const { spawn } = require('child_process');

const file = process.argv[2];
const workspace = process.cwd();
let relPath = path.relative(workspace, file);

// Convert Windows backslashes to forward slashes for Playwright
relPath = relPath.split(path.sep).join('/');
console.log('Running:', relPath); // <-- Add this line

const cli = path.join('node_modules', '@playwright', 'test', 'cli.js');
const args = ['test', relPath]; // <-- 'test' argument is required

const child = spawn('node', [cli, ...args], { stdio: 'inherit' });
child.on('exit', code => process.exit(code));