const mongoose = require('mongoose'),
    config = require('config'),
    db = config.get('mongoURI');

const connectDB = () => {
    mongoose.connect(db,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        })
        .then(() =>{
            console.log('Database connected');
        })
}
module.exports = connectDB;