$(function () {


    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //验证码
    $("#getCode").click(function () {
        var cid = sessionStorage.getItem("cid");
        $.ajax({
            type: "POST",
            url: "http://www.i7quan.com/app/SendModifyCardCode",
            data: {"cid": cid,},
            async: true,
            dataType: "json",
            success: function (data) {
                $("#tip").text(data.msg).css("display", "block");
                tipMsg();
            }


        })
    })
    //提交
    $(".confirm_btn").click(function () {
        var forget_cardnum = $.trim($(".forget_cardnum").val());
        var bank = $.trim($("#bank").val());
        var selProvince = $.trim($("#selProvince").val());
        var selCity = $.trim($("#selCity").val());
        var forget_bankaddress = $.trim($(".forget_bankaddress").val());
        var forget_Code = $.trim($(".forget_Code").val());


        if (forget_cardnum == "" || bank == "" || bank == "0" || selCity == "" || forget_bankaddress == "" || forget_Code == "") {
            $("#tip").text("信息不完善").css("display", "block");
            tipMsg();
        }
        else {
            var cid = sessionStorage.getItem("cid");
            $.ajax({
                type: "POST",
                url: "http://www.i7quan.com/app/ModifyCard",
                data: {
                    "cid": cid,
                    "code": forget_Code,
                    "cardno": forget_cardnum,
                    "bank": bank,
                    "province": selProvince,
                    "city": selCity,
                    "bankaddress": forget_bankaddress
                },
                async: true,
                dataType: "json",
                success: function (data) {
                    $("#tip").text(data.msg).css("display", "block");
                    tipMsg();

                }


            })
        }


    })
})