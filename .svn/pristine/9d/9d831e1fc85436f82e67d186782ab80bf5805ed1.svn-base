$(function () {
    var cid = sessionStorage.getItem("cid");



    //发送ajax获取消息列表
    $.ajax({
        type: "POST",
        url: "http://www.i7quan.com/app/MsgList",
        data: {"cid": cid, "pgIndex": 1, "pgSize": 10},//
        dataType: "json",
        success: function (data) {
            var datas = data.datas;
            var str = "";
            var temp = $(".box").html();
            $(datas).each(function (i, v) {
                var newstemp = temp;
                if (datas[i].已读 == 1) {
                    newstemp = newstemp.replace("@@@", "display:none")
                }
                else {
                    newstemp = newstemp.replace("@@@", "display:block")

                }
                //替换模板内容
                str += newstemp.replace("@00", datas[i].来自)
                    .replace("@11", datas[i].时间)
                    .replace("@22", datas[i].内容)
                    .replace("1", datas[i].已读)

            });
            $(".box").html(str);
            //点击哪个，获取哪个的id，进入到该信息内容
            $(".notice_box").click(function () {
                var index = $(this).index();
                $(".num").eq(index).css("display", "none");
                var msgID = datas[index].ID;
                sessionStorage.setItem("msgID", msgID);
                window.location.href = "notice_details.html";
                //如果是已读，去掉红点

            });

        }
    });

})
// $(".num").css("display","none");