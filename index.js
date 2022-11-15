const express = require('express');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));

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

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});