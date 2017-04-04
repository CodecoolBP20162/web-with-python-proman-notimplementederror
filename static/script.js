$(document).ready(function () {

        String.prototype.format = function () {
        var args = [].slice.call(arguments);
        return this.replace(/(\{\d+\})/g, function (a){
            return args[+(a.substr(1,a.length-2))||0];
        });
        }

    var local_obj = [];
    var click = true;
    var count_board = 0;
    var count_task = 0;
    var count_id = 0;
    var board = new Boards('sample');
    var task= new Tasks('sample');


    var factory = function (obj, title) {
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

    var status_finder = function (status, title) {
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

    //At start, load all item from storage, and fill boards
    var boardLoader = function () {
        board.get_cards();
    };

    //When clicked on, adds a new boards with inputted text
    var newBoardButton = function () {
        $('#newboard-button').click(function () {
            board.createBoard();
        });
    };

    var toggleBoardInput = function () {
        $('.add').click(function () {
            $('#input_fields').toggle();
        });
    };

    //When clicked on, cards slide down, everything gets blurry
    var clickBlurry = function () {
        $('[id^="bc"]').live('click', function () {
            obj_id = this.id.toString();
            obj_id = obj_id.substr(2);
            for (var i = 0; i < local_obj.length; i++) {
                if (local_obj[i].id.toString() === obj_id) {
                    if (!click) {
                        $('#back_layer').addClass('show_bl');
                        $('back_layer').css('opacity', '0');
                        $('#task_table').empty();

                        $('#task_table').append($('<h1>' + local_obj[i].title + '</h1>' +
                            '<button id="card_add" class="' + obj_id + '">Create Card!</button>' +
                            '<input type="text" id="card_text" placeholder="Task title" >'));
                        $('#task_table').append($('' +
                            '<ul id="sortable" class="article">' +
                                '<div id="new" class="cards col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
                                    '<label>New Cards</label>' +
                                '</div>' +
                                '<div id="review" class="cards col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
                                    '<label>Review</label>' +
                                '</div>' +
                                '<div id="in-progress" class="cards col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
                                    '<label>In progress</label>' +
                                '</div>' +
                                '<div id="done" class="cards col-lg-4 col-md-4 col-sm-4 col-xs-4">' +
                                    '<label>Done</label>' +
                                '</div>' +
                            '</ul>'));
                        for (var j = 0; j < local_obj[i].cards.length; j++) {
                            status_finder(local_obj[i].cards[j].status, local_obj[i].cards[j].title)
                        }

                    } else {
                        $('#back_layer').removeClass('show_bl');
                    }
                }
            }
            click = !click;
        });
    };

    var newCardButton = function () {
        $('#card_add').live('click', function () {
            var card = $('#card_text').val();
            status_finder("new", card);
            var retrievedObject = task.get_card(this.getAttribute('class'));
            var task = factory("card", card);
            retrievedObject = JSON.parse(retrievedObject);
            retrievedObject.cards.push(task);
            task.save_card(retrievedObject)
        });
    };

    var divClicked = function () {
        var text = $(this).text();
        var length = text.length;
        var editableText = $("<textarea />");
        editableText.val(text);
        $(this).replaceWith(editableText);
        editableText.focus();
        editableText.blur(editableTextBlurred);
    };

    var editableTextBlurred = function () {
        var html = $(this).val();
        var viewableText = $("<li id='li1'>");
        viewableText.html(html);
        $(this).replaceWith(viewableText);
        $(viewableText).click(divClicked);
    };

    var taskTableToggle = function () {
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

    function Boards(title) {
        this.id = count_id++;
        this.title = title;
        this.cards = [];
        this.state = new LocalStorage();
        this.get_cards = function () {
            this.state.get_cards()
        }

        this.createBoard = function () {
            this.state.createBoard();
        }


    };

        function Tasks(title) {
        count_task++;
        task_id = 'task{0}'.format(count_task);
        this.id = task_id;
        this.title = title;
        this.status = "new";
        this.state = new LocalStorage();
        this.get_card = function(){
            this.state.get_card()
        }
        this.save_card=function(){
            this.state.save_card()
        }
    };

    function LocalStorage() {
        this.createBoard = function () {
            count_board++;
            var text = $('#newboard-input').val();
            var board = factory("board", text);
            local_obj.push(board);
            console.log(board.id);
            localStorage.setItem(board.id, JSON.stringify(board));
            strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + retrievedObject.id + '">' +
                        '<p>' +
                        '<img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" />' + '</p>' +
                        '<p id=title>Title</p>' +
                    '</div>';

            $(strng).text(board.title).appendTo(".row");
        }
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

        this.get_card=function (id) {
            return localStorage.getItem(id)
        }
        this.save_card=function (retrievedObject) {
            localStorage.setItem(retrievedObject.id, JSON.stringify(retrievedObject));

        }
    }

    function SQLstorage(){
        this.createBoard=function() {

            count_board++;
            //var text = $('#newboard-input').val();
            var text = "sonka";
            var board = factory("board", text);
            local_obj.push(board);

            $.ajax({
                type: 'POST',
                data: {"id": JSON.stringify(board)},
                dataType: "json",
                url: "/create_board",
                success: function (response) {
                    alert("succesfully saved to database!");
                },
                error: function () {
                    alert("Error!")

                }
            });
        }
        this.get_cards=function () {

                $.ajax({
                   type:'GET',
                   url:'/get_cards',
                   success:function (response) {
                       for(var i=0;i<response.length;i++){
                           strng = '<div class="boards col-lg-4 col-md-4 col-sm-4 col-xs-4" id="bc' + response[i].id + '">' +
                                        '<p id="image_">' +
                                        '<img src="https://c1.staticflickr.com/1/674/20942077784_5d3ffb2ed0_h.jpg" /></p>' +
                                        '<p id=title>' + response[i].title + '</p>' +
                                '   </div>';
                           $(strng).appendTo(".row");
                       }
                       
                       
                   },
                   error:function () {
                       alert("Not able to get cards!")
                       
                   } 
                });
            }
            this.get_card=function (id) {

            $.ajax({
                type:"POST",
                url:"/get_card",
                data:{"id":id},
                success:function (response) {
                    return response

                },
                error:function () {
                    alert("Error!")

                }
            });

            }
            this.save_card=function (retrievedObject) {

            $.ajax({
                type:"POST",
                data:{'card':JSON.stringify(retrievedObject)},
                url:"/save_card",
                success:function () {
                    alert("Success on saving this card!")

                },
                error:function () {
                    alert("Error!")

                }
            })

        }


        }




    var main = function () {
        $('#task_table').hide();
        stringFormat();
        boardLoader();
        newBoardButton();
        toggleBoardInput();
        clickBlurry();
        newCardButton();
        $('#li1').live('click', divClicked);
        taskTableToggle();
        x=new SQLstorage();
        x.createBoard();
    };



    main();


});
