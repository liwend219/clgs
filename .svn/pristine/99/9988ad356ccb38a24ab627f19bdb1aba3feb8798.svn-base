$(function () {
    var cid = sessionStorage.getItem("cid");
    var index = 1;
    var size = 10;
    down();

    function down() {
        $.ajax({
            type: "POST",
            url: "http://www.i7quan.com/app/CapitalFlow",
            data: {"cid": cid, "pgIndex": index, "pgSize": size},
            async: true,
            dataType: "json",
            success: function (data) {
                var datas = data.Orders
                var str = "";
                var count = 0;
                var temp = $("#dynamics_box").html();
                $(datas).each(function (i, v) {
                    //替换模板内容
                    var newTemp = temp;
                    str += newTemp.replace("@00", datas[i].类型)
                        .replace("@11", datas[i].日期)
                        .replace("@22", datas[i].金额)


                });
                $(".dynamics_box").append(str);
                index++;
            }
        })
    }

    //滑动到最底部自动刷新动态
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            down();
        }
    });

})