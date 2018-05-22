$(function () {

    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //获取成交查看详情本地存储
    //股票id
    var id = localStorage.getItem("id");

    //登陆状态
    var cid = sessionStorage.getItem("cid");

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");
    //浮动盈亏和当前价接口
    var float = website + myApi.getApi("FLOATPROFIT");
    //平仓接口
    var closeOrder = website + myApi.getApi("CLOSEORDER");

    //股票代码和名称
    var stock_info = localStorage.getItem("stock_info");

    //股票初始价
    var init_price = localStorage.getItem("init_price");

    //股票执行方式
    var category = localStorage.getItem("category");
    $(".content .content_lists .implement_box .category").text(category);

    //股票执行价
    var price = localStorage.getItem("price");
    $(".content .content_lists .price_box .price").text(price + "%");

    //股票期限
    var term = localStorage.getItem("term");
    $(".content .content_lists .term_box .term").text(term);

    //股票投顾资产
    var investment_assets = localStorage.getItem("investment_assets");
    $(".content .content_lists .investment_box .investment_assets").text(investment_assets);

    //股票可用资产
    var available_assets = localStorage.getItem("available_assets");
    $(".content .content_lists .available_box .available_assets").text(available_assets);

    //股票服务费
    var cost = localStorage.getItem("cost");
    $(".content .content_lists .cost_box .cost").text(cost + "元");

    //股票到期时间
    var expire_time = localStorage.getItem("expire_time");
    $("#state_diagram .state_content .state_end .end_time").text(expire_time);

    //股票开始时间
    var begin_time = localStorage.getItem("begin_time");
    $("#state_diagram .state_content .state_start .start_time").text(begin_time);

    //股票状态
    var shares_state = localStorage.getItem("shares_state");

    $.ajax({
        url: float,
        type: "get",
        dataType: "json",
        data: {
            "idarr": id
        },
        success: function (data) {
            var str = "";
            var temp = $("#shares_info").html();

            str += temp.replace("@stock_info", stock_info)
                .replace("@init_price", init_price)
                .replace("@current_price", data[0].newpric)
                .replace("@profit", data[0].profit);

            $("#product").html(str);

            //判断浮动盈亏为正/负值
            //获取浮动盈亏数值
            var profit = $("#product .profit").text();
            //转为数值型
            profit = Number(profit);
            if (profit < 0) {
                $("#product .profit").css("color", "#2ba245");
            }
        },
        error: function () {
            $("#tip").text("信息获取缺失，请刷新页面").css("display", "block");
            tipMsg();
        }
    });

    if (shares_state == "持仓中" || shares_state == "部分平仓") {
        $("#close_position").css("display", "block");

        // 平仓操作
        $("#close_position .position_btn").click(function () {
            $("#closePosition_model").fadeIn();

            //股票代码和名称
            var stock_name = $("#product .title").text();

            //可用资产
            var closePosition_assets = $(".content .content_lists .available_box .available_assets").text();
            //截取掉 万 字符
            closePosition_assets = closePosition_assets.replace(/万/g, "");

            if (closePosition_assets < 100) {
                $("#closePosition_model .model_content .closePosition_box .closePosition_assets").attr("readonly", "readonly");

                // $("#tip").text("可用资产低于100万不能自由平仓").css("display", "block");
                // tipMsg();
            }

            //设置平仓模态框股票代码
            $("#closePosition_model .model_content .code_box .code_name").text(stock_name);

            //设置平仓模态框平仓资产
            $("#closePosition_model .model_content .closePosition_box .closePosition_assets").val(closePosition_assets);
        });

    } else {
        $("#close_position").css("display", "none");
    }

    //防止快速多次点击标识
    var flag = false;
    //延时器变量
    var timer = null;

    // 平仓模态框事件
    // 取消事件
    $("#closePosition_model .model_content .model_option .cancel").click(function () {
        $("#closePosition_model").fadeOut();
    });

    //确定事件
    $("#closePosition_model .model_content .model_option .sure").click(function () {
        //可用资产
        var closePosition_assets = $(".content .content_lists .available_box .available_assets").text();
        //截取掉 万 字符
        closePosition_assets = closePosition_assets.replace(/万/g, "");

        //平仓资产
        var assets = $("#closePosition_model .model_content .closePosition_box .closePosition_assets").val();
        //截取掉 万 字符
        assets = assets.replace(/万/g, "");

        flag = true;

        timer = setTimeout(function () {
            if (flag) {
                //重置标识
                flag = false;

                if (assets == "") {
                    $("#tip").text("平仓资产不能为空").css("display", "block");
                    tipMsg();

                } else if (assets == false) {
                    $("#tip").text("平仓资产不能为零").css("display", "block");
                    tipMsg();

                } else if (assets.indexOf(0) == 0) {
                    $("#tip").text("输入金额不能0开头").css("display", "block");
                    tipMsg();

                } else if (closePosition_assets > 100 && assets % 100 != 0) {
                    $("#tip").text("请输入100的整数倍").css("display", "block");
                    tipMsg();

                } else if (parseInt(assets) > parseInt(closePosition_assets)) {
                    $("#tip").text("输入金额不能大于可用资产").css("display", "block");
                    tipMsg();

                } else {

                    $("#closePosition_model").fadeOut();

                    $.ajax({
                        url: closeOrder,
                        type: "get",
                        dataType: "json",
                        data: {
                            "cid": cid,
                            "oid": id,
                            "principal": assets
                        },
                        success: function (data) {
                            $("#tip").text(data.msg).css("display", "block");
                            tipMsg();
                        },
                        error: function () {
                            $("#tip").text("平仓失败").css("display", "block");
                            tipMsg();
                        }
                    });
                }
            } else {
                clearTimeout(timer);
            }
        }, 300);
    });
});