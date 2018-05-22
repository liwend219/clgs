$(function () {
    var cid = sessionStorage.getItem("cid");
    $("#sub_btn").click(function () {
        var co = $("textarea").val();
        var ph = $("#phone").val();
        var con = co + "   联系方式" + ph;
        if (co == "") {
            alert("内容不能能为空")
        }
        else {
            $.ajax({
                type: "POST",
                url: "http://www.i7quan.com/app/SubmitQuestion",
                data: {"cid": cid, "content": co, "phone": ph},//
                async: true,
                dataType: "json",
                success: function (data) {
                    alert(data.msg)
                },
                error: function () {
                    alert("网络错误")
                }
            });
        }

    })
})