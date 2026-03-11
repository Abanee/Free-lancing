const fs = require('fs');
let c = fs.readFileSync('pages/contact.html', 'utf8');

c = c.replace(/<div class="text-2xl mb-2">.*<\/div>\s*<div class="font-heading font-semibold mb-1".*>Base Office<\/div>/, '<div class="text-2xl mb-2">📍</div>\n            <div class="font-heading font-semibold mb-1" style="color:var(--text)">Base Office</div>');
c = c.replace(/<div class="text-2xl mb-2">.*<\/div>\s*<div class="font-heading font-semibold mb-1".*>Email<\/div>/, '<div class="text-2xl mb-2">✉️</div>\n            <div class="font-heading font-semibold mb-1" style="color:var(--text)">Email</div>');
c = c.replace(/<div class="text-2xl mb-2">.*<\/div>\s*<div class="font-heading font-semibold mb-1".*>Office Hours<\/div>/, '<div class="text-2xl mb-2">🕒</div>\n            <div class="font-heading font-semibold mb-1" style="color:var(--text)">Office Hours</div>');

// The Résumé label
c = c.replace(/Climbing CV \/ RÃ©sumÃ©/g, 'Climbing CV / Résumé');

fs.writeFileSync('pages/contact.html', c, 'utf8');
console.log('Done');
