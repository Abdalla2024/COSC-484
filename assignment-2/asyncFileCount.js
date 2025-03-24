const fs = require('fs');
const path = require('path');

if (process.argv.length !== 4) {
    console.error('Error: Please provide exactly two arguments: directory path and file extension');
    process.exit(1);
}

const directoryPath = process.argv[2];
const extension = process.argv[3];

// Ensure the extension starts with a dot
const fileExtension = extension.startsWith('.') ? extension : '.' + extension;

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter files with the specified extension
    const matchingFiles = files.filter(file => 
        path.extname(file).toLowerCase() === fileExtension.toLowerCase()
    );

    console.log(`Number of ${fileExtension} files: ${matchingFiles.length}`);
    console.log('Files:', matchingFiles);
});
