const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const pagesDir = path.join(rootDir, 'pages');

// 1. Fix favicon in index.html
const indexFile = path.join(rootDir, 'index.html');
if (fs.existsSync(indexFile)) {
    let content = fs.readFileSync(indexFile, 'utf8');
    content = content.replace(/<link rel="icon"[\s\S]*?href="data:image\/svg\+xml,[\s\S]*?">/g, '<link rel="icon" type="image/png" href="assets/images/logo.png">');
    fs.writeFileSync(indexFile, content);
    console.log('Fixed favicon in index.html');
}

// 2. Fix favicons in pages
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
pages.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/<link rel="icon"[\s\S]*?href="data:image\/svg\+xml,[\s\S]*?">/g, '<link rel="icon" type="image/png" href="../assets/images/logo.png">');
    fs.writeFileSync(filePath, content);
    console.log(`Fixed favicon in ${file}`);
});

// 3. Fix Home 2 UI issues (hamburger & Cho Oyu)
const home2File = path.join(pagesDir, 'home 2.html');
if (fs.existsSync(home2File)) {
    let content = fs.readFileSync(home2File, 'utf8');

    // Fix hamburger lines (if not already fixed)
    if (!content.includes('background:var(--text)')) {
        content = content.replace(/hamburger-line block w-6 h-0.5 bg-white/g, 'hamburger-line block w-6 h-0.5" style="background:var(--text)');
    }

    // Fix Cho Oyu image (already partially fixed but let's be sure)
    if (content.includes('alt="Cho Oyu"') && content.includes('src="https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?auto=format&fit=crop&w=600&q=80"')) {
        // already fixed or double src
        content = content.replace(/<img src=".*?"\s+alt="Cho Oyu" style=".*?" src=".*?" \/>/g, '<img src="https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?auto=format&fit=crop&w=600&q=80" alt="Cho Oyu" style="width:100%;height:100%;object-fit:cover;" />');
    }

    fs.writeFileSync(home2File, content);
    console.log('Final polish applied to Home 2');
}
