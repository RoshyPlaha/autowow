#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const validatorPath = path.join(__dirname, '../.next/types/validator.ts');

if (!fs.existsSync(validatorPath)) {
  console.log('Validator file not found, skipping fix.');
  process.exit(0);
}

let content = fs.readFileSync(validatorPath, 'utf8');

// Replace ../../app/ with ../../src/app/ for all app routes
content = content.replace(/import\("\.\.\/\.\.\/app\//g, 'import("../../src/app/');
content = content.replace(/Validate \.\.\/\.\.\/app\//g, 'Validate ../../src/app/');

fs.writeFileSync(validatorPath, content, 'utf8');
console.log('Fixed validator.ts paths');

