$(document).ready(function(){

    var $article = document.getElementById('intro');
    var local_obj=[];
    var click=true;

    $('#intro').hide();
    var count_id=0;
    $('<div class="row">').appendTo("board_container");
    for(i in localStorage){
        var retrievedObject = localStorage.getItem(i);
        retrievedObject=JSON.parse(retrievedObject);
        local_obj.push(retrievedObject);
        console.log(retrievedObject);
            $('<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4"><button></button></div>').text(retrievedObject.title).appendTo("body");
        count_id++;
    }

    $('</div>').appendTo("#board_container");

    $('#sonka').click(function(){
        var text=$('#sonkisz').val();
        var board = new Boards(text);
        local_obj.push(board);
        localStorage.setItem(board.id, JSON.stringify(board));
        $('<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4" id="'+ board.id+'"></div>').text(board.title).appendTo("body");
    });

    $('div').live('click',function(){
       for(var i=0;i<local_obj.length;i++) {
           if(local_obj[i].id==this.id) {
               for(var j=0;j<local_obj[i].cards.length;j++){
                $('<div id="new_div">  <h1>' + local_obj[i].cards[j] + '</h1> </div>').appendTo("#intro");
               }
           }
       }
       $('#intro').toggle();
       click=!click;
       console.log(click);
       if(!click){
           $('#new_div').remove();
       }

    });

    function Boards(title){
        this.id=count_id++;
        this.title=title;
        this.cards=["sonka","sali","lol"];
    };

});








