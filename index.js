//We need to require express to use it
const express = require('express');


//We need to require path to use view files
const path = require('path');


//This is the port we will be using
const port = 8000;


//requiring the mongoose file to access it in this file
const db = require('./config/mongoose');
const Contact = require('./models/Contact');

//This is for firing up the express server
const app = express();


//This is to tell express that we will be using ejs as our view engine
app.set('view engine', 'ejs');


//This is to set our folder where our html files are present 
app.set('views', path.join(__dirname,'views'));


//This is the middleware which we are using to encode the data we are recieving from form
app.use(express.urlencoded());


//This is to access our static files which we are using to style or project or add some other features using javascript 
// or anything else which is there in the static folder that we will be needing for our project
app.use(express.static('assets'));



//This is the controller for home page
app.get('/', function(req, res){

    Contact.find({}, function(err, contactList){
        if(err){
            console.log('Error in fetching contacts');
            return;
        }
        return res.render('home', {
            title:'Contact List',
            contact_list: contactList
        });
    })

});


//This is to create a new contact 
app.post('/create-contact', function(req, res){
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('Error in creating contact!', err);
            return;
        }

        return res.redirect('back');
    });
});


//To delete a contact from our database
app.get('/delete-contact', function(req, res){

    let contactID = req.query.id;
    Contact.findByIdAndDelete(contactID, function(err){
        if(err){
            contactID.log('Error in deleting the contact from database!');
            return;
        }
        return res.redirect('back');
    });
});


// This will work as default route when page is not found
app.use(function(req, res){
    res.sendStatus(404);
 });


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server!', err);
        return;
    }
    console.log('Express server is up and running on the port:', 8000);
});

