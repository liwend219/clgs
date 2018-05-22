$(function () {
    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //接口
    //网址
    var website = myApi.getApi("WEBSITE");
    //忘记密码接口
    var forgetPwd = website + myApi.getApi("FORGOTPASS");
    // 获取验证码接口
    var smsCode = website + myApi.getApi("FORGOTSMSCODE");

    $("#forget_password .confirm_btn").click(function () {
        //获取手机号
        var forget_phone = $("#forget_password .forget_item .forget_phone").val();
        //获取验证码
        var forget_code = $("#forget_password .forget_item .forget_code").val();
        //获取第一次的密码
        var forget_password = $("#forget_password .forget_item .forget_password").val();
        //获取第二次的密码
        var forget_password_sec = $("#forget_password .forget_item .forget_password_sec").val();

        if (forget_phone == "") {
            $("#tip").text("请输入手机号码").css("display", "block");
            tipMsg();

        } else if (!checkMobile(forget_phone)) {
            $("#tip").text("手机号码不正确").css("display", "block");
            tipMsg();

        } else if (forget_code == "") {
            $("#tip").text("请输入验证码").css("display", "block");
            tipMsg();

        } else if (forget_password == "") {
            $("#tip").text("密码不能为空").css("display", "block");
            tipMsg();

        } else if (forget_password_sec == "") {
            $("#tip").text("密码不能为空").css("display", "block");
            tipMsg();

            // 验证密码
        } else if (!checkPwd(forget_password) && !checkPwd(forget_password_sec)) {
            $("#tip").text("只能输入6-15个字母、数字、下划线").css("display", "block");
            tipMsg();

        } else if (forget_password_sec != forget_password) {
            $("#tip").text("密码不一致").css("display", "block");
            tipMsg();

        } else {
            $.ajax({
                url: forgetPwd,
                type: "post",
                dataType: "json",
                data: {
                    "phone": forget_phone,
                    "code": forget_code,
                    "pwd": forget_password
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
                    $("#tip").text("修改失败").css("display", "block");
                    tipMsg();
                }
            });
        }
    });

    // 获取验证码
    $("#forget_password .forget_item .getCode").click(function () {
        var forget_phone = $("#forget_password .forget_item .forget_phone").val();
        if (forget_phone == "") {
            $("#tip").text("请输入手机号码").css("display", "block");
            tipMsg();
            return;
        } else if (!checkMobile(forget_phone)) {
            $("#tip").text("手机号码不正确").css("display", "block");
            tipMsg();
            return;
        } else {
            $.ajax({
                url: smsCode,
                type: "post",
                dataType: "json",
                data: {"phone": forget_phone},
                success: function (data) {

                    $("#tip").text(data.msg).css("display", "block");
                    tipMsg();

                    //验证码倒计时
                    var timer;
                    var count = 120;
                    timer = setInterval(function () {
                        if (count <= 0) {
                            clearInterval(timer);
                            $("#forget_password .forget_item .getCode").text("获取验证码").removeAttr("disabled").css("opacity", "1");
                        } else {
                            count--;
                            $("#forget_password .forget_item .getCode").text(count + "秒后获取").attr("disabled", "disabled").css("opacity", "0.5");
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
});