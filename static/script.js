$(document).ready(function () {
    var local_obj = [];
    var click = true;
    var count_idd = 0;
    var count_id2 = 0;

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
    var count_id = 0;
    for (i in localStorage) {
        var retrievedObject = localStorage.getItem(i);
        retrievedObject = JSON.parse(retrievedObject);
        local_obj.push(retrievedObject);
        $('<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + retrievedObject.id + '"><button></button></div>').text(retrievedObject.title).appendTo(".row");
        count_id++;
    }

    $('#newboard-button').click(function () {
        count_idd++;
        var text = $('#newboard-input').val();
        if (text != "") {
            if (count_idd == 1) {
                var board = new Boards(text, ["sonka", "sali", "lol"]);
            }
            else if (count_idd == 2) {
                var board = new Boards(text, ["sdfsfdaf", "dsfadf", "dsfadf"]);
            }
            local_obj.push(board);
            localStorage.setItem(board.id, JSON.stringify(board));
            $('<div class="valami col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + board.id + '"></div>').text(board.title).appendTo(".row");
        }
    });

    $('[id^="bc"]').live('click', function () {
        obj_id = this.id.toString();
        obj_id = obj_id.substr(2)
        for (var i = 0; i < local_obj.length; i++) {
            console.log("obj : " + obj_id);
            console.log("local : " + local_obj[i].id);
            if (local_obj[i].id.toString() === obj_id) {
                console.log(local_obj[i])
                if (!click) {
                    $('div').remove('#sonka');
                    $(this).after($('<div id="sonka"><button id="card_add" class="' + obj_id + '">Create Card!</button><input type="text" id="card_text" ></div>'));
                    for (var j = 0; j < local_obj[i].cards.length; j++) {
                        console.log(j);
                        console.log(local_obj[i].cards[j])
                        $('#sonka').append($('<div id="x">' + local_obj[i].cards[j].title + '</div>'));
                    }
                }
            }
        }


        $('#sonka').slideToggle('slow');
        click = !click;
    });

    $('#card_add').live('click', function () {
        var card = $('#card_text').val();
        $('#sonka').append($('<div id="x">  <h1>' + card + '</h1> </div>'));
        var task = new Tasks(card);
        var retrievedObject = localStorage.getItem(this.getAttribute('class'));
        retrievedObject = JSON.parse(retrievedObject);
        retrievedObject.cards.push(task);
        localStorage.setItem(retrievedObject.id, JSON.stringify(retrievedObject));
    });

    function divClicked() {
        var text = $(this).html();
        var length = text.length;
        var editableText = $("<textarea />");
        editableText.val(text);
        $(this).replaceWith(editableText);
        editableText.focus();
        editableText.blur(editableTextBlurred);
    }

    function editableTextBlurred() {
        var html = $(this).val();
        var viewableText = $("<div>");
        viewableText.html(html);
        $(this).replaceWith(viewableText);
        $(viewableText).click(divClicked);
    }

    $('#x').live('click', divClicked);

    function Boards(title, cards) {
        this.id = count_id++;
        this.title = title;
        this.cards = cards;
    }


    function Tasks(title) {
        count_id2++;
        task_id = 'task{0}'.format(count_id2);
        this.id = task_id;
        this.title = title;
        this.status = "todo"
    }
});








