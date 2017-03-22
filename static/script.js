$(document).ready(function(){
    var local_obj=[];
    var click=true;
    var count_idd=0;

    $('#intro').hide();
    var count_id=0;
    for(i in localStorage){
        var retrievedObject = localStorage.getItem(i);
        retrievedObject=JSON.parse(retrievedObject);
        local_obj.push(retrievedObject);
        strng='<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc'+ retrievedObject.id+ '"><p id="image_"><img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p><p id=title>'+ retrievedObject.title+ '</p></div>';
        $(strng).appendTo(".row");
        count_id++;
    }

    $('#newboard-button').click(function(){
        count_idd++;
        var text=$('#newboard-input').val();
        var board = new Boards(text);
        local_obj.push(board);
        localStorage.setItem(board.id, JSON.stringify(board));
        strng='<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc'+ retrievedObject.id+ '"><p><img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p><p id=title>Title</p></div>';
        $(strng).text(board.title).appendTo(".row");

    });

    $('[id^="bc"]').live('click',function(){
        obj_id=this.id.toString();
        obj_id=obj_id.substr(2)
       for(var i=0;i<local_obj.length;i++) {
            console.log("obj : "  + obj_id);
            console.log("local : " + local_obj[i].id)
           if(local_obj[i].id.toString()===obj_id) {
               console.log(local_obj[i])
               if(!click){
                   $('div').remove('#sonka')
               $(this).after($('<div id="sonka"><button id="card_add" class="' + obj_id+ '">Create Card!</button><input type="text" id="card_text" ></div>'));
               for(var j=0;j<local_obj[i].cards.length;j++) {
                   console.log(j);
                   console.log(local_obj[i].cards[j])
                   $('#sonka').append($('<div id="x">  <h1>' + local_obj[i].cards[j] + '</h1> </div>'));
               }
               }
           }
       }

       $('#sonka').slideToggle('slow');
       click=!click;
    });

    $('#card_add').live('click',function () {
        var card=$('#card_text').val();
        $('#sonka').append($('<div id="x">  <h1>' + card + '</h1> </div>'));
        var retrievedObject = localStorage.getItem(this.getAttribute('class'));
        retrievedObject=JSON.parse(retrievedObject);
        retrievedObject.cards.push(card);
        localStorage.setItem(retrievedObject.id, JSON.stringify(retrievedObject));
    });

    function Boards(title){
        this.id=count_id++;
        this.title=title;
        this.cards=["sonka","sali","kapi","kalap"]
    };
});








