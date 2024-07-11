const express = require('express');
const app = express();
const { connectDB } = require('./config/db');
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);




connectDB()

app.get('/', (req, res) => {
    res.json({ message: 'Express connection established.' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
