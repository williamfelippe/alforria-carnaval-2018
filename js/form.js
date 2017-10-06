$(function () {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    // Envia o formulário para o arquivo php correspondente
    $('.contactForm').submit(function (event) {
        event.preventDefault();
        var values = $(this).serializeArray();

        var name = values[0].value;
        var email = values[1].value;
        var subject = values[2].value;
        var message = values[3].value;

        var button = $(this).find(".contactForm__button");
        var sendText = $(this).find(".contactForm__button__sendText");
        var loader = $(this).find(".contactForm__button__loader");

        sendText.addClass("d-none");
        loader.removeClass("d-none");
        button.prop('disabled', true);

        $.post("php/send-email.php", {name: name, email: email, subject: subject, message: message},
            function (data, status) {
                sendText.removeClass("d-none");
                loader.addClass("d-none");
                button.prop('disabled', false);

                $('.contactForm')[0].reset();

                toastr.success('Mensagem enviada com sucesso', 'Yeah!!!');
            })
            .fail(function () {
                sendText.removeClass("d-none");
                loader.addClass("d-none");
                button.prop('disabled', false);

                toastr.error('Aconteceu um erro inesperado. Tente novamente mais tarde!', 'Ops...');
            });
    });
});