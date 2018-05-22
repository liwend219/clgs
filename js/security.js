$(function () {
    var cid = sessionStorage.getItem("cid");
    $.ajax({
        type: "POST",
        url: "http://www.i7quan.com/app/userinfo",
        data: {"cid": cid},
        async: false,
        dataType: "json",
        success: function (data) {
            var datas = data.datas;
            var str = "";
            var count = 0;
            var temp = $("#cache_m").html();
            $(datas).each(function (i, v) {
                //替换模板
                str += temp.replace($("#cache_m").html(), v.账号);
                $("#cache_m").html(str);

            });
            sessionStorage.setItem("phone", datas.账号)
        }
    });
    $(".Cipher").click(function () {
        window.location.href = "Cipher_password.html"
        sessionStorage.setItem("ng_pass", 1)
    });

})