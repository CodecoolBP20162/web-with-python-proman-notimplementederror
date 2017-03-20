$(document).ready(function(){
    var count_id=0;
    $('#sonka').click(function(){

        //var text=document.getElementById('sonkisz').value;
        var text=$('#sonkisz').val();
        console.log(text);
        var board = new Boards(text);

        localStorage.setItem(board.id, JSON.stringify(board));
        var retrievedObject = localStorage.getItem('text');
        console.log('retrievedObject: ', JSON.parse(retrievedObject));
        retrievedObject=JSON.parse(retrievedObject);
        console.log(retrievedObject.id);
        $('<div id="lole"></div>').appendTo("#lol");

       $( function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
        } );
    });



    function Boards(title){
        this.id=count_id++;
        this.title=title;
        this.cards=[];

    };

});



    







