
$(document).ready(function () {

    var local_obj = [];
    var click = true;
    var count_board = 0;
    var count_task = 0;
    var count_id = 0;

    var factory=function(obj,title){
        if(obj=="card"){return new Tasks(title);}
        else{return new Boards(title);}
    }

    var status_finder=function(status,title){
        switch(status){
           case "new":
               $("#new").append('<li id="li1">'+title  +'</li>');
               break;
           case "in-progress":
               $("#in-progress").append('<li id="li1">'+title  +'</li>');
               break;
           case "review":
               $("#review").append('<li id="li1">'+title +'</li>');
               break;
           case "done":
               $("#done").append('<li id="li1">'+ title +'</li>');
               break;
   }
       }

    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        };
    }

    $('#intro').hide();
    var board=new Boards('sample');
    board.get_cards();

    $('#newboard-button').click(function () {
        board.createCard();
    });


    $('[id^="bc"]').live('click',function(){
        obj_id=this.id.toString();
        obj_id=obj_id.substr(2);
       for(var i=0;i<local_obj.length;i++) {
           if(local_obj[i].id.toString()===obj_id) {
               if(!click){
                   $('#back_layer').addClass('show_bl');
                   $('back_layer').css('opacity','0');
                   $('#task_table').empty();

               $('#task_table').append($('<p>'+local_obj[i].title+'</p><button id="card_add" class="' + obj_id+ '">Create Card!</button><input type="text" id="card_text" >'));
               $('#task_table').append($('<ul id="sortable" class="article"><div id="new" class="cards col-lg-4 col-md-4 col-sm-4 col-xs-4"><label>New Cards</label></div><div id="review" class="cards col-lg-4 col-md-4 col-sm-4 col-xs-4"><label>Review</label></div><div id="in-progress" class="cards col-lg-4 col-md-4 col-sm-4 col-xs-4"><label>In progress</label></div><div id="done" class="cards col-lg-4 col-md-4 col-sm-4 col-xs-4"><label>Done</label></div></ul>'));
               for(var j=0;j<local_obj[i].cards.length;j++) {
                   status_finder(local_obj[i].cards[j].status,local_obj[i].cards[j].title)
               }

               }else {$('#back_layer').removeClass('show_bl');}
           }
       }
       click=!click;
    });


    $('#card_add').live('click',function () {
        var card=$('#card_text').val();
        status_finder("new",card);
        var retrievedObject = localStorage.getItem(this.getAttribute('class'));
        var task = factory("task",card);
        retrievedObject = JSON.parse(retrievedObject);
        retrievedObject.cards.push(task);
        localStorage.setItem(retrievedObject.id, JSON.stringify(retrievedObject));
    });


    function divClicked() {
        var text = $(this).text();
        var length = text.length;
        var editableText = $("<textarea />");
        editableText.val(text);
        $(this).replaceWith(editableText);
        editableText.focus();
        editableText.blur(editableTextBlurred);
    }

    function editableTextBlurred() {
        var html = $(this).val();
        var viewableText = $("<li id='li1'>");
        viewableText.html(html);
        $(this).replaceWith(viewableText);
        $(viewableText).click(divClicked);
    }

$(document).click(function() {
   if(click){
  if( this.id != '#task_table') {
    $("#task_table").show();
  }
  }else{
       $('#task_table').hide();

   }
});
    $('#li1').live('click', divClicked);

    function Boards(title) {
        this.id = count_id++;
        this.title = title;
        this.cards = [];
        this.state=new LocalStorage();
        this.get_cards=function() {
            for (i in localStorage) {
                var retrievedObject = localStorage.getItem(i);
                retrievedObject = JSON.parse(retrievedObject);
                local_obj.push(retrievedObject);
                strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + retrievedObject.id + '"> <p id="image_"><img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p><p id=title>' + retrievedObject.title + '</p></div>';
                $(strng).appendTo(".row");
                count_id++;
            }
        }
        this.createCard=function () {
            this.state.createCard();
        }

    };

    function LocalStorage(){
        this.createCard=function(){
            count_board++;
            var text=$('#newboard-input').val();
            var board = factory("card",text);
            local_obj.push(board);
            localStorage.setItem(board.id, JSON.stringify(board));
            strng='<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc'+ retrievedObject.id+ '"><p><img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p><p id=title>Title</p></div>';
            $(strng).text(board.title).appendTo(".row");
        }

    };

    function SQLStorage(){

    };

    function Tasks(title) {
        count_task++;
        task_id = 'task{0}'.format(count_task);
        this.id = task_id;
        this.title = title;
        this.status = "new";
    }
    $('.add').click(function(){
       $('#input_fields').toggle();
    });

});
