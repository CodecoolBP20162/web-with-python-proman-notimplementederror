$(document).ready(function(){

    var $article = document.getElementById('intro');

    $('#intro').hide();
    var count_id=0;
    $('<div class="row">').appendTo("board_container");
    for(i in localStorage){
        var retrievedObject = localStorage.getItem(i);
        retrievedObject=JSON.parse(retrievedObject);
            $('<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4"><button></button></div>').text(retrievedObject.title).appendTo("body");
        count_id++;
    }

    $('</div>').appendTo("#board_container");

    $('#sonka').click(function(){
        var text=$('#sonkisz').val();
        var board = new Boards(text);
        localStorage.setItem(board.id, JSON.stringify(board));
        $('<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4" id='+ board.id+'></div>').text(board.title).appendTo("body");
    });

    $('div').live("mouseenter",function(){
        $(this).focus();
    })

    $('div').live('mouseenter', function(){
        $(this).animate({ margin: -10, width: "+=10", height: "+=10" });
        })

    $('div').live('mouseleave', function() {
        $(this).animate({margin: 0, width: "-=10", height: "-=10"});
    })

    $('div').click(function(){
       var id=$(this).id;
       $('<div id="article">  <h1>'+$(this).id +'</h1> </div>').appendTo("body");
       $('#intro').append()
       $('#intro').toggle();

    });

    function Boards(title){
        this.id=count_id++;
        this.title=title;
        this.cards=["sonka","sali","lol"];
    };

});








