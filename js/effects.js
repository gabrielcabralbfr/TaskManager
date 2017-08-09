$(document).ready(function () {
    $(document).on('mouseenter', '.actions', function () {
        $(this).parent().addClass("open").hide().fadeIn(800);
    });

    $(document).on('mouseenter', '.menu-actions', function () {
        $(this).parent().addClass("open");
    });

    $(document).on('mouseleave', '.actions', function () {
        $(this).parent().removeClass("open");
    });
    $(document).on('mouseleave', '.menu-actions', function () {
        $(this).parent().removeClass("open");
    });
});