$(function () {
    var myDate = new Date();
    var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1;       //获取当前月份(1-12)
    var day = myDate.getDate();        //获取当前日(1-31)
    //获取完整年月日
    var newDay = year + "-" + month + "-" + day;
    $(".data").html(newDay)
    //点击二维码进入二维码界面
    $(".erweima").click(function () {
        window.location.href = "a_pic.html"
    })
})