$("document").ready(tskToHTML());

function tskToHTML() {
    var data1 = new Date();

    // console.log("LocaleDateStr " + data1.toLocaleDateString());
    // console.log("toLocaleString " + data1.toLocaleString());
    // console.log("toUTCString " + data1.toUTCString());
    
    // console.log("toString " + data1.toString());
    // console.log("toDateString " + data1.toDateString());
    // console.log("toTimeString " + data1.toTimeString());
    // console.log("toISOStrings " + data1.toISOString());

    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var $htmlTskAbertas = $("#tskAbertas");
    var $htmlTskAtrasadas = $("#wallmessagesAtrasadas");
    var $htmlTskConcluidas = $("#tskConcluidas");

    $htmlTskAbertas.html("");
    $htmlTskAtrasadas.html("");
    $htmlTskConcluidas.html("");

    //Mudar para <template>
    $.each(tasks, function (i, task) {
        var data = new Date();

        if(task.status == "complete") {
            $htmlTskConcluidas.hide().append("<div class='message-item timelineConcluida'><div class='message-inner-concluida'><div class='message-head clearfix'><div class='user-detail'><span class='glyphicon glyphicon-check pull-right' title='Concluir tarefa' data-task-id='" + task.id + "'></span><span class='glyphicon glyphicon-edit pull-right'title='Editar tarefa' data-task-id='" + task.id + "'></span><span class='glyphicon glyphicon-trash pull-right' title='Excluir tarefa' data-task-id='" + task.id + "'></span><span class='handle'>" + task.titulo + "</span><div class='post-meta'><div class='asker-meta'><span class='qa-message-when-data'>Prazo: " + task.dataEsperadaConclusao + "</span></div></div></div></div><div class='qa-message-content'>" + task.descricao + "</div></div></div>").fadeIn();
        }
        else if (task.dataEsperadaConclusao.toLocaleString() > data.toLocaleString()) {
            task.status == "open";
            $htmlTskAbertas.hide().append("<div class='message-item timelineAberta'><div class='message-inner-aberta'><div class='message-head clearfix'><div class='user-detail'><span class='glyphicon glyphicon-check pull-right' title='Concluir tarefa' data-task-id='" + task.id + "'></span><span class='glyphicon glyphicon-edit pull-right'title='Editar tarefa' data-task-id='" + task.id + "'></span><span class='glyphicon glyphicon-trash pull-right' title='Excluir tarefa' data-task-id='" + task.id + "'></span><span class='handle'>" + task.titulo + "</span><div class='post-meta'><div class='asker-meta'><span class='qa-message-when-data'>Prazo: " + task.dataEsperadaConclusao + "</span></div></div></div></div><div class='qa-message-content'>" + task.descricao + "</div></div></div>").fadeIn();

        } else {
            task.status == "late";
            $htmlTskAtrasadas.hide().append("<div class='message-item timelineAtrasada'><div class='message-inner-atrasada'><div class='message-head clearfix'><div class='user-detail'><span class='glyphicon glyphicon-check pull-right' title='Concluir tarefa' data-task-id='" + task.id + "'></span><span class='glyphicon glyphicon-edit pull-right'title='Editar tarefa' data-task-id='" + task.id + "'></span><span class='glyphicon glyphicon-trash pull-right' title='Excluir tarefa' data-task-id='" + task.id + "'></span><span class='handle'>" + task.titulo + "</span><div class='post-meta'><div class='asker-meta'><span class='qa-message-when-data'>Prazo: " + task.dataEsperadaConclusao + "</span></div></div></div></div><div class='qa-message-content'>" + task.descricao + "</div></div></div>").fadeIn();

        }
    });
}