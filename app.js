const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
const PORT = 51040;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// API Documentation route
app.get('/api-docs', (req, res) => {
    res.json({
        'Users API': {
            'GET /api/users': 'Get all users',
            'GET /api/users/:id': 'Get user by ID',
            'POST /api/users': 'Create new user',
            'PUT /api/users/:id': 'Update user by ID',
            'DELETE /api/users/:id': 'Delete user by ID'
        },
        'Weather API': {
            'GET /api/weather': 'Get all weather data',
            'GET /api/weather/:city': 'Get weather by city',
            'POST /api/weather': 'Add new weather data',
            'PUT /api/weather/:city': 'Update weather data for city'
        }
    });
});

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
