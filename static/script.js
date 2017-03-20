$(document).ready(function(){
    var count_id=0;

    for(i in localStorage){
        count_id++;
        var retrievedObject = localStorage.getItem(i);
        retrievedObject=JSON.parse(retrievedObject);
        $('<div id="lole"><label></label></div>').text(retrievedObject.id).appendTo("#lol");
    }


    $('#sonka').click(function(){

        //var text=document.getElementById('sonkisz').value;
        var text=$('#sonkisz').val();
        console.log(text);
        var board = new Boards(text);
        localStorage.setItem(board.id, JSON.stringify(board));
        $('<div id="lole"><label></label></div>').text(board.id).appendTo("#lol");

    });



    function Boards(title){
        this.id=count_id++;
        this.title=title;
        this.cards=[];

    };

});








