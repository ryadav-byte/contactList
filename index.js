const express = require('express')
const path = require('path')
const port = 8000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

var contacts = [
    {
        name: 'Ramakant Yadav',
        phone: '1234567870'
    },
    {
        name: 'Abhishek Dawas',
        phone: '9087654321'
    }
];

app.get('/', function(req, res){
    return res.render('home', {
        title:'Contact List',
        contact_list: contacts
    });
});

app.post('/create-contact', function(req, res){
    contacts.push(req.body);
    return res.redirect('back');
})


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server!', err);
        return;
    }
    console.log('Express server is up and running on the port:', 8000);
});