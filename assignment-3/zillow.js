const express = require('express');
const app = express();
const port = 3000;

const houses = [
    { price: 240000, city: "baltimore" },
    { price: 300000, city: "austin" },
    { price: 400000, city: "austin" },
    { price: 1000000, city: "seattle" },
    { price: 325000, city: "baltimore" },
    { price: 550000, city: "seattle" },
    { price: 250000, city: "boston" }
];

app.use(express.json());

app.get('/v1/zillow/zestimate', (req, res) => {
    const { sqft, bed, bath } = req.query;

    // Check if all parameters are valid integers
    if (!sqft || !bed || !bath) {
        return res.status(404).json({ error: 'Missing required parameters: sqft, bed, bath' });
    }

    // Convert parameters to integers
    const sqftNum = parseInt(sqft);
    const bedNum = parseInt(bed);
    const bathNum = parseInt(bath);

    // Validate that all parameters are valid integers
    if (isNaN(sqftNum) || isNaN(bedNum) || isNaN(bathNum)) {
        return res.status(404).json({ error: 'All parameters must be valid integers' });
    }

    // Calculate Zestimate and return result
    const zestimate = sqftNum * bedNum * bathNum * 10;
    res.json({ zestimate });
});

// New endpoint for houses
app.get('/v1/zillow/houses', (req, res) => {
    const { city } = req.query;
    
    // If no city is provided, return empty array
    if (!city) {
        return res.json([]);
    }
    
    // Filter houses by city
    const filteredHouses = houses.filter(house => 
        house.city.toLowerCase() === city.toLowerCase()
    );
    
    // Return filtered houses or empty array if none found
    res.json(filteredHouses);
});

// New endpoint for prices
app.get('/v1/zillow/prices', (req, res) => {
    const { usd } = req.query;

    // If no price provided, return 404
    if (!usd) {
        return res.status(404).json({ error: 'Missing required parameter: usd' });
    }

    const price = parseInt(usd);

    // If price is not a valid integer, return 404
    if (isNaN(price)) {
        return res.status(404).json({ error: 'Price must be a valid integer' });
    }

    // Filter by price
    const filteredHouses = houses.filter(house => 
        house.price <= price
    );

    // Return filtered houses with 200 status code
    res.status(200).json(filteredHouses);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
