const express = require('express');
const router = express.Router();
const { users, weatherData } = require('../data/mockData');

// Users CRUD Operations
router.get('/users', (req, res) => {
    res.json(users);
});

router.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

router.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

router.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.age = req.body.age || user.age;

    res.json(user);
});

router.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    users.splice(userIndex, 1);
    res.json({ message: 'User deleted successfully' });
});

// Weather Operations
router.get('/weather', (req, res) => {
    res.json(weatherData);
});

router.get('/weather/:city', (req, res) => {
    const cityWeather = weatherData.find(w => 
        w.city.toLowerCase() === req.params.city.toLowerCase()
    );
    if (!cityWeather) return res.status(404).json({ message: 'City weather data not found' });
    res.json(cityWeather);
});

router.post('/weather', (req, res) => {
    const newWeather = {
        id: weatherData.length + 1,
        city: req.body.city,
        temperature: req.body.temperature,
        condition: req.body.condition,
        humidity: req.body.humidity
    };
    weatherData.push(newWeather);
    res.status(201).json(newWeather);
});

router.put('/weather/:city', (req, res) => {
    const weather = weatherData.find(w => 
        w.city.toLowerCase() === req.params.city.toLowerCase()
    );
    if (!weather) return res.status(404).json({ message: 'City weather data not found' });

    weather.temperature = req.body.temperature || weather.temperature;
    weather.condition = req.body.condition || weather.condition;
    weather.humidity = req.body.humidity || weather.humidity;

    res.json(weather);
});

module.exports = router;