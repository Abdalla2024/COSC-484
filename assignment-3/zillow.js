const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/v1/zillow/zestimate', (req, res) => {
    const { sqft, bed, bath } = req.query;

    // Check if all parameters are valid integers
    if (!sqft || !bed || !bath) {
        return res.status(400).json({ error: 'Missing required parameters: sqft, bed, bath' });
    }

    // Convert parameters to integers
    const sqftNum = parseInt(sqft);
    const bedNum = parseInt(bed);
    const bathNum = parseInt(bath);

    // Validate that all parameters are valid integers
    if (isNaN(sqftNum) || isNaN(bedNum) || isNaN(bathNum)) {
        return res.status(400).json({ error: 'All parameters must be valid integers' });
    }

    // Calculate Zestimate and return result
    const zestimate = sqftNum * bedNum * bathNum * 10;
    res.json({ zestimate });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
