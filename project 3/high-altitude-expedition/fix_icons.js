const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// 1. Fix service.html
let servicePath = path.join(rootDir, 'pages', 'service.html');
if (fs.existsSync(servicePath)) {
    let content = fs.readFileSync(servicePath, 'utf8');

    // Core Offerings section (text-2xl mb-4)
    content = content.replace(/(<div class="w-12 h-12[^>]*text-2xl mb-4"[^>]*>)(.*?)(<\/div>\s*<h3[^>]*>IFMGA-Certified Guiding)/, "$1🧗$3");
    content = content.replace(/(<div class="w-12 h-12[^>]*text-2xl mb-4"[^>]*>)(.*?)(<\/div>\s*<h3[^>]*>Medical & Emergency Care)/, "$1🏥$3");
    content = content.replace(/(<div class="w-12 h-12[^>]*text-2xl mb-4"[^>]*>)(.*?)(<\/div>\s*<h3[^>]*>Communications & Forecasting)/, "$1📡$3");
    content = content.replace(/(<div class="w-12 h-12[^>]*text-2xl mb-4"[^>]*>)(.*?)(<\/div>\s*<h3[^>]*>Oxygen Systems)/, "$1🫁$3");
    content = content.replace(/(<div class="w-12 h-12[^>]*text-2xl mb-4"[^>]*>)(.*?)(<\/div>\s*<h3[^>]*>Camp Setup & Logistics)/, "$1⛺$3");
    content = content.replace(/(<div class="w-12 h-12[^>]*text-2xl mb-4"[^>]*>)(.*?)(<\/div>\s*<h3[^>]*>Permits & Documentation)/, "$1📋$3");

    // Complete Expedition Support section (text-4xl mb-4)
    content = content.replace(/(<div class="text-4xl mb-4">)(.*?)(<\/div>\s*<h3[^>]*>Expert Guiding)/, "$1🧗$3");
    content = content.replace(/(<div class="text-4xl mb-4">)(.*?)(<\/div>\s*<h3[^>]*>Medical Support)/, "$1🏥$3");
    content = content.replace(/(<div class="text-4xl mb-4">)(.*?)(<\/div>\s*<h3[^>]*>Sat Communication)/, "$1📡$3");
    content = content.replace(/(<div class="text-4xl mb-4">)(.*?)(<\/div>\s*<h3[^>]*>Gear & Logistics)/, "$1🎒$3");

    // Checkmarks in lists
    content = content.replace(/âœ“/g, '✓');

    fs.writeFileSync(servicePath, content, 'utf8');
    console.log('Fixed service.html');
}

// 1.5 Fix index.html
let indexRouter = path.join(rootDir, 'index.html');
if (fs.existsSync(indexRouter)) {
    let content = fs.readFileSync(indexRouter, 'utf8');

    // Complete Expedition Support section (text-4xl mb-4)
    content = content.replace(/(<div class="text-4xl mb-4">)(.*?)(<\/div>\s*<h3[^>]*>Expert Guiding)/, "$1🧗$3");
    content = content.replace(/(<div class="text-4xl mb-4">)(.*?)(<\/div>\s*<h3[^>]*>Medical Support)/, "$1🏥$3");
    content = content.replace(/(<div class="text-4xl mb-4">)(.*?)(<\/div>\s*<h3[^>]*>Sat Communication)/, "$1📡$3");
    content = content.replace(/(<div class="text-4xl mb-4">)(.*?)(<\/div>\s*<h3[^>]*>Gear & Logistics)/, "$1🎒$3");

    fs.writeFileSync(indexRouter, content, 'utf8');
    console.log('Fixed index.html icons');
}


// 2. Fix contact.html
let contactPath = path.join(rootDir, 'pages', 'contact.html');
if (fs.existsSync(contactPath)) {
    let content = fs.readFileSync(contactPath, 'utf8');
    content = content.replace(/(<div class="w-12 h-12 rounded[^>]*text-xl[^>]*>)(.*?)(<\/div>\s*<div>\s*<h3[^>]*>Base Office)/, "$1📍$3");
    content = content.replace(/(<div class="w-12 h-12 rounded[^>]*text-xl[^>]*>)(.*?)(<\/div>\s*<div>\s*<h3[^>]*>Phone)/, "$1📞$3");
    content = content.replace(/(<div class="w-12 h-12 rounded[^>]*text-xl[^>]*>)(.*?)(<\/div>\s*<div>\s*<h3[^>]*>Email)/, "$1✉️$3");
    fs.writeFileSync(contactPath, content, 'utf8');
    console.log('Fixed contact.html');
}

// 3. Fix home 2.html (Cho Oyu image)
let home2Path = path.join(rootDir, 'pages', 'home 2.html');
if (fs.existsSync(home2Path)) {
    let content = fs.readFileSync(home2Path, 'utf8');
    // Replace src="Cho Oyu" with valid Unsplash image URL
    content = content.replace(/src="Cho Oyu"/g, 'src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"');
    fs.writeFileSync(home2Path, content, 'utf8');
    console.log('Fixed home 2.html');
}

// 4. Fix about.html (Marcus Reid Author Avatar)
let aboutPath = path.join(rootDir, 'pages', 'about.html');
if (fs.existsSync(aboutPath)) {
    let content = fs.readFileSync(aboutPath, 'utf8');
    // The placeholder emoji looks like <div style="width:56px;... font-size:1.5rem;">👤</div>
    // Let's match the div and replace it entirely with an <img> tag.
    const avatarRegex = /<div[^>]*width:56px;height:56px[^>]*>(.*?)<\/div>(\s*<div>\s*<div[^>]*>Marcus Reid<\/div>)/;
    if (avatarRegex.test(content)) {
        content = content.replace(avatarRegex, '<img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" alt="Marcus Reid" style="width:56px;height:56px;min-width:56px;border-radius:50%;object-fit:cover;border:2px solid var(--border);" />$2');
    }
    fs.writeFileSync(aboutPath, content, 'utf8');
    console.log('Fixed about.html');
}
