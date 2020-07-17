const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ContactListDB', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error Connecting to the Database!'));
db.once('open', function() {
  console.log('Successfully Connected to the Database!');
});

