const fs = require('fs');
let c = fs.readFileSync('pages/contact.html', 'utf8');
c = c.split('ðŸ“ ').join('📍');
c = c.split('âœ‰ï¸ ').join('✉️');
c = c.split('â °').join('🕒');
c = c.split('RÃ©sumÃ©').join('Résumé');
c = c.split('rÃ©sumÃ©').join('résumé');
fs.writeFileSync('pages/contact.html', c, 'utf8');
console.log('Fixed contact.html icons');
