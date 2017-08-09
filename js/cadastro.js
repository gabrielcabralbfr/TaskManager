$(document).ready(function () {
    var $form = $('#registration-form');
    var $password = $('#password');
    var $confirmPassword = $('#confirm-password');

    /** Esconde a modal */
    $('#success-modal').modal({
        show: false
    });

    /** Ao enviar o formulário */
    $(document).on('submit', '#registration-form', function (event) {

        event.preventDefault();

        $('#name').text($('#username').val()); /** Coloca o nome do usuário no texto da modal */

        $('#success-modal').modal({ /** Exibe a modal */
            show: true
        });

        localStorage.setItem("tskUser", JSON.stringify(setUserJSON())); /** Set do usuário no localStorage */

    });

    /** Quando a modal já estiver fechada */
    $('#success-modal').on("hidden.bs.modal", function (e) {

        /** Redirect para a página de login */
        window.location.replace("login.html");
    });

    /** A cada mudança no campo password, executa função que valida a igualdade da senhas */
    $(document).on('change', '#password', function () {
        validatePassword();
    });

    /** A cada vez que uma tecla é solta no campo confirm-password, executa função que valida a igualdade da senhas */
    $(document).on('keyup', '#confirm-password', function () {
        validatePassword();
    });

    /** Função que valida a igualdade da senhas */
    function validatePassword() {

        if ($password.val() != $confirmPassword.val()) { /** Se as senhas não forem iguais */

            /** Adiciona o texto à validação do HTML5 */
            $confirmPassword[0].setCustomValidity("As senhas não correspondem");
            return false;

        } else {
            $confirmPassword[0].setCustomValidity(''); /** Caso esteja tudo correto, limpa o campo de validação */
            return true;
        }
    }

    /** Função que monta o JSON do usuário */
    function setUserJSON() {

        var $userProfile = {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            remember: false,
            logged: false
        };
        return $userProfile;
    }
});