$(document).ready(function(){
    var count_id=0;


    for(i in localStorage){
        var n = i.substring(0, 1);
        console.log(n)
        if (n !== "t") {
            count_id++;
            var retrievedObject = localStorage.getItem(i);
            retrievedObject=JSON.parse(retrievedObject);
            $('<div id="board"><label></label></div>').text(retrievedObject.title).appendTo("#boards");
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


    $('#newboard-button').click(function(){

        //var text=document.getElementById('sonkisz').value;
        var text=$('#newboard-input').val();
        console.log(text);
        var board = new Boards(text);
        localStorage.setItem(board.id, JSON.stringify(board));
        $('<div id="board"></div>').text(board.title).appendTo("#boards");

    });

    $('#boards').click(function(){
        var data = this.id;
        alert(data);
    });



    function Boards(title){
        this.id=count_id++;
        this.title=title;
        this.cards=[];

    };


});








