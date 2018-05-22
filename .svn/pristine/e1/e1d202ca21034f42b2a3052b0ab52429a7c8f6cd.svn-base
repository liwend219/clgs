$(function () {
    //获取用户ID
    var userId = sessionStorage.getItem("用户ID");
    //获取用户头像
    var userIcon = sessionStorage.getItem("用户头像");

    //获取关注状态
    var follow_state = sessionStorage.getItem("关注状态");

    //登陆状态
    var cid = sessionStorage.getItem("cid");

    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");
    //高手详情用户信息接口
    var userInfo = website + myApi.getApi("RANKUSERINFO");
    //高手关注接口
    var attent = website + myApi.getApi("ATTENT");
    //高手详情收益信息接口
    var profit = website + myApi.getApi("RANKPROFIT");
    //高手详情最新调仓接口
    var changeOrder = website + myApi.getApi("NEWCHANGEORDER");
    //高手详情历史战绩接口
    var history = website + myApi.getApi("HISTORYDETAIL");

    $.ajax({
        url: userInfo,
        type: "get",
        dataType: "json",
        data: {
            "userid": userId,
            "cid": cid
        },
        success: function (data) {
            var str = "";
            // var follow = data.关注;
            var temp = $("#user_info").html();

            // if (follow) {
            //     temp = temp.replace("@add", "√")
            //         .replace("@follow", "已关注");
            // } else {
            //     temp = temp.replace("@add", "+")
            //     .replace("@follow", "关注");
            // }

            str += temp.replace("@userIcon", userIcon)
                .replace("@user_name", data.昵称)
                .replace("@real_name", data.实名)
                .replace("@fans", data.粉丝);

            $(".user_info").html(str);

            //关注状态
            $(".user_info .right .follow").text(follow_state);

            //添加关注
            $(".user_info .right").click(function () {

                var add_follow = $(".right .follow").text();

                if (add_follow == "已关注") {
                    $("#tip").text("请到关注列表取消关注").css("display", "block");
                    tipMsg();
                    return;

                } else {
                    $.ajax({
                        url: attent,
                        type: "get",
                        dataType: "json",
                        data: {
                            "cid": cid,
                            "aid": userId
                        },
                        success: function (data) {
                            if (data.rs) {
                                $(".right .follow").text("已关注");

                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();
                            }
                        },
                        error: function () {
                            $("#tip").text("关注失败").css("display", "block");
                            tipMsg();
                        }
                    });
                }
            });
        },
        error: function () {
            $("#tip").text("加载失败,请刷新页面").css("display", "block");
            tipMsg();
        }
    });

    // 收益信息
    $.ajax({
        url: profit,
        type: "get",
        dataType: "json",
        data: {
            "userid": userId
        },
        success: function (data) {
            var datas = data.datas;
            console.log(datas)
            var str = "";
            var temp = $("#profit").html();

            str += temp.replace("@winning", datas.胜率 + "%")
                .replace("@profit", datas.平均收益)
                .replace("@total", datas.总收益)
                .replace("@time", datas.更新日期)
                .replace("@cost", datas.总服务费)
                .replace("@assets", datas.总投顾资产 + "万");

            $(".analysis").html(str);
        }
    });

    //最新调仓
    $(".title_box .time").text(new Date().Format("yyyy-M-d hh:mm:ss"));

    $.ajax({
        url: changeOrder,
        type: "get",
        dataType: "json",
        data: {
            "userid": userId
        },
        success: function (data) {
            var datas = data.datas;
            var str = "";
            var temp = $("#ChangeOrders").html();

            $(datas).each(function (index) {
                str += temp.replace("@direction", datas[index].方向)
                    .replace("@name", datas[index].名称)
                    .replace("@code", datas[index].代码)
                    .replace("@assets", datas[index].投顾资产 + "万")
                    .replace("@deal", datas[index].成交价)
                    .replace("@new_time", datas[index].时间.substring(0, 10));
            });

            $(".news_box").html(str);

            //改变买卖图标背景
            $(".news_box .news .left_box .icon").each(function (index) {
                if ($(".news_box .news .left_box .icon").eq(index).text() == "买") {
                    $(".news_box .news .left_box .icon").eq(index).css("background", "#0498ff");
                }
            });

            //询价按钮
            $(".news_box .news .right_box .order_btn").click(function () {
                var index = $(".news_box .news .right_box .order_btn").index(this);
                var stock_code = $(".news_box .news .left_box .meg .number").eq(index).text();
                var stock_name = $(".news_box .news .left_box .meg .name").eq(index).text();

                sessionStorage.setItem("stock_code", stock_code);
                sessionStorage.setItem("stock_name", stock_name);
                sessionStorage.setItem("masterDetail_jump", "高手详情");
                window.location.href = "adviser.html"
            });
        }
    });

    //历史战绩
    $.ajax({
        url: history,
        type: "get",
        dataType: "json",
        data: {
            "userid": userId
        },
        success: function (data) {
            var datas = data.datas;
            var str = "";
            var temp = $("#HistoryDetail").html();

            $(datas).each(function (index) {
                var start_time = datas[index].开始时间.substr(5, 5).replace("-", "/");
                var end_time = datas[index].平仓时间.substr(5, 5).replace("-", "/");
                var up_down = datas[index].收益;
                var newUp_down = (Number(up_down) * 100).toFixed(2);

                str += temp.replace("@name", datas[index].名称)
                    .replace("@code", datas[index].代码)
                    .replace("@time", start_time + "-" + end_time)
                    .replace("@profit", newUp_down + "%");

            });

            $(".lists").html(str);
        }
    });

});