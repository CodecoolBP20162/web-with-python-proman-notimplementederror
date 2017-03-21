$(document).ready(function () {
    var count_id2 = 0;

    for(i in localStorage){
        var n = i.substring(0, 1);
        if (n === "t") {
            count_id2++;
            var retrievedObject = localStorage.getItem(i);
            retrievedObject=JSON.parse(retrievedObject);
            $('<div id="tasks"><label></label></div>').text(retrievedObject.title).appendTo("#tasks");
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

    var task_id = 'task{0}'.format(count_id2);

    $('#newtask-button').click(function () {
        var text=$('#newtask-input').val();
        console.log(text)
        var task = new Tasks(text);
        localStorage.setItem(task.id, JSON.stringify(task));
        $('<div id="tasks"><label></label></div>').text(task.title).appendTo("#tasks");


    });


    function Tasks(title) {
        count_id2++;
        task_id = 'task{0}'.format(count_id2);
        this.id = task_id;
        this.title = title;

    };

    });