const express = require('express');
const port = 4000;
const path = require('path');

const db=require('./config/mongo');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('Assets'));

var contact=[
    {
        Name:'Rohit Lohra',
        Mobile:'0113130488'
    }
]

app.get('/', function(req, res){
    Contact.find({}, function(err, contact){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('index.ejs',{
            title: 'List Of Contact!',
            list:contact
    });

    });
});

app.get('/test', function(req, res){
    return res.render('test.ejs',{
        title: 'Testing only',
    });
});

app.post('/create_contact', function(req, res){
    // return res.redirect('/test');
    // contact_list.push({
    //     Name:req.body.Name,
    //     Mobile:req.body.Mobile
    // });
    // return res.redirect('/');
    Contact.create({
        Name:req.body.Name,
        Mobile:req.body.Mobile
    }, function(err, Contact){
        if(err){console.log('error in creating a contact');
            return;
        }
        console.log('*****', Contact);
        return res.redirect('back');
    });
});

app.get('/delete_contact', function(req, res){
    // console.log(req.params);
    // let Mobile = req.params.Mobile;
    // let contactindex = contact_list.findIndex(contact => contact.Mobile == Mobile);

    // if(contactindex != -1){
    //     contact_list.splice(contactindex, 1);
    // }

    let id = req.query.id;
    console.log(id)
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from db');
            return;
        }
        return res.redirect('back');
    });
});



app.listen(port, function(err){
    if(err){
        console.log(err);
    }
    console.log('Express Server is running on Port:', port);
});