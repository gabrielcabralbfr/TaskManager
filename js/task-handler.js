$(document).ready(function () {
    var $tasks = [];
    $tasks = JSON.parse(localStorage.getItem("tasks"));

    var $taskToRemove = 0;
    var $taskToEdit = 0;
    var $taskPosition = 0;
    var $taskToComplete;

    /** Ao clicar no icone de conclusão */
    $(document).on('click', '.glyphicon-check', function () {
        completeTask($(this));
    });

    /** Ao clicar no icone de edição */
    $(document).on('click', '.glyphicon-edit', function () {
        editTask($(this));
    });

    /** Ao submeter o formulário de edição da tarefa */
    $(document).on('submit', '#edit-task-form', function (event) {

        $tasks = JSON.parse(localStorage.getItem("tasks")); /** Get nas tarefas */

        /** Atribui à tarefa no localStorage, os valores alterados pelo usuário */
        $tasks[$taskPosition].titulo = $('#tskTituloEdit').val();
        $tasks[$taskPosition].dataEsperadaConclusao = $('#tskDataEsperadaEdit').val();
        $tasks[$taskPosition].descricao = $('#tskDescricaoEdit').val();

        localStorage.setItem("tasks", JSON.stringify($tasks)); /** Atualizo o localStorage com a tarefa já editada */

        $('#edit-task-modal').modal('hide');
        tskToHTML(); /** Atualiza as tarefas na página */

    });

    /** Ao clicar no icone da lixeira */
    $(document).on('click', '.glyphicon-trash', function () {
        deleteTask($(this));
    });


    /** Função para deletar as tarefas */
    function deleteTask(element) {
        $tasks = JSON.parse(localStorage.getItem("tasks")); /** Get nas tarefas */
        $taskToRemove = element.attr('data-task-id'); /** Pego o valor do atributo que se refere ao id da tarefa */

        /** Percorro o array de tarefas para encontrar o ID que desejo excluir */
        $.each($tasks, function (index, task) {
            if (task.id == $taskToRemove) {
                $tasks.splice(index, 1); /** Remove a tarefa do array na posição  */
                return false; /** Sair do foreach */
            }
        });

        localStorage.setItem("tasks", JSON.stringify($tasks)); /** Atualizo o localStorage com a tarefa já excluida */

        tskToHTML(); /** Atualiza as tasks na página */

    }

    /** Função para editar as tarefas */
    function editTask(element) {

        $tasks = JSON.parse(localStorage.getItem("tasks")); /** Get nas tarefas */
        $taskToEdit = element.attr('data-task-id'); /** Pego o valor do atributo que contém o id da tarefa a ser editada */

        /** Percorro o array de tarefas para encontrar o ID que desejo editar */
        $.each($tasks, function (index, task) {

            if (task.id == $taskToEdit) { /** Ao encontrar a tarefa */

                /** Atribuo os valores da tarefa aos campos de edição */
                $('#tskTituloEdit').val($tasks[index].titulo);
                $('#tskDataEsperadaEdit').val($tasks[index].dataEsperadaConclusao);
                $('#tskDescricaoEdit').val($tasks[index].descricao);

                /** Armazeno a posição no array em que se encontra a tarefa a ser editada */
                $taskPosition = index;

                return false; /** Sair do foreach */
            }
        });

        $('#edit-task-modal').modal({
            show: true
        });
    }

});

/** Função para concluir a tarefa */
function completeTask(element) {
    $tasks = JSON.parse(localStorage.getItem("tasks")); /** Get nas tarefas */
    $taskToComplete = $(element).attr('data-task-id'); /** Pego o valor do atributo que contém o id da tarefa a ser completada */

    $.each($tasks, function (index, task) {

        if (task.id == $taskToComplete) { /** Ao encontrar a tarefa */
            task.status = "complete";
            return false; /** Sair do foreach */
        }
    });

    localStorage.setItem("tasks", JSON.stringify($tasks));
    tskToHTML();

}