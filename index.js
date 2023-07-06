const express = require('express');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); // This is important!
// app.use(methodOverride('_method')); // So is this!

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Cassian Andor'});
});
app.get('/about', (request, response) => {
    response.render('about.ejs');
});

const actorsRouter = require('./routes/actors')
app.use('/actors', actorsRouter);

const mealsRouter = require('./routes/meals')
app.use('/meals', mealsRouter);

const tasksRouter = require('./routes/tasks.js')
app.use('/tasks', tasksRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});