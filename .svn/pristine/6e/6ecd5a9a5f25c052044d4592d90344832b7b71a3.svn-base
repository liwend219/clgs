$(function () {
    var cid = sessionStorage.getItem("cid");
    $.ajax({
        type: "POST",
        url: "http://www.i7quan.com/app/userinfo",
        data: {"cid": cid},
        async: true,
        dataType: "json",
        success: function (data) {
            var datas = data.datas;
            var str = "";
            var count = 0;
            var temp = $(".body").html();
            if (datas.头像 == null || datas.头像 == "" || datas.头像 == "/app/GetHeadPic?p=") {
                temp = temp.replace("@img", "images/icon.png")
            }
            $(datas).each(function (i, v) {
                var a = v.头像;
                var b = "http://www.i7quan.com/";
                var img = b + a;
                sessionStorage.setItem("state", v.状态)
                //替换模板内容
                str += temp.replace("@img", img)
                $(".body").html(str);
                $(".nickname").text(v.昵称);
                $(".sex").val(v.性别);
                $(".zhuangtai").html(v.名字);
                $(".real_state").html(v.状态);
                $(".usertext").html(v.简介);
            });
            if (datas.状态 == "已认证" || datas.状态 == "审核中") {
                $(".real_state").css("background-color", "#e0433c")
            }
            else if (datas.状态 == "未认证" || datas.状态 == "未通过") {
                $(".real_state").css("background-color", "#c7c7cc")
            }

            if (datas.昵称 == "") {
                $(".nickname").html("新用户001")
            }
            if (datas.简介 == "") {
                $(".usertext").html("请填写")
            }
            //修改昵称
            sessionStorage.setItem("昵称", datas.昵称)
            sessionStorage.setItem("简介", datas.简介)
            $(".second").click(function () {
                window.location.href = "modify_nickname.html";
            })
            //修改性别

            $("#select").change(function () {
                var options = $("#select option:selected").val();
                $.ajax({
                    type: "GET",
                    url: "http://www.i7quan.com/app/ModifySex",
                    data: {"cid": cid, "sex": options},
                    async: true,
                    dataType: "json",
                    success: function (data) {
                        alert(data.msg)
                    }
                });
            })
            //实名认证
            $(".fourth").click(function () {
                if ($(".real_state").html() == "已认证") {
                    window.location.href = "modify_tip2.html";
                }
                if ($(".real_state").html() == "未认证" || $(".real_state").html() == "未通过") {
                    window.location.href = "modify_Authentication.html";
                }
                if ($(".real_state").html() == "审核中") {
                    window.location.href = "modify_tip.html";
                }
            })
            //修改个人简介
            $(".fifth").click(function () {
                window.location.href = "modify_synopsis.html";
            })

        }

    });

})