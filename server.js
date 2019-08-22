const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    connectDB = require('./config/db');

connectDB();

app.use(express.json({ extended: false }))


app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.get('/', (req, res) => {

});

app.listen(process.env.PORT || 5000, () => {
    console.log('Started!');
});