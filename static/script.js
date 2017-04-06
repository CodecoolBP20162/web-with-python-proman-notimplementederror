$(document).ready(function () {

    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };

    var local_obj = [];
    var click = true;
    var count_board = 0;
    var count_task = 0;
    var count_id = 0;
    var board = new Boards('sample');
    var task = new Tasks('sample');


    // makes either a Board or a Task Card
    var boardTaskFactory = function (obj, title) {
        if (obj == "card") {
            return new Tasks(title);
        }
        else if (obj == "board") {
            return new Boards(title);
        }
        else {
            return null;
        }
    };

    // sorts the tasks into their status group (new, in-progress, review, done)
    var fillTaskListByStatus = function (status, title) {
        switch (status) {
            case "new":
                $("#stat_new").append('<li id="li1" class="ui-state-default">' + title + '</li>');
                break;
            case "in-progress":
                $("#stat_inprogress").append('<li id="li1" class="ui-state-default">' + title + '</li>');
                break;
            case "review":
                $("#stat_review").append('<li id="li1" class="ui-state-default">' + title + '</li>');
                break;
            case "done":
                $("#stat_done").append('<li id="li1" class="ui-state-default">' + title + '</li>');
                break;
        }
    };

    // at start, load all item from storage, and fill boards
    var boardLoader = function () {
        board.get_cards();
    };


    //When clicked on, adds a new boards with inputted text
        $('#newboard-button').click(function (event) {
            event.preventDefault();
            board.createBoard();
        });


    // opens and closes the new board pop-up when the plus button is clicked
        $('.add').click(function () {
            $('#input_fields').toggle();
        });


    // fills up the task table pop up with the correct title, input, tasks, etc.
        $('[id^="bc"]').live('click', function () {
            obj_id = this.id.toString();
            obj_id = obj_id.substr(2);
            for (var i = 0; i < local_obj.length; i++) {
                if (local_obj[i].id.toString() === obj_id) {
                    if (!click) {
                        $('#back_layer').addClass('show_bl');
                        $('back_layer').css('opacity', '0');
                        $('.ui-state-default').empty();
                        $('#taskTitle').empty();
                        $('#stat_new').empty();
                        $('#taskTitle').append($('<h1>' + local_obj[i].title + '</h1></br><p class="underline"><input type="text" id="card_text" placeholder="task title" ></p></br><button id="card_add" class="' + obj_id + '">create card</button>'));
                        var card_splitter=local_obj[i].cards.split('|')
                        for (var j = 0; j < card_splitter.length-1; j++) {
                            row = JSON.parse(card_splitter[j]);
                            fillTaskListByStatus(row.status, row.title)
                        }

                    } else {
                        $('#back_layer').removeClass('show_bl');
                    }
                }
            }
            click = !click;
        });

    // when the create card button is clicked in the task pop-up
    // a new task is created and pushed into the local storage
        $('#card_add').live('click', function (event) {
            event.preventDefault();
            var card = $('#card_text').val();
            fillTaskListByStatus("new", card);
            var task=new Tasks('sample');
            var retrievedObject = task.get_card(this.getAttribute('class'));
            var task = boardTaskFactory("card", card);
            retrievedObject.cards+=JSON.stringify(task);
            task.save_card(retrievedObject)
        });

    // when a task is clicked, an editable textarea gets created
    var createTextareaInsteadListItem = function () {
        var text = $(this).text();
        var length = text.length;
        var editableText = $("<textarea />");
        editableText.val(text);
        $(this).replaceWith(editableText);
        editableText.focus();
        editableText.blur(saveTextareaValueIntoListItem);
    };

    // saves textarea value into the html
    var saveTextareaValueIntoListItem = function () {
        var html = $(this).val();
        var viewableText = $("<li id='li1'>");
        viewableText.html(html);
        $(this).replaceWith(viewableText);
        $(viewableText).click(createTextareaInsteadListItem);
    };


        $(document).click(function () {
            if (click) {
                if (this.id != '#task_table') {
                    $("#task_table").show();
                }
            } else {
                $('#task_table').hide();



            }
        });

    function Boards(title) {
        this.id = count_id++;
        this.title = title;
        this.cards = [];
        this.state = new SQLstorage()
        this.get_cards = function () {
            this.state.get_cards()
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
        this.state = new SQLstorage();
        this.get_card = function(id){
            return this.state.get_card(id)
        }
        this.save_card=function(retrieved){
            this.state.save_card(retrieved)
        }
    }

    function LocalStorage() {
        this.createBoard = function () {
            count_board++;
            var text = $('#newboard-input').val();
            var board = boardTaskFactory("board", text);
            local_obj.push(board);
            localStorage.setItem(board.id, JSON.stringify(board));
            strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + retrievedObject.id + '">' +
                '<p>' +
                '<img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" />' + '</p>' +
                '<p id=title>Title</p>' +
                '</div>';

            $(strng).text(board.title).appendTo(".row");
        };
        this.get_cards = function () {
            for (i in localStorage) {
                var retrievedObject = localStorage.getItem(i);
                retrievedObject = JSON.parse(retrievedObject);

                local_obj.push(retrievedObject);
                strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + retrievedObject.id + '">' +
                    '<p id="image_">' +
                    '<img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p>' +
                    '<p id=title>' + retrievedObject.title + '</p>' +
                    '   </div>';
                $(strng).appendTo(".row");
                count_id++;
            }
        };

        this.get_card = function (id) {
            return localStorage.getItem(id)
        };
        this.save_card = function (retrievedObject) {
            localStorage.setItem(retrievedObject.id, JSON.stringify(retrievedObject));

        }
    }

    function SQLstorage(){
        this.createBoard=function() {

            count_board++;
            var text = $('#newboard-input').val();
            var board = boardTaskFactory("board", text);
            local_obj.push(board);

            $.ajax({
                type: 'POST',
                data: {"id": JSON.stringify(board)},
                dataType: "json",
                async:false,
                url: "/create_board",
                success: function (response) {
                    strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + board.id + '">' +
                                        '<p id="image_">' +
                                        '<img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p>' +
                                        '<p id=title>' + board.title + '</p>' +
                            '</div>';
                    $(strng).appendTo(".row");
                },
                error: function () {
                    alert("Error with this weird part!")

                }
            });
        }
        this.get_cards=function () {
                $.ajax({
                   type:'GET',
                   url:'/get_cards',
                    dataType:"json",
                   success:function (response) {
                       for(var i in response){
                           strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + response[i].id + '">' +
                                        '<p id="image_">' +
                                        '<img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p>' +
                                        '<p id=title>' + response[i].title + '</p>' +
                                '   </div>';
                           $(strng).appendTo(".row");

                           local_obj.push(response[i]);
                           count_id++;
                       }
                       
                       
                   },
                   error:function () {
                       alert("Not able to get cards!")
                       
                   } 
                });
            }
            this.get_card=function (id) {
            var answer;
            $.ajax({
                type:"POST",
                url:"/get_card",
                data:{"id":id},
                async:false,
                dataType:"json",
                success:function (response) {
                    answer= response

                },
                error:function () {
                    alert("Error!")

                }
            });

                return answer

            }
            this.save_card=function (retrievedObject) {
            $.ajax({
                type:"POST",
                data:{'card':JSON.stringify(retrievedObject)},
                url:"/save_card",
                success:function () {
                    console.log("Success on saving this card!")

                },
                error:function () {
                    alert("Error!")

                }
            })

        }

        }

    //-----sortable-------
    $(".connectedSortable").sortable({
        connectWith: ".connectedSortable",
        receive: function(event, ui) {
            //console.log(ui.item);
            ui.item.text('Dropped into '+ this.id.substr(5));  // changes the dropped card's text
            if (this.id === "stat_new") {} 
            else if (this.id === "stat_inprogress") {console.log(ui.id);}
            else if (this.id === "stat_review") {}
            else if (this.id === "stat_done") {}
        }
    });
    

    //$('#li1').live('click', divClicked);
    //$('#li1').live('click', createTextareaInsteadListItem);
    var main = function () {
        $('#task_table').hide();
        boardLoader();

    };


    main();


});
