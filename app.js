var express = require('express');
var controller = require('./controller/controller.js');
var app = express();
app.use(express.static('./public/assets'));
app.set('view engine','ejs');
controller(app);
app.listen(process.env.PORT || 3000, function() {});
console.log('connected on log 3000');