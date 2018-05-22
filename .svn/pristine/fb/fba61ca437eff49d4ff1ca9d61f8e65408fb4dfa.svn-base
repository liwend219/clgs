$(function () {

    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");
    //注册接口
    var reg = website + myApi.getApi("REGISTER");
    //注册获取验证码接口
    var smsCode = website + myApi.getApi("SENDSMSCODE");

    //防止快速多次点击标识
    var flag = false;
    //延时器变量
    var timer = null;

    //注册
    $(".register_btn").click(function () {
        var register_phone = $(".register_phone").val();
        var register_code = $(".register_code").val();
        var register_password = $(".register_password").val();
        var register_password_sec = $(".register_password_sec").val();
        var register_code2 = $(".register_code2").val();

        flag = true;

        timer = setTimeout(function () {
            if (flag) {
                //重置标识
                flag = false;

                if (register_phone == "") {
                    $("#tip").text("请输入手机号码").css("display", "block");
                    tipMsg();

                    // 验证手机号
                } else if (!checkMobile(register_phone)) {
                    $("#tip").text("手机号不正确").css("display", "block");
                    tipMsg();

                } else if (register_code == "") {
                    $("#tip").text("请输入验证码").css("display", "block");
                    tipMsg();

                } else if (register_password == "") {
                    $("#tip").text("密码不能为空").css("display", "block");
                    tipMsg();

                } else if (register_password_sec == "") {
                    $("#tip").text("密码不能为空").css("display", "block");
                    tipMsg();

                    // 验证密码
                } else if (!checkPwd(register_password) && !checkPwd(register_password_sec)) {
                    $("#tip").text("只能输入6-15个字母、数字、下划线").css("display", "block");
                    tipMsg();

                } else if (register_password_sec != register_password) {
                    $("#tip").text("密码不一致").css("display", "block");
                    tipMsg();

                } else if (register_code2 == "") {
                    $("#tip").text("邀请码不能为空").css("display", "block");
                    tipMsg();

                } else {
                    $.ajax({
                        url: reg,
                        type: "post",
                        dataType: "json",
                        data: {
                            "phone": register_phone,
                            "smscode": register_code,
                            "referrer": register_code2,
                            "pwd": register_password,
                            "secpwd": register_password_sec
                        },
                        success: function (data) {
                            if (data.rs) {
                                setTimeout(function () {
                                    window.location.href = "logoIn.html"
                                }, 1000);

                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();
                            } else {
                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();
                            }
                        },
                        error: function () {
                            $("#tip").text("注册失败").css("display", "block");
                            tipMsg();
                        }
                    });
                }
            } else {
                clearTimeout(timer);
            }
        }, 300);
    });

    // 获取验证码
    $(".getCode").click(function () {
        var register_phone = $(".register_phone").val();
        if (register_phone == "") {
            $("#tip").text("请输入手机号码").css("display", "block");
            tipMsg();
            return;
        } else if (!checkMobile(register_phone)) {
            $("#tip").text("手机号码不正确").css("display", "block");
            tipMsg();
            return;
        } else {
            $.ajax({
                url: smsCode,
                type: "post",
                dataType: "json",
                data: {"phone": register_phone},
                success: function (data) {

                    $("#tip").text(data.msg).css("display", "block");
                    tipMsg();

                    //验证码倒计时
                    var timer;
                    var count = 120;
                    timer = setInterval(function () {
                        if (count <= 0) {
                            clearInterval(timer);
                            $(".getCode").text("获取验证码").removeAttr("disabled").css("opacity", "1");
                        } else {
                            count--;
                            $(".getCode").text(count + "秒后获取").attr("disabled", "disabled").css("opacity", "0.5");
                        }
                    }, 1000);
                },
                error: function () {
                    $("#tip").text("获取验证码失败").css("display", "block");
                    tipMsg();
                }
            });
        }
    });

    //判断协议是否被选中
    $(".checkbox").change(function () {
        if ($("input[type='checkbox']").is(':checked')) {
            $(".checkbox").attr("checked", "checked");
            $(".register_btn").removeAttr("disabled");
            $(".register_btn").css({
                "opacity": 1,
                "cursor": "pointer"
            });
        } else {
            $(".checkbox").removeAttr("checked");
            $(".register_btn").attr("disabled", "disabled");
            $(".register_btn").css({
                "opacity": 0.5,
                "cursor": "Default"
            });
            $("#tip").text("请勾选协议").css("display", "block");
            tipMsg();
        }
    });

    //协议跳转
    $(".agreement .text a").click(function () {
        window.location.href = "agreement.html";
        // 跳转标识
        sessionStorage.setItem("跳转标识", "register_agreement");
    });
});