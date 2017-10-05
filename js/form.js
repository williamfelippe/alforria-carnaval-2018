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

        var button = $(this).find("button");
        var loader = $(this).find(".loader");

        button.addClass("hidden-xs-up");
        loader.removeClass("hidden-xs-up");

        $.post("php/send-email.php", {name: name, email: email, subject: subject, message: message},
            function (data, status) {
                button.removeClass("hidden-xs-up");
                loader.addClass("hidden-xs-up");

                $('.contactForm')[0].reset();

                toastr.success('Mensagem enviada com sucesso', 'Uhull!!!');
            })
            .fail(function () {
                button.removeClass("hidden-xs-up");
                loader.addClass("hidden-xs-up");

                toastr.error('Aconteceu um erro inesperado. Tente novamente mais tarde!', 'Ops...');
            });
    });
});