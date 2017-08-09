//Ao carregar o documento, verifica se há o localStorage, se não houver, cria um array vazio
$("document").ready(function () {
    if (localStorage.getItem("tasks") === null) {
        var tasks = [];
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});

function createTask() {
    //Recebe os dados do localstorage
    var tasks = JSON.parse(localStorage.getItem("tasks"));

    //Captura os valores do formulário
    var $titulo = $("#tskTitulo").val();
    var $dataEsperadaConclusao = new Date($("#tskDataEsperada").val()).toLocaleString();
    var $descricao = $("#tskDescricao").val();

    // Sobrescreve array salvo do localStorage adicionando uma nova newTask passando como parâmetro os valores do formulário
    tasks.push(new newTask($titulo, $dataEsperadaConclusao, $descricao));

    //Persiste as informações no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Limpa os valores no formulário atual
    var $createTaskForm = $('#create-task-form');
    $createTaskForm[0].reset();

    //Chama a função no arquivo tskToHTML.js que escreve as tarefas para visualização do usuário
    tskToHTML();
}

//Construtor de tarefas
//Recebe apenas o título e a descrição da tarefa e gera internamente o ID e a data e hora de criação
function newTask(titulo, $dataEsperadaConclusao, descricao) {
    var data = new Date();

    this.id = guid();
    this.dataEHoraDeCriacao = data.toISOString();
    this.dataEsperadaConclusao = $dataEsperadaConclusao;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = "";

    //Método que gera um valor para simular um guid
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


}