const fs = require('fs');
const path = require('path');

function walk(dir, suffix) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        let fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath, suffix));
        } else if (fullPath.endsWith(suffix)) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = walk('c:/Users/abane/Music/Free_lancing/Free-lancing/Demo', '.html');
let changedCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Add dir="rtl" to <html> if not present
    content = content.replace(/<html (.*?)>/, (match, p1) => {
        if (!p1.includes('dir=')) {
            return `<html ${p1} dir="rtl">`;
        } else if (p1.includes('dir="ltr"')) {
            return `<html ${p1.replace('dir="ltr"', 'dir="rtl"')}>`;
        }
        return match;
    });

    // Add dir-toggle if missing and theme-toggle is present
    if (content.includes('id="theme-toggle"') && !content.includes('id="dir-toggle"')) {
        // match spaces before the button to keep indentation
        content = content.replace(/( *)<button id="theme-toggle"/g, '$1<button id="dir-toggle" class="dir-toggle" aria-label="Toggle LTR/RTL">LTR</button>\n$1<button id="theme-toggle"');
    }

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        changedCount++;
        console.log('Updated HTML:', file);
    }
});

console.log('Total HTML files updated:', changedCount);

// Update main.js to set default to rtl, and to show oppsite direction on button
const mainJsFile = 'c:/Users/abane/Music/Free_lancing/Free-lancing/Demo/assets/js/main.js';
let mainJsContent = fs.readFileSync(mainJsFile, 'utf8');

let jsChanged = false;
// 1. In initDirToggle: show opposite direction text
if (mainJsContent.includes(`dirToggle.textContent = currentDir === 'rtl' ? 'RTL' : 'LTR';`)) {
    mainJsContent = mainJsContent.replace(
        `dirToggle.textContent = currentDir === 'rtl' ? 'RTL' : 'LTR';`,
        `dirToggle.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';`
    );
    mainJsContent = mainJsContent.replace(
        `btn.textContent = newDir === 'rtl' ? 'RTL' : 'LTR';`,
        `btn.textContent = newDir === 'rtl' ? 'LTR' : 'RTL';`
    );
    jsChanged = true;
}

// 2. In detectSavedDir: set default rtl if no saved
if (mainJsContent.includes(`function detectSavedDir() {
  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
  }
}`)) {
    mainJsContent = mainJsContent.replace(
        `function detectSavedDir() {
  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
  }`,
        `function detectSavedDir() {
  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
  } else {
    document.documentElement.setAttribute('dir', 'rtl');
  }`
    );
    jsChanged = true;
}

if (jsChanged) {
    fs.writeFileSync(mainJsFile, mainJsContent);
    console.log('Updated main.js');
}

