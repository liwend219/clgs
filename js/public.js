$(function () {
    var w = $(window).width();
    if (w > 750) {
        w = 750;
    }
    $("html").css("font-size", w / 7.5 + "px");

    $(window).resize(function () {
        var w = $(window).width();
        if (w > 750) {
            w = 750;
        }
        $("html").css("font-size", w / 7.5 + "px");
    });

});
