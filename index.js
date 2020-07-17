const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/Contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


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


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server!', err);
        return;
    }
    console.log('Express server is up and running on the port:', 8000);
});

