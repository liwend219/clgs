$(function () {
    //先拿到参数
    var cid = sessionStorage.getItem("cid");
    var msgID = sessionStorage.getItem("msgID");
    //发送ajax获取信息内容---通过id
    $.ajax({
        type: "POST",
        url: "http://www.i7quan.com/app/MsgContent",
        data: {"cid": cid, "msgid": msgID},//
        async: true,
        dataType: "json",
        success: function (data) {
            var datas = data.data
            var str = "";
            var temp = $(".notice_content").html();
            $(datas).each(function (i, v) {
                //替换模板内容
                str += temp.replace("@00", datas.内容)
                    .replace("@11", datas.时间)
                $(".notice_content").html(str);
            });
        }
    });
})