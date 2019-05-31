var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/amazeriffic');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var  TodoSchema = new mongoose.Schema({
    _id:{
        type:Number
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:[String]
    },
    date_entry:{
        type:Date
    },
    set_date:{
        type:Date
    }
});
var UserSchema = new mongoose.Schema({
    _id:{
        type:Number
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    pass:{
        Type:String
    },
    email:{
        type:String
    }
});
var Todo = mongoose.model('Todo',TodoSchema);
var User = mongoose.model('User',UserSchema);

module.exports = function(app){

app.get('/', function(req,res){
res.sendFile('index.html');
});

app.get('/index', function(req,res){
Todo.find({}, function(err,data){
if(err){
    res.sendFile('404.html');
}else{
    res.json(data);
}
});
});

app.post('/todo', urlencodedParser, function(req,res){
    var i = 0;
    Todo.find({}, function(err,data){
        blu = [];
         if(err){res.send('Error')}else{
             data.forEach(function(item){
               blu.push(item._id);
             });
            blu.forEach(function(item){
                if(item > i){
                    i = item;
                }
            });
            var dt = new Date();
            var mt = (dt.getMonth() + 1) < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            var dat = dt.getDate()  < 10 ? '0' + dt.getDate()  : dt.getDate();
            var yr = dt.getFullYear();
              var tagsMe = req.body.tags.split(',');
 var newTodo = new Todo({"_id":i+=1,"description":req.body.description,"tags":tagsMe,"date_entry":mt + ' ' + dat + ', '+ yr + '.',
"set_date":req.body.set
});
 newTodo.save(function(err,data){
     if(err){
         res.send('Error');
     }else{
         Todo.find({}, function(err,data){
             if(err){
                 res.send('Error');
             }else{
                 res.json(data);
             }
         });
     }
 });
         }
    });

});

app.delete('/todo:id', function(req,res){
    console.log(req.params.id);
    Todo.findByIdAndRemove({_id:req.params.id},function(err,data){
         if(err){res.send('Error')}else{
             Todo.find({}, function(err,data){
               if(err){
                   res.send('Error');
               }else{
                   res.json(data);
               }
             });
         }
    });
});

app.get('/find:id', function(req,res){
    console.log(req.params.id);
  Todo.find({_id:req.params.id}, function(err,data){
      if(err){
          res.send('Error');
      }else{
          res.json(data);
      }
  })
});
 
app.put('/todo', urlencodedParser, function(req,res){
    var tagsMe = req.body.tags.split(',');
     Todo.findByIdAndUpdate({_id:req.body._id},{description:req.body.description,tags:tagsMe},function(err,data){
       if(err){res.send('Error');}else{
           Todo.find({},function(err,data){
               if(err){res.send('Error');}else{
                   res.json(data);
               }
           });
       }
     });
});

app.post('/me',urlencodedParser, function(req,res){
   var i=0;
   User.find({}, function(err,data){
       if(err){
           res.send('Error');
       }else{
           ar = [];
           data.forEach(function(item){
               ar.push(item._id);
           });
          ar.forEach(function(item){
              if(item > i){
                  i = item;
              }
          });
    var newUser = new User({_id:i+=1,firstname:req.body.firstname,lastname:req.body.lastname,pass:req.body.pass,email:req.body.email});
    newUser.save(function(err,data){
         if(err){
             res.send('Error');
         }else{
             console.log(data);
             res.json(data);
         }
    });
       }
   });
});

};