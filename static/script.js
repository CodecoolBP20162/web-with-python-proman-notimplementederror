$(document).ready(function(){
    var local_obj=[];
    var click=true;

    $('#intro').hide();
    var count_id=0;
    $('<div class="row">').appendTo("board_container");
    for(i in localStorage){
        var retrievedObject = localStorage.getItem(i);
        retrievedObject=JSON.parse(retrievedObject);
        local_obj.push(retrievedObject);
        $('<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc'+ retrievedObject.id+ '"><button></button></div>').text(retrievedObject.title).appendTo("#board_container");
        count_id++;
    }


    $('#sonka').click(function(){
        var text=$('#sonkisz').val();
        var board = new Boards(text);
        local_obj.push(board);
        localStorage.setItem(board.id, JSON.stringify(board));
        $('<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc'+ board.id+'"></div>').text(board.title).appendTo("#board_container");
    });

    $('[id^="bc"]').live('click',function(){
        obj_id=this.id.toString();
        obj_id=obj_id.substr(2)
       for(var i=0;i<local_obj.length;i++) {
            console.log("obj : "  + obj_id);
            console.log("local : " + local_obj[i].id)
           if(local_obj[i].id.toString()===obj_id) {
               console.log(local_obj[i])
               for(var j=0;j<local_obj[i].cards.length;j++){
                   console.log(j);
                   console.log(local_obj[i].cards[j])
                $('<div id="x">  <h1>' + local_obj[i].cards[j] + '</h1> </div>').appendTo("#intro");
               }
           }
       }
       $('#intro').toggle();
       click=!click;

    });

    function Boards(title){
        this.id=count_id++;
        this.title=title;
        this.cards=["sonka","sali","lol"];
    };
});








