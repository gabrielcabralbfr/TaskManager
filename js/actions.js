$(document).ready(function () {

    $(document).on('click', '.clear-all', function () {

        $('#clear-task-modal').modal({
            show: true
        });

    });

    $(document).on('click', '#btn-confirm', function () {
        clearAll();
    });

    $(document).on('click', '.clear-finished', function () {
        clearFinished();

    });

    $(document).on('click', '.finish-late', function () {
        var $tasks = JSON.parse(localStorage.getItem("tasks"));
        var $lateTasks = $('.message-inner-atrasada span.glyphicon-check');

        $.each($lateTasks, function (index, task) {
            completeTask(task);
        });
    });

    $(document).on('click', '.finish-open', function () {
        var $tasks = JSON.parse(localStorage.getItem("tasks"));
        var $lateTasks = $('.message-inner-aberta span.glyphicon-check');

        $.each($lateTasks, function (index, task) {
            completeTask(task);
        });
    });

    /** Função para limpar tarefas concluídas */
    function clearFinished() {
        var $tasks = JSON.parse(localStorage.getItem("tasks"));

        $.each($tasks, function (index, task) {
            if (task.status == "complete") {
                $tasks.splice(index, 1); /** Remove a tarefa do array na posição  */
            }

        });

        localStorage.setItem("tasks", JSON.stringify($tasks));
        tskToHTML();
    }

});

/** Função para limpar todas as tarefas */
function clearAll() {
    var $tasks = JSON.parse(localStorage.getItem("tasks"));
    $tasks = [];
    localStorage.setItem("tasks", JSON.stringify($tasks));

    tskToHTML();
}