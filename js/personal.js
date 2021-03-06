$(function () {
    var cid = sessionStorage.getItem("cid");
    $.ajax({
        type: "POST",
        url: "http://120.55.164.87:8090/app/userinfo",
        data: {"cid": cid},
        async: true,
        dataType: "json",
        success: function (data) {
//      	console.log(data)
            var datas = data.datas;
            var str = "";
            var count = 0;
            var temp = $(".user_info").html();
            $(datas).each(function (i, v) {
                var a = v.头像;
                var b = "http://120.55.164.87:8090";
                var img = b + a;

                //替换模板内容
                str += temp.replace($(".info_name").html(), v.昵称)
                    .replace($(".info_phone").html(), v.账号)
                    .replace($(".real_state").html(), v.状态)
                    .replace($(".icon").attr("src"), img)
                $(".user_info").html(str);

            });
            if (datas.状态 == "已认证" || datas.状态 == "审核中") {
                $(".tip").css("display", "none")
            }
            else if (datas.状态 == "未认证" || datas.状态 == "未通过") {
                $(".tip").css("display", "block")
            }
            if (datas.头像 == null || datas.头像 == "/app/GetHeadPic?p=") {
                $(".icon").attr("src", "images/icon.png")
            }
            if (datas.昵称 == "") {
                $(".info_name").html("新用户001")
            }
        }
    });


    //消息
    $(".meg_box").click(function () {
        window.location.href = "message.html";
    });
    //设置
    $(".close").click(function () {
        window.location.href = "install.html";
    });
    //我的资料
    $(".user_info").click(function () {
        window.location.href = "mydata.html";
    });
    //钱包
    $(".wallet_box").click(function () {
        window.location.href = "wallet.html";
    });
    //关注
    $(".follow_box").click(function () {
        window.location.href = "follow.html";
    });
    //实名认证
    $(".tip").click(function () {
        window.location.href = "modify_Authentication.html";
    });
    //帮助中心
    $("#help").click(function () {
        window.location.href = "help.html"
    })
    //联系客服
    $(".service").click(function () {
        window.location.href = "service.html"
    })
    $("#xunjia").click(function () {
        sessionStorage.setItem("xunjia", "询价记录")
        window.location.href = "adviser.html";
    });
    $("#pindan").click(function () {
        sessionStorage.setItem("pindan", "我的拼单")
        window.location.href = "fight.html";
    });
});