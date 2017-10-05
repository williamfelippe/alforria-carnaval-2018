$(function () {
    console.log('To aqui');

    // Seletores dos itens do menu
    var lastId, topMenu = $(".menu"), topMenuHeight = topMenu.outerHeight() + 15;

    // Todos os itens da lista
    var menuItems = topMenu.find("a");
    var header = $(".header");

    $(this).scrollTop(0);

    // Realiza a rolagem suave ao clicar na seta do banner
    $('.banner_scroll_down_button').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    // Âncoras correspondentes aos itens do menu
    var scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

    // Vincula a ação de clique ao menu
    // assim obteremos uma animação de rolagem suave
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 500);
        e.preventDefault();
    });

    // Vincula ao "scroll"
    $(window).scroll(function () {
        var scroll = $(this).scrollTop();
        var fromTop = $(this).scrollTop() + topMenuHeight;

        if (scroll >= 200) {
            header.addClass("header__solid");
        } else {
            header.removeClass("header__solid");
        }

        // Captura o id do item onde a tela está
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop) {
                return this;
            }
        });

        // Captura o id do elemento vigente
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;

            // Insere/remove a classe ativa
            menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
        }
    });
});
