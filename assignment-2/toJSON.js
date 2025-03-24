const fs = require('fs');

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

    // Split the file content into lines
    const lines = data.trim().split('\n');

    // Check if there are at least 3 lines
    if (lines.length < 3) {
        console.error('Error: File must contain at least 3 lines');
        return;
    }

    const jsonObject = {
        fname: lines[0],
        lname: lines[1],
        location: lines[2],
        other: lines.length > 3 ? lines.slice(3).join(' ') : 'N/A'
    };

    console.log(JSON.stringify(jsonObject, null, 2));
});
