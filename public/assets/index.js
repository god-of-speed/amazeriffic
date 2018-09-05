

function roll(todos){
$('#con nav ul li').on('click', function(e){
var e2 = e.target;
var lid = $(e2).attr('id');
if(lid === 'li1'){
    $('main').empty();
    $('main').load('index.html #divcon', function(){
      var makeTabActive = function(tab){

    var tabNum = '#tabdiv ul li:nth-child('+tab+')';
       $('#tabdiv ul li').removeClass('colorChange');
       $(tabNum).addClass('colorChange');
       $('#content').empty();
};

function instruc(){
        $('#content .del').on('click', function(e){
           var e1=e.target;
           var sel = $(e1).attr('id');
           var selA = sel.substring(1);
           var id = selA;
           
           $('<div>',{
               id:'blackcon',
           }).appendTo($('body'));
            var height = window.innerHeight + 'px';
            $('#blackcon').css({'height':height});
            $('<div>', {
                 id:'middle'
            }).appendTo($('#blackcon'));
            $('<h4>',{
                text:'Do you want to delete this entry?'
            }).appendTo($('#middle'));
            $('<button>',{
                id:'yes',
                text:'Yes'
            }).appendTo($('#middle'));
            $('<button>',{
                id:'no',
                text:'No'
            }).appendTo($('#middle'));
            $('#middle #yes').on('click', function(){
                  $.ajax({
               type:'DELETE',
               url:'/todo'+id,
               success:function(data){
                   todos = data;
                   $('#tabdiv ul li:nth-child(1)').trigger('click');
               }
           });
            $('#blackcon').remove();
            });
        $('#middle #no').on('click', function(){
            $('#blackcon').remove();
        });

         });

         $('#content .edit').on('click', function(e){
             var e1=e.target;
           var sel = $(e1).attr('id');
           var selA = sel.substring(1);
           var id = selA;
            
           $.ajax({
               type:'GET',
               url:'/find'+id,
               success:function(data){
                  $('<div>',{
               id:'blackcon',
           }).appendTo($('body'));
            var height = window.innerHeight + 'px';
            $('#blackcon').css({'height':height});
            $('<div>', {
                 id:'middle'
            }).appendTo($('#blackcon'));
                $('<label>',{
                    for:'in1',
                    text:'Description'
                }).appendTo($('#middle')).hide();
                $('<input>',{
                    id:'in1',
                   type:'text',
                   value:data[0].description,
                   click:function(){
                       $(this).prev().fadeIn(400);
                       $(this).val('');
                   }
                }).appendTo($('#middle'));
                $('<label>',{
                    for:'in2',
                    text:'Tags'
                }).appendTo($('#middle')).hide();
                $('<input>',{
                    id:'in2',
                   type:'text',
                   value:data[0].tags,
                   click:function(){
                       $(this).prev().fadeIn(400);
                       $(this).val('');
                   }
                }).appendTo($('#middle'));
                $('<button>',{
                id:'yes',
                text:'Ok'
            }).appendTo($('#middle'));
            $('<button>',{
                id:'no',
                text:'Cancel'
            }).appendTo($('#middle'));
                
                $('#middle #yes').on('click', function(){
                    $('#err').remove();
                    var _id = data[0]._id;
                     var in1 = $('#middle #in1').val();
                     var in2 = $('#middle #in2').val();
                     var err;
                     if(in1 === '' || in2 === ''){
                         err = 'please fill the provided spaces';
                     }
                        if(!err){
                    var todoP ={_id:_id,description:in1,tags:in2}; 
                     $.ajax({
                         type:'PUT',
                         url:'/todo',
                         data:todoP,
                         success:function(rF){
                             todos = rF;
                             $('#blackcon').remove();
                         }
                     });
                        }else{
                             $('<div>',{
                                id:'err'
                               }).insertBefore($('#middle button')).hide();

                                      $('<ul>', {
                                      id:'myul'
                                }).appendTo($('#err'));
                                   $('<li>', {
                                       text:err
                                   }).appendTo($('#myul'));
                                    $('#err').fadeIn(400);
                        }
                });

                $('#middle #no').on('click', function(){
                          $('#blackcon').remove();
                })
               }
           });

         });
       

      }

      $('#tabdiv ul li:nth-child(1)').on('click',function(){
       makeTabActive(1);
       var todos2 = todos.slice(0);
       var todosReverse = todos2.reverse();
         if(todosReverse == []){
             return false;
         }
        for(var i=0; i<todosReverse.length; i++){
        
         $('<h3>', {
             id:'H3',
           text:todosReverse[i].description
        }).appendTo($('#content'));


        $('<button>', {
               class:'del',
               id:'d'+todosReverse[i]._id,
               text:'Delete'
        }).appendTo($('#content'));

        $('<button>', {
            class:'edit',
              id: 'e'+todosReverse[i]._id,
              text:'Edit'
        }).appendTo($('#content'));
        }
    instruc();
    });
      
    
    $('#tabdiv ul li:nth-child(2)').on('click', function(){
        makeTabActive(2);
           for(var i=0; i<todos.length; i++){
                $('<h3>', {
                    id:'H3',
           text:todos[i].description
        }).appendTo($('#content'));
       $('<button>', {
               class:'del',
               id:'d'+todos[i]._id,
               text:'Delete'
        }).appendTo($('#content'));

        $('<button>', {
              class:'edit',
              id: 'e'+todos[i]._id,
              text:'Edit'
        }).appendTo($('#content'));        
        }
      instruc();
     });
       
    
     $('#tabdiv ul li:nth-child(3)').on('click', function(){
        makeTabActive(3);
          var arr = [];
         todos.forEach(function(todo){
              todo.tags.forEach(function(item){
                  if(arr.indexOf(item) === -1){
                      arr.push(item);
                  }
              });
         });
            var organizedByTag = [];
          arr.forEach(function(item){
              var tarr =[];
            todos.forEach(function(todo){
               if(todo.tags.indexOf(item) !== -1){
                   tarr.push(todo.description);
               }
            });
             organizedByTag.push({tagName:item,tagProp:tarr});
          });

        organizedByTag.forEach(function(tag){
            $('<h3>', {
                       id:'tagH3',
                       text:'Tag By: '+ tag.tagName
            }).appendTo($('#content'));
            var $ul = $('<ul>',{id:'tagList'});
            tag.tagProp.forEach(function(item){
                  $('<li>', {
                     text:item
                  }).appendTo($ul);
            });
            $($ul).appendTo($('#content'));
        });
        
     });

    $('#tabdiv ul li:nth-child(4)').on('click', function(){
    makeTabActive(4);
    var organizedByDate = [];
    todos.forEach(function(todo){
       var dat = todo.date_entry;
       var set = todo.set_date;
       var text = todo.description;
       organizedByDate.push({
           entry_date : dat,
           set_date:set,
           text:text
       });
    });

       organizedByDate.forEach(function(todo){
            var $h3 = $('<h3>', {
                       id:'tagH3',
                       text:'Entry Date: '+ todo.entry_date
            });
            $('<span>', {
               text:'Goal Date:' + todo.set_date
            }).appendTo($h3);      
            
            var $ul = $('<ul>',{id:'tagList'});
                  $('<li>', {
                     text:todo.text
                  }).appendTo($ul);
                    $($h3).appendTo($('#content'));
            $($ul).appendTo($('#content'));
            });
            
        });


    $('#tabdiv ul li:nth-child(5)').on('click', function(){
        makeTabActive(5);
        $('<label>',{
                    text:'To-Do Name'
                }).appendTo($('#content')).hide();
        $('<input>', {
                        type:'text',
                        placeholder:'Add an item',
                        click:function(){
                            $(this).prev().fadeIn(400);
                        }
                     }).appendTo($('#content'));
         $('<label>',{
                    text:'Tags'
                }).appendTo($('#content')).hide();
        $('<input>', {
                        type:'text',
                        placeholder:'Add tags seperated by the comma (,) punctuation mark',
                        click:function(){
                            $(this).prev().fadeIn(400);
                        }
                     }).appendTo($('#content'));
        $('<label>',{
                    text:'Set date of completion'
                }).appendTo($('#content')).hide();
        $('<input>',{
            type: 'Date',
            click:function(){
                $(this).prev().fadeIn(400);
                        }
        }).appendTo($('#content'));
        $('<button>', {
                       id:'inputbtn',
                       text:'Add',
                       click:function(){
                           $('#err').remove();
                           var i = 0;
                           var $inp1 = $('input').eq(0).val();
                           var $inp2 = $('input').eq(1).val();
                           var $inp3 = $('input').eq(2).val();
                          var err;
                          if($inp1 === '' || $inp2 === '' || $inp3 === ''){
                              err = 'Please fill the form completely!';
                          }

                           if(!err){
                               console.log('hell yea');
                            var inp1C = $inp1.charAt(0).toUpperCase();
                           var inp1S = $inp1.substring(1);
                           var inp1 = inp1C+inp1S
                           console.log($inp1,$inp2,$inp3);
                           var todo = {"tags":$inp2,"description":inp1,"set":$inp3};

                           $.ajax({
                             url:'/todo',
                             type: 'POST',
                             data:todo,
                             success: function(data){
                                todos = data;
                                $('input').val('');
                             }
                           });
                                
                           }else{
                               $('<div>',{
                                id:'err'
                               }).insertBefore($('#inputbtn')).hide();

                                      $('<ul>', {
                                      id:'myul'
                                }).appendTo($('#err'));
                                   $('<li>', {
                                       text:err
                                   }).appendTo($('#myul'));
                                    $('#err').fadeIn(400);
                           }
                       }  
                      }).appendTo($('#content'));
        

    });

    $('#tabdiv ul li:first-child').trigger('click');

    });
     
}else if(lid === 'li2'){
    $('main').empty();

      $('<div>',{
               id:'blackcon',
           }).appendTo($('body'));
            var height = window.innerHeight + 'px';
            $('#blackcon').css({'height':height});
            $('<div>', {
                 id:'middle'
            }).appendTo($('#blackcon'));
                $('<label>',{
                    for:'first-name',
                    text:'First-name'
                }).appendTo($('#middle')).hide();
                $('<input>',{
                    id:'in1',
                   type:'text',
                   placeholder:'Enter First-Name Here',
                   click:function(){
                       $(this).prev().fadeIn(400);
                   }
                }).appendTo($('#middle'));
                $('<label>',{
                    for:'last-name',
                    text:'Last-name'
                }).appendTo($('#middle')).hide();
                $('<input>',{
                    id:'in2',
                   type:'text',
                   placeholder:'Enter Last-Name Here',
                   click:function(){
                       $(this).prev().fadeIn(400);
                   }
                }).appendTo($('#middle'));
                $('<label>',{
                    for:'password',
                    text:'Password'
                }).appendTo($('#middle')).hide();
                $('<input>',{
                    id:'in3',
                   type:'password',
                   placeholder:'Enter password here',
                   click:function(){
                       $(this).prev().fadeIn(400);
                   }
                }).appendTo($('#middle'));
                $('<label>',{
                    for:'email',
                    text:'Email'
                }).appendTo($('#middle')).hide();
                $('<input>',{
                    id:'in4',
                   type:'email',
                   placeholder:'Enter your email Here',
                   click:function(){
                       $(this).prev().fadeIn(400);
                   }
                }).appendTo($('#middle'));
                $('<button>',{
                id:'yes',
                text:'Submit'
            }).appendTo($('#middle'));
            $('<button>',{
                id:'no',
                text:'Cancel'
            }).appendTo($('#middle'));
                
                $('#middle #yes').on('click', function(){
                    $('#err').remove();
                     var in1 = $('#middle #in1').val();
                     var in2 = $('#middle #in2').val();
                     var in3 = $('#middle #in3').val();
                     var in4 = $('#middle #in4').val();
                     var err;
                     if(in1 === '' || in2 === '' || in3 === '' || in4 === ''){
                         err = 'Please fill up the provided spaces';
                     }

                     if(!err){
                         var todoP ={firstname:in1,lastname:in2,pass:in3,email:in4}; 

                     $.ajax({
                         type:'POST',
                         url:'/me',
                         data:todoP,
                         success:function(data){
                             $('#blackcon').remove();
                             $('#con nav ul li:first').trigger('click');
                             $('<div>', {
                                id:'personal'
                             }).prependTo('#divcon #tabdiv');
                            if(new Date().getHours() < 12){
                               $('h3', {
                                text:'Good Morning ' + data.firstname
                            }).appendTo($('#personal'));
                            }else if(new Date().getHours() < 17){
                                $('h3', {
                                text:'Good Afternoon ' + data.firstname
                            }).appendTo($('#personal'));
                            }else{
                                $('h3', {
                                text:'Good Evening ' + data.firstname
                            }).appendTo($('#personal'));
                            }
                           
                         }
                     });
                     }else{
                         $('<div>',{
                                id:'err'
                               }).insertBefore($('#middle button')).hide();

                                      $('<ul>', {
                                      id:'myul'
                                }).appendTo($('#err'));
                                   $('<li>', {
                                       text:err
                                   }).appendTo($('#myul'));
                                    $('#err').fadeIn(400);
                     }
                });

                $('#middle #no').on('click', function(){
                          $('#blackcon').remove();
                          $('#con nav ul li:first').trigger('click');
                });


}else if(lid === 'li3'){
    $('main').empty();
    $('main').load('faq.html #divcon', function(){
      $('#faq #ask').hide();
    $('#faq h2').on('click', function(e){
     var e1 = e.target;
     if($(this).next().is(':visible')){
          $(this).next().fadeOut(500);
     }else{
       $(this).next().fadeIn(400);
     };
  });
    });
    
}else{
    $('main').empty();
    $('main').load('support.html #divcon');
}
});
$('#con nav ul li:first').trigger('click');
}
   
$(document).ready(function(){
    $.get('/index', function(todos){
         roll(todos);
    });
});