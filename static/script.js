$(document).ready(function () {

    var local_obj = [];
    var click = true;
    var count_board = 0;
    var count_task = 0;
    var count_id = 0;
    var board = new Boards('sample');

    // makes either a Board Card or a Task Card
    var boardTaskFactory = function (obj, title) {
        if (obj == "card") {
            return new Tasks(title);
        }
        else {
            return new Boards(title);
        }
    };

    // sorts the tasks into their status group (new, in-progress, review, done)
    var taskSortByStatus = function (status, title) {
        switch (status) {
            case "new":
                $("#new").append('<li id="li1">' + title + '</li>');
                break;
            case "in-progress":
                $("#in-progress").append('<li id="li1">' + title + '</li>');
                break;
            case "review":
                $("#review").append('<li id="li1">' + title + '</li>');
                break;
            case "done":
                $("#done").append('<li id="li1">' + title + '</li>');
                break;
        }
    };

    //"string{0}".format(variable)
    var stringFormat = function () {
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
    };

    //at start, load all item from storage, and fill boards
    var boardLoader = function () {
        board.get_cards();
    };

    //When clicked on, adds a new board with the inputted text
    var createButton = function () {
        $('#newboard-button').click(function () {
            board.createBoard();
        });
    };

    //opens and closes the new board pop-up when the plus button is clicked
    var plusButton = function () {
        $('.add').click(function () {
            $('#input_fields').toggle();
        });
    };

    //when a board is clicked on, a dark extra layer is added between the boards and the tasks pop-up
    var layerBehindPopupTrigger = function () {
        $('[id^="bc"]').live('click', function () {
            obj_id = this.id.toString();
            obj_id = obj_id.substr(2);
            for (var i = 0; i < local_obj.length; i++) {
                if (local_obj[i].id.toString() === obj_id) {
                    if (!click) {
                        $('#back_layer').addClass('show_bl');
                        $('back_layer').css('opacity', '0');
                        $('#task_table').empty();

                        $('#task_table').append($('<h1>' + local_obj[i].title + '</h1><button id="card_add" class="' + obj_id + '">Create Card!</button><input type="text" id="card_text" placeholder="Task title" >'));
                        $('#task_table').append($('<div id="sortable" class="article"><ul id="new" class="cards col-lg-3 col-md-3 col-sm-3 col-xs-3"><label>New Cards</label></ul><ul id="review" class="cards col-lg-3 col-md-3 col-sm-3 col-xs-3"><label>Review</label></ul><ul id="in-progress" class="cards col-lg-3 col-md-3 col-sm-3 col-xs-3"><label>In progress</label></ul><ul id="done" class="cards col-lg-3 col-md-3 col-sm-3 col-xs-3"><label>Done</label></ul></div>'));
                        for (var j = 0; j < local_obj[i].cards.length; j++) {
                            taskSortByStatus(local_obj[i].cards[j].status, local_obj[i].cards[j].title)
                        }

                    } else {
                        $('#back_layer').removeClass('show_bl');
                    }
                }
            }
            click = !click;
        });
    };

    //when the create card button is clicked in the task pop-up
    //a new task is created and pushed into the local storage
    var createTaskButton = function () {
        $('#card_add').live('click', function () {
            var card = $('#card_text').val();
            taskSortByStatus("new", card);
            var retrievedObject = localStorage.getItem(this.getAttribute('class'));
            var task = boardTaskFactory("card", card);
            retrievedObject = JSON.parse(retrievedObject);
            retrievedObject.cards.push(task);
            localStorage.setItem(retrievedObject.id, JSON.stringify(retrievedObject));
        });
    };

    //when a task is clicked, an editable textarea gets created
    var createTextareaInsteadListItem = function () {
        var text = $(this).text();
        var editableText = $("<textarea />");
        editableText.val(text);
        $(this).replaceWith(editableText);
        editableText.focus();
        editableText.blur(saveTextareaValueIntoListItem);
    };

    //saves the textarea input into the html
    var saveTextareaValueIntoListItem = function () {
        var html = $(this).val();
        var viewableText = $("<li id='li1'>");
        viewableText.html(html);
        $(this).replaceWith(viewableText);
        $(viewableText).click(createTextareaInsteadListItem);
    };

    var showHideTaskTable = function () {
        $(document).click(function () {
            if (click) {
                if (this.id != '#task_table') {
                    $("#task_table").show();
                }
            } else {
                $('#task_table').hide();

            }
        });
    };

    function LocalStorage() {
        this.createBoard = function () {
            count_board++;
            var text = $('#newboard-input').val();
            var board = boardTaskFactory("board", text);
            local_obj.push(board);
            console.log(board.id);
            localStorage.setItem(board.id, JSON.stringify(board));
            strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + retrievedObject.id + '"><p><img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p><p id=title>Title</p></div>';
            $(strng).text(board.title).appendTo(".row");
        }
    }

    function Boards(title) {
        this.id = count_id++;
        this.title = title;
        this.cards = [];
        this.state = new LocalStorage();
        this.get_cards = function () {
            for (i in localStorage) {
                var retrievedObject = localStorage.getItem(i);
                retrievedObject = JSON.parse(retrievedObject);
                local_obj.push(retrievedObject);
                strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + retrievedObject.id + '"> <p id="image_"><img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p><p id=title>' + retrievedObject.title + '</p></div>';
                $(strng).appendTo(".row");
                count_id++;
            }
        };
        this.createBoard = function () {
            this.state.createBoard();
        }
    }

    function Tasks(title) {
        count_task++;
        task_id = 'task{0}'.format(count_task);
        this.id = task_id;
        this.title = title;
        this.status = "new";
    }

    var main = function () {
        $('#task_table').hide();
        stringFormat();
        boardLoader();
        createButton();
        plusButton();
        layerBehindPopupTrigger();
        createTaskButton();
        $('#li1').live('click', createTextareaInsteadListItem);
        showHideTaskTable();
    };

    main();


});
