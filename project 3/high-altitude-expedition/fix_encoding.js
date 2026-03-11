const fs = require('fs');
const path = require('path');

const replacements = {
    'â›°': '⛰️',
    'â€”': '—',
    'â€“': '–',
    'Ã—': '×',
    'Oâ‚‚': 'O₂',
    'Â©': '©',
    'Â·': '·',
    'ðŸ§—â€â™‚ï¸ ': '🧗‍♂️',
    'ðŸ§—': '🧗',
    'ðŸ ¥': '🏥',
    'ðŸ“¡': '📡',
    'ðŸŽ’': '🎒',
    'ðŸŽ¿': '🫁',
    'ðŸ •ï¸ ': '⛺',
    'ðŸ“‹': '📋',
    'ðŸ‘¨': '👨',
    'ðŸ‘©': '👩',
    'ðŸ§”': '🧓',
    'ðŸŽŽ': '🎟️'
};

function processFile(filePath) {
    if (!filePath.endsWith('.html')) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [bad, good] of Object.entries(replacements)) {
        if (content.includes(bad)) {
            content = content.split(bad).join(good);
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${filePath}`);
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

walkDir(__dirname);
console.log('Done!');
