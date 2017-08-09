    $(document).ready(function () {

        var $emailInput = $('#email-login');
        var $passwordInput = $('#password-login');
        var $tskUser = JSON.parse(localStorage.getItem('tskUser'));

        /** Se o usuário tiver marcado para lembrar login e já estiver cadastrado */
        if ($tskUser && $tskUser.remember && $tskUser.logged) {

            /** Pula o login e abre a página principal direto */
            window.location.replace("tasks.html");
        }

        /** Ao enviar o formulário */
        $(document).on('submit', "#login-form", function (event) {
            event.preventDefault();
            var $emailValue = $emailInput.val();
            var $passwordValue = $passwordInput.val();

            /** Se todas as validações estiverem ok */
            if (validateLogin()) {
                $tskUser.logged = true; /** Seta o usuário como logado */
                localStorage.setItem("tskUser", JSON.stringify($tskUser));

                window.location.replace("tasks.html");
            }
        });

        /** A cada saída no campo email, executa função que valida os campos do formulário */
        $(document).on('blur', '#email-login', function () {
            validateLogin();
        });

        /** A cada vez que o usuário sai do campo password, executa função que valida o formulário */
        $(document).on('change', '#password-login', function () {
            validateLogin();
        });

        /** Ao clicar no checkbox de lembrar login */
        $(document).on('click', '#remember', function () {
            rememberLogin(); /** grava no localStorage */
        });

        $('#fail-modal').on("hidden.bs.modal", function (e) {
            window.location.replace("cadastro.html");
        });

        /** Função para validar o que foi digitado pelo usuário */
        function validateLogin() {

            /** Caso haja algum usuário cadastrado no localStorage */
            if ($tskUser != null) {

                /** Senha incorreta */
                if (($emailInput.val().toLowerCase() == $tskUser.email.toLowerCase() || $emailInput.val().toLowerCase() == $tskUser.username.toLowerCase()) && $passwordInput.val() != $tskUser.password) {
                    $passwordInput[0].setCustomValidity("Senha incorreta");
                    $emailInput[0].setCustomValidity("");

                    /** E-mail incorreto ou username incorreto */
                } else if (($emailInput.val().toLowerCase() != $tskUser.email.toLowerCase() && $emailInput.val().toLowerCase() != $tskUser.username.toLowerCase()) && $passwordInput.val() == $tskUser.password) {
                    $emailInput[0].setCustomValidity("Usuário não encontrado");
                    $passwordInput[0].setCustomValidity("");

                    /**E-mail e senha incorretos */
                } else if ($emailInput.val().toLowerCase() != $tskUser.email.toLowerCase() && $passwordInput.val() != $tskUser.password && $emailInput.val().toLowerCase() != $tskUser.username.toLowerCase()) {
                    $emailInput[0].setCustomValidity("Usuário não encontrado");
                    $passwordInput[0].setCustomValidity("Senha incorreta");

                    /** Todos os campos preenchidos corretamente */
                } else {
                    $emailInput[0].setCustomValidity("");
                    $passwordInput[0].setCustomValidity("");
                    return true;
                }

                /** Caso não haja nenhum usuário cadastrado no localStorage */
            } else {
                $emailInput[0].setCustomValidity("Usuário não encontrado");
            }
        }

        /** Função para gravar a opção de lembrar login */
        function rememberLogin() {

            /** Se o checkbox estiver marcado */
            if ($('input#remember').prop("checked") == true) {

                /** E se o cadastro for diferente de nulo */
                if ($tskUser != null) {
                    $tskUser.remember = true; /** Seta campo remember como true */
                    localStorage.setItem("tskUser", JSON.stringify($tskUser));
                }
            } else if ($tskUser != null) {
                $tskUser.remember = false; /** Senão estiver marcado, atribui como false */
                localStorage.setItem("tskUser", JSON.stringify($tskUser));
            }
        }
    });