// Import the Express library
const express = require('express');
const app = express();

// Define the port we want to use
const PORT = 3000;

// Tell Express to serve all static files (HTML, CSS, images) from the 'public' folder
app.use(express.static('public'));

// Start the server and listen for connections
app.listen(PORT, () => {
    console.log(`🚀 SIGMAA Beans server is running live at http://localhost:${PORT}`);
});