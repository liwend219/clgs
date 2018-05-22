$(function () {

    //注销
    $(".out_btn").click(function () {
        var cid = sessionStorage.getItem("cid");
        $.ajax({
            type: "POSt",
            url: "http://120.55.164.87:8090/app/logout",
            data: {"cid": cid},
            dataType: "json",
            success: function (data) {
                if (data.rs) {
                    alert(data.msg);
                    window.location.href = "logoIn.html";
                }
                else {
                    alert(data.msg)
                }
            },
            error: function () {
                alert("网络错误")
            }
        });
    });
    //清理缓存
    $(".cache").click(function () {
        alert("缓存清理完成")
        $("#cache_m").html("0M")
    });
    //账号与安全
    $(".security").click(function () {
        window.location.href = "security.html";
    });
    //推送设置
    $(".push").click(function () {
        window.location.href = "push.html";
    });
    //关于
    $(".about").click(function () {
        window.location.href = "about.html";
    });
    //反馈
    $(".feedback").click(function () {
        window.location.href = "feedback.html";
    })
})