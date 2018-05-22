
$(function () {

    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //存本地
    $("input[type='checkbox']").change(function () {
        if ($("input[type='checkbox']").is(':checked')) {
            var $v1 = $(".logoIn_phone").val();
            var $v2 = $(".logoIn_password").val();

            localStorage.setItem("phone", $v1);
            localStorage.setItem("password", $v2);
            localStorage.setItem("checked", $("input[type='checkbox']").is(':checked'));
            $("input[type='checkbox']").attr("checked", "checked");

        }
        else {
            localStorage.setItem("checked_f", $("input[type='checkbox']").is(':checked'));
            localStorage.removeItem("checked");
        }
    });

    $(document).ready(function () {
        var checked = localStorage.getItem("checked");
        var checked_f = localStorage.getItem("checked_f");
        if (checked_f == false) {
            $(".checkbox").remove("checked");
            $(".logoIn_password").val("");

        }
        if (checked) {
            $(".checkbox").attr("checked", "checked");
            var phone = localStorage.getItem("phone");
            $(".logoIn_phone").val(phone);
            var password = localStorage.getItem("password");
            $(".logoIn_password").val(password);
        }
    });
    //登陆
    $(".logoIn_btn").click(function () {
        var $v1 = $(".logoIn_phone").val();
        var $v2 = $(".logoIn_password").val();
        $.ajax({
            type: "POST",
            url: "http://120.55.164.87:8090/app/Login",
            data: {"acc": $v1, "pwd": $v2},
            async: false,
            dataType: "json",
            success: function (data) {
            	console.log(data)
                var a = data.msg;
                var b = data.rs;
                var c = data.cid;
                $("#tip").text(a);
                if ($v1 == "" || $v2 == "") {
                    $("#tip").text("用户名或密码不能为空").css("display", "block");
                    tipMsg();
                }
                if (b == true) {
                    // 当success的值为true时，表示登录成功
                    sessionStorage.setItem("rs", b);
                    sessionStorage.setItem("cid", c);
                    setTimeout(function () {
                        window.location.href = "index.html";
                    }, 1000);

                    $("#tip").text("登录成功").css("display", "block");
                    tipMsg();
                }
                else {
                    $("#tip").text(data.msg).css("display", "block");
                    tipMsg();
                }
            },
            error: function () {
                $("#tip").text("网络异常").css("display", "block");
                tipMsg();
            }
        });
    });

    $(".register_btn").click(function () {
        window.location.href = "register.html";
    })
});