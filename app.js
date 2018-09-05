var express = require('express');
var controller = require('./controller/controller.js');
var app = express();
app.use(express.static('./public/assets'));
app.set('view engine','ejs');
controller(app);
app.listen(3000);
console.log('connected on log 3000');