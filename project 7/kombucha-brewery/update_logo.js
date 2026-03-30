const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const indexFile = path.join(baseDir, 'index.html');
const pagesDir = path.join(baseDir, 'pages');

// Update index.html
if (fs.existsSync(indexFile)) {
    let content = fs.readFileSync(indexFile, 'utf8');
    content = content.replace('<a href="index.html" class="logo"><img src="assets/logo.png" alt="Kombucha Brewery" class="logo-img"></a>', '<a href="index.html" class="logo"><img src="assets/logo.png" alt="Kombucha Brewery" class="logo-img"> Kombucha<span>.</span></a>');
    content = content.replace('<a href="index.html" class="footer-logo"><img src="assets/logo.png" alt="Kombucha Brewery" class="footer-logo-img"></a>', '<a href="index.html" class="footer-logo"><img src="assets/logo.png" alt="Kombucha Brewery" class="footer-logo-img"> Kombucha<span>.</span></a>');
    fs.writeFileSync(indexFile, content, 'utf8');
    console.log('Updated index.html');
}

// Update pages/*.html
if (fs.existsSync(pagesDir)) {
    const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
    for (const file of files) {
        const filePath = path.join(pagesDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        content = content.replace('<a href="../index.html" class="logo"><img src="../assets/logo.png" alt="Kombucha Brewery" class="logo-img"></a>', '<a href="../index.html" class="logo"><img src="../assets/logo.png" alt="Kombucha Brewery" class="logo-img"> Kombucha<span>.</span></a>');
        content = content.replace('<a href="../index.html" class="footer-logo"><img src="../assets/logo.png" alt="Kombucha Brewery" class="footer-logo-img"></a>', '<a href="../index.html" class="footer-logo"><img src="../assets/logo.png" alt="Kombucha Brewery" class="footer-logo-img"> Kombucha<span>.</span></a>');

        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
