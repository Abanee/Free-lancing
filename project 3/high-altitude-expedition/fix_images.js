const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Replace logo
    const isRoot = path.dirname(filePath) === rootDir;
    const logoSrc = isRoot ? 'assets/images/logo.png' : '../assets/images/logo.png';
    const logoTag = `<img src="${logoSrc}" alt="Apex Ascent" class="h-8 w-auto">`;

    // Regex to find the mountain span
    const regex = /<span[^>]*>\s*⛰️\s*<\/span>/g;
    if (regex.test(content)) {
        content = content.replace(regex, logoTag);
        changed = true;
    }

    // Check if the old text-only icon was used with its literal ASCII text
    const regex2 = /<span[^>]*>\s*â›°\s*<\/span>/g;
    if (regex2.test(content)) {
        content = content.replace(regex2, logoTag);
        changed = true;
    }

    // 2. Fix service page specific images
    if (filePath.endsWith('service.html')) {
        // Fix Hero Background & Overlay
        const oldHeroRegex = /style="background-image:\s*url\('https:\/\/images\.unsplash\.com\/photo-1622547748225-3fc4abd2cca0[^>]*'\);"/;
        if (oldHeroRegex.test(content)) {
            content = content.replace(oldHeroRegex, `style="background-image: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1544198365-f5b11ebfa3eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80');"`);
            changed = true;
        }

        // Fix missing training image
        // Old image: https://images.unsplash.com/photo-1554735490-5974588cbc4b
        const brokenImageRegex = /src="https:\/\/images\.unsplash\.com\/photo-1554735490-[^"]*"/g;
        if (brokenImageRegex.test(content)) {
            content = content.replace(brokenImageRegex, `src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"`);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated images in: ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

walkDir(rootDir);
console.log('Image fixes complete!');
