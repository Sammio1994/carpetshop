const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const app = express();
const path = require('path');

// Serve static files when in production
if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, 'client/build')));

    // For any route not defined in the backend API, serve the index.html from the React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

module.exports = app;