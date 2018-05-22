$(function () {

    //拿到本地，获取用户资金
    var cid = sessionStorage.getItem("cid");
    $.ajax({
        type: "POST",
        url: "http://120.55.164.87:8090/app/userinfo",
        data: {"cid": cid},
        async: true,
        dataType: "json",
        success: function (data) {
            var datas = data.datas;
//          console.log(datas);
            var str = "";
            var count = 0;
            var temp = $(".body").html();
            $(datas).each(function (i, v) {
                var a = v.头像;
                var b = "http://120.55.164.87:8090/";
                var img = b + a;
                //替换模板内容
                str += temp.replace($(".one_number").html(), v.余额 + v.冻结资金)
                    .replace($("#mm").html(), v.余额)
                    .replace($("#mv").html(), v.冻结资金)
                $(".body").html(str);
            });

            var state = datas.状态;
//          console.log(state)
            if (state != "已认证") {
                $(".Recharge").click(function () {
                    window.location.href = "alipay.html";
                });
                $(".raisecash").click(function () {
                    alert("您未进行实名认证")
                })
                //打开银行卡
                $(".bank_btn").click(function () {
                    alert("您未进行实名认证")
                });
            }
            else {
                //打开充值
                $(".Recharge").click(function () {
                    window.location.href = "alipay.html";
                });
                //打开提现
                $(".raisecash").click(function () {
                    window.location.href = "raisecash.html";
                })
                //打开银行卡
                $(".bank_btn").click(function () {
                    window.location.href = "bankcard.html";
                });
            }
            //打开明细
            $(".detailed").click(function () {
                window.location.href = "detailed.html";
            });
        }
    });

})