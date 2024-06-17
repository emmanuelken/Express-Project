const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3001;

// Middleware for the time of the request
function onlyWorkingHours (req, res, next) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentDay = currentTime.getDay();

    const weekDay = currentDay >= 1 && currentDay <= 5;
    const workingHours = currentHour >= 9 && currentHour < 17;

    if (weekDay && workingHours) {
        next();
    } else {
        res.send('This App is only available Monday to Friday, from 9 to 17.');
    }
}

app.use(onlyWorkingHours);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
