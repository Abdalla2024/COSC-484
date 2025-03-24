const fs = require('fs');

// Check if exactly one argument is provided
if (process.argv.length !== 3) {
    console.error('Error: Please provide exactly one file path argument');
    process.exit(1);
}

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const text = data.toLowerCase();
    const words = text.split(/\s+/);
    const targetWords = ['towson', 'cis', 'web', 'development'];
    
    const counts = {};
    targetWords.forEach(word => {
        counts[word] = words.filter(w => w === word).length;
    });

    console.log('Word counts:');
    Object.entries(counts).forEach(([word, count]) => {
        console.log(`${word}: ${count}`);
    });
});

