const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const Note = require('./app/models/note.model.js');

mongoose.Promise = global.Promise;



mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
var db = mongoose.connection;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.json({"message":"take a quick note"});

})

app.get('/add',(req,res)=>{
    res.json({"message":"add note"});

})
app.get('/notes/search',function(req,res){  //query params
    var regex = new RegExp(req.query.q,'i')
    return Note.find({title:regex},function(err,q){
        return res.send(q);
    });
});

require('./app/routes/note.routes.js')(app);

app.listen(3000,(req,res)=>{
    console.log("listening on port 3000");
})