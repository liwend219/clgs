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
            var temp = $("body").html();
            var str1 = datas.卡号;
            var str2 = str1.substr(str1.length - 4);
            //替换模板内容
            str += temp.replace("@bank", datas.银行)
                .replace("@11", str2)

            $("body").html(str);
            //判断发过来的银行名称是否为各大银行，如果有这个银行，就把这个银行的相片放上去，
            if (datas.银行 == "工商银行"||datas.银行 == "中国工商银行") {
                $(".pic_bank img").attr("src", "images/20171228101805.jpg");
            }
            if (datas.银行 == "农业银行"||datas.银行 == "中国农业银行") {
                $(".pic_bank img").attr("src", "images/20171228101943.jpg");
            }
            if (datas.银行 == "中国银行") {
                $(".pic_bank img").attr("src", "images/20171228102035.jpg");
            }
            if (datas.银行 == "建设银行"||datas.银行 == "中国建设银行") {
                $(".pic_bank img").attr("src", "images/20171228101914.jpg");
            }
            if (datas.银行 == "光大银行"||datas.银行 == "中国光大银行") {
                $(".pic_bank img").attr("src", "images/20171228101841.jpg");
            }
            if (datas.银行 == "华夏银行"||datas.银行 == "中国华夏银行") {
                $(".pic_bank img").attr("src", "images/20171228101848.jpg");
            }
            if (datas.银行 == "北京银行") {
                $(".pic_bank img").attr("src", "images/20171228101826.jpg");
            }
            if (datas.银行 == "交通银行"||datas.银行 == "中国交通银行") {
                $(".pic_bank img").attr("src", "images/20171228101930.jpg");
            }
            if (datas.银行 == "上海银行") {
                $(".pic_bank img").attr("src", "images/20171228102012.jpg");
            }
            if (datas.银行 == "中国邮政"||datas.银行 == "中国邮政储蓄银行"||datas.银行 == "邮储银行") {
                $(".pic_bank img").attr("src", "images/20171228102020.jpg");
            }
            if (datas.银行 == "招商银行"||datas.银行 == "中国招商银行") {
                $(".pic_bank img").attr("src", "images/timg.jpg");
            }
            if (datas.银行 == "浦发银行"||datas.银行 == "浦东发展银行") {
                $(".pic_bank img").attr("src", "images/pudongfazhan.jpg");
            }
            if (datas.银行 == "平安银行"||datas.银行 == "中国平安银行") {
                $(".pic_bank img").attr("src", "images/soZOmnnS54dy.jpg");
            }
            if (datas.银行 == "中信银行") {
                $(".pic_bank img").attr("src", "images/zhongxin.jpg");
            }
            if (datas.银行 == "兴业银行") {
                $(".pic_bank img").attr("src", "images/xingye.jpg");
            }
            if (datas.银行 == "" || datas.银行 == null) {
                $(".pic_bank img").attr("src", "images/icon_big.png");
            }
            //判断是否进行过实名认证
//           if(datas.状态 == "未认证" || datas.状态 == "未通过" || datas.状态 == "审核中"){
//           	window.location.href="modify_Authentication.html"
//           }
        }
    });
    //判断发过来的银行名称是否为各大银行，如果有这个银行，就把这个银行的相片放上去，
    //@"工商银行",@"农业银行",@"中国银行",@"建设银行",@"光大银行",@"华夏银行",@"北京银行",@"交通银行",@"上海银行",@"中国邮政"


})