const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rohitlohra3036:viVzJ5VlCodVoRE9@cluster0.t61npng.mongodb.net/contactdb');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error connecting to DB'));

db.once('open', function(){
    console.log('Successfully connected to the Database');
});