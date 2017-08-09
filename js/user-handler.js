$("document").ready(function () {

    //Campo de nome do usuário logado no HTML
    var $userName = $(".userName");

    //Campo de nome do usuário logado no localStorage
    var $tskUser = JSON.parse(localStorage.getItem("tskUser"));

    /** Caso o usuário não esteja logado, ou não exista no localStorage, exibir aviso requerendo login */
    if (!$tskUser || !$tskUser.logged) {
        $('#login-required-modal').modal({
            show: true
        });

    } else {
        /** Esconde a modal que solicita que faça login caso o usuário não esteja logado */
        $('#login-required-modal').modal({
            show: false
        });

        $userName.html($tskUser.username); //Atribui no HTML o valor contido no localStorage
    }

    /** Ao clicar no botão de logout*/
    $(document).on('click', '.logout', function () {
        logout();
    });

    /** Ao esconder a modal de aviso, redirect para o login */
    $('#login-required-modal').on('hidden.bs.modal', function () {
        window.location.replace("login.html");
    });

    /** Função para efetuar logout */
    function logout() {
        $tskUser.logged = false;
        localStorage.setItem("tskUser", JSON.stringify($tskUser));
        location.reload();
    }
});