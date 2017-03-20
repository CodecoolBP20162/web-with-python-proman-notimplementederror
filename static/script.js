$(document).ready(function(){
    var count_id=0;
    var count_id2=0;

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
        var retrievedObject = localStorage.getItem('text');
        console.log('retrievedObject: ', JSON.parse(retrievedObject));
        retrievedObject=JSON.parse(retrievedObject);
        console.log(retrievedObject.id);
        $('<div id="lole"></div>').appendTo("#lol");

    });
/*
    $('#target-board').click(function(){
        var text=$('#target-text').val();
        console.log(text);
        var task = new Tasks(text);

        localStorage.setItem(task.id, JSON.stringify(task));
        var retrievedObject2 = localStorage.getItem('text');
        console.log('retrievedObject2: ', JSON.parse(retrievedObject2));
        retrievedObject2=JSON.parse(retrievedObject2);
        console.log(retrievedObject2.id);
        $('<div id="something"></div>').appendTo("#something");
    }); */

    function Boards(title){
        this.id=count_id++;
        this.title=title;
        this.cards=[];

    };

    function Tasks(title){
        this.id=count_id2++;
        this.title=title;
    };

});