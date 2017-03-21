$(document).ready(function () {
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

    var task_id = 'task{0}'.format(count_id2);

    $('#newtask-button').click(function () {
        var text=$('#newtask-input').val();
        console.log(text);
        var task = new Tasks(text);
        localStorage.setItem(task.id, JSON.stringify(board));
        $('<button id="lol"><label></label></button>').text(board.title).appendTo("#tasks");


    });


    function Tasks(title) {
        count_id2++;
        this.id = task_id;
        this.title = title;

    };

}