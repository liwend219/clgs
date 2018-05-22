$(function () {
    //获取订单id
    var sid = sessionStorage.getItem("sid");

    //登陆状态
    var cid = sessionStorage.getItem("cid");

    //跳转标识
    var identification = sessionStorage.getItem("跳转标识");

    //获取我的拼单参与资产
    var join_assets = sessionStorage.getItem("参与资产");

    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");
    //拼单查看详情接口
    var StrategyContent = website + myApi.getApi("STRATEGYCONTENT");
    //拼单平仓接口
    var CloseStrategy = website + myApi.getApi("CLOSESTRATEGY");
    //参与拼单接口
    var JoinStategy = website + myApi.getApi("JOINSTATEGY");
    //获取服务费接口
    var GetFee = website + myApi.getApi("GETFEE");
    //获取用户信息接口
    var userInfo = website + myApi.getApi("USERINFO");

    $.ajax({
        url: StrategyContent,
        type: "get",
        dataType: "json",
        data: {
            "sid": sid,
            "cid": cid
        },
        success: function (data) {
            var datas = data.data;
            var str = "";
            var temp = $("#fight_details").html();

            //获取拼单总额
            var total_money = datas.总额度;
            total_money = parseInt(total_money.replace(/万/g, ""));

            var complete_money = datas.已参与;
            complete_money = parseInt(complete_money.replace(/万/g, ""));

            //完成拼单剩余金额
            var surplus_money = total_money - complete_money;

            //完成状态
            var complete_state = datas.状态;

            //是否可平仓
            var close = datas.是否可平仓;

            if (total_money == complete_money) {
                temp = temp.replace("@display", "display: none");
            } else {
                temp = temp.replace("@display", "display: inline-block");
            }

            if (close && complete_state == "持仓中") {
                temp = temp.replace("@show", "display: inline-block");
            } else {
                temp = temp.replace("@show", "display: none");

            }

            str += temp.replace("@code_title", datas.代码)
                .replace("@shares_title", datas.股票)
                .replace("@profit_money", datas.费用)
                .replace("@product_day", datas.期限)
                .replace("@total_money", datas.总额度)
                .replace("@surplus_money", surplus_money + "万")
                .replace("@initiator_name", datas.发起人)
                .replace("@code", datas.代码)
                .replace("@shares", datas.股票)
                .replace("@term_time", datas.截止时间)
                .replace("@category", datas.执行方式)
                .replace("@price", datas.执行价)
                .replace("@num", datas.拼单人数)
                .replace("@strategy_text", datas.策略简介);

            $("#container").html(str);

            //获取订单截止时间
            var end_time = $("#release_box .release_content .term_box .term_time").text();
            countDown(end_time, "#count_down");

            //跳转标识改变内容
            if (identification == "fight") {
                $("#release_box .indefinite_box .indefinite_text").text("投顾期限");
                $("#release_box .indefinite_box .indefinite").text(datas.期限);
            }

            if (identification == "myFight") {
                $("#release_box .indefinite_box .indefinite_text").text("拼单资产");
                $("#release_box .indefinite_box .indefinite").text(join_assets);
            }

            //参与拼单
            $("#container #product_details .fight_btn").click(function () {
                $("#joinFight_model").fadeIn();

                //存储拼单总金额
                $("#joinFight_model .model_content .total_money").text(total_money);

                //获取与存储拼单已完成金额
                $("#joinFight_model .model_content .completed").text(surplus_money);

                //获取与设置发起人名称
                var initiator_name = $("#release_box .release_content .initiator_name").text();
                $("#joinFight_model .model_content .strategy_box .strategy_name").text(initiator_name);

                //获取与设置股票代码和名称
                var project_name = datas.代码 + datas.股票;
                $("#joinFight_model .model_content .collageProject_box .collageProject_name").text(project_name);

                //获取与存储服务费参数
                //获取与存储股票代码
                var code = datas.代码;
                $("#joinFight_model .model_content .code").text(code);
                //获取与存储股票期限
                var term = datas.期限;
                $("#joinFight_model .model_content .term").text(term);
            });

            //平仓
            $("#container #product_details .close_btn").click(function () {
                $("#closePosition_model").fadeIn();

                //获取与设置股票代码和名称
                var code_shares = $("#release_box .release_content .project_box .project_name").text();
                $("#closePosition_model .model_content .code_box .code_name").text(code_shares);

                //存储拼单总金额
                $("#closePosition_model .model_content .closePosition_box .closePosition_assets").val(total_money);
            });
        },
        error: function () {
            $("#tip").text("加载失败").css("display", "block");
            tipMsg();
        }
    });

    //参与拼单取消事件
    $("#joinFight_model .model_content .model_option .cancel").click(function () {
        $("#joinFight_model").fadeOut();

        $("#joinFight_model .model_content .subscription_box .subscription_price").val("");

        $("#joinFight_model .model_content .cost_box .cost").text("");
    });

    //参与拼单确定事件
    $("#joinFight_model .model_content .model_option .sure").click(function () {
        //获取认购金额
        var subscription = $("#joinFight_model .model_content .subscription_box .subscription_price").val();

        //获取已完成金额
        var completed = $("#joinFight_model .model_content .completed").text();

        //获取总金额
        var total_money = $("#joinFight_model .model_content .total_money").text();

        //获取服务费
        var payment_price = $("#joinFight_model .model_content .cost_box .cost").text();
        //截取掉单位 元
        payment_price = payment_price.replace(/元/g, "");

        if (!isNaN(payment_price)) {
            $.ajax({
                type: "get",
                url: userInfo,
                data: {
                    "cid": cid
                },
                dataType: "json",
                success: function (data) {
                    var datas = data.datas;
                    //认证状态
                    // var real_state = datas.状态;
                    // sessionStorage.setItem("state", real_state);

                    //余额
                    var balance = datas.余额;
                    sessionStorage.setItem("balance", balance);
                },
                error: function () {
                    $("#tip").text("服务器错误").css("display", "block");
                    tipMsg();
                }
            });
        }

        //账户余额
        var balance = sessionStorage.getItem("balance");

        if (subscription == "") {
            $("#tip").text("认购金额不能为空").css("display", "block");
            tipMsg();

        } else if (subscription.indexOf(0) == 0) {
            $("#tip").text("认购金额不能0开头").css("display", "block");
            tipMsg();

        } else if (subscription < 10) {
            $("#tip").text("认购金额不能低于10").css("display", "block");
            tipMsg();

        } else if (subscription % 10 != 0) {
            $("#tip").text("请输入10的整数倍").css("display", "block");
            tipMsg();

        } else if (parseInt(subscription) + parseInt(completed) > parseInt(total_money)) {
            $("#tip").text("金额不能大于拼单总金额,还可拼" + completed + "万").css("display", "block");
            tipMsg();

        } else if (isNaN(payment_price)) {
            $("#tip").text("请获取投顾费用后再提交").css("display", "block");
            tipMsg();

        } else if (Number(balance) < Number(payment_price)) {
            $("#tip").text("账户余额不足, 请前往充值").css("display", "block");
            tipMsg();

        } else {
            $("#joinFight_model").fadeOut();

            //调用参与拼单模态框
            joinFight(sid, subscription, cid);

            $("#joinFight_model .model_content .subscription_box .subscription_price").val("");

            $("#joinFight_model .model_content .cost_box .cost").text("");
        }
    });

    //防止快速多次点击标识
    var flag = false;
    //延时器变量
    var timer = null;

    //平仓取消事件
    $("#closePosition_model .model_content .model_option .cancel").click(function () {
        $("#closePosition_model").fadeOut();
    });

    //平仓确定事件
    $("#closePosition_model .model_content .model_option .cancel").click(function () {
        flag = true;

        tiemr = setTimeout(function () {
            if (flag) {
                //重置标识
                flag = false;

                $.ajax({
                    url: CloseStrategy,
                    type: "post",
                    data: {
                        "cid": cid,
                        "sid": sid
                    },
                    success: function (data) {
                        $("#closePosition_model").fadeOut();

                        $("#tip").text(data.msg).css("display", "block");
                        tipMsg();
                    },
                    error: function () {
                        $("#tip").text("平仓失败, 请重试").css("display", "block");
                        tipMsg();
                    }
                });
            } else {
                clearTimeout(timer);
            }
        }, 300);
    });


    $("#joinFight_model .model_content .subscription_box .subscription_price").on("input", function () {
        //获取认购金额
        var subscription = $("#joinFight_model .model_content .subscription_box .subscription_price").val();

        //获取股票代码
        var code = $("#joinFight_model .model_content .code").text();

        //获取股票期限
        var term = $("#joinFight_model .model_content .term").text();

        if (subscription.length < 2) {
            $("#joinFight_model .model_content .cost_box .cost").text("");
            return;

        } else {
            //获取服务费
            getFee(code, term, subscription, cid);

        }
    });

    // 参与拼单请求
    function joinFight(id, principal, cid) {
        $.ajax({
            url: JoinStategy,
            type: "get",
            dataType: "json",
            data: {
                "cid": cid,
                "sid": id,
                "principal": principal
            },
            success: function (data) {
                $("#tip").text(data.msg).css("display", "block");
                tipMsg();

                //跳转标识
                sessionStorage.setItem("跳转标识", "fight_payment");

                //获取与设置订单名称及代码
                var order_name = $("#joinFight_model .model_content .collageProject_box .collageProject_name").text();
                sessionStorage.setItem("order_name", order_name);

                //获取与设置服务费
                var payment_price = $("#joinFight_model .model_content .cost_box .cost").text();
                sessionStorage.setItem("payment_price", payment_price);

                //获取拼单下单时间
                sessionStorage.setItem("payment_time", new Date().Format("yyyy-M-d hh:mm:ss"));

                setTimeout(function () {
                    window.location.href = "payment.html";
                }, 1000);
            },
            error: function () {
                $("#tip").text("拼单失败").css("display", "block");
                tipMsg();
            }
        });
    }

    //获取服务费请求
    function getFee(code, term, assets, cid) {
        $.ajax({
            url: GetFee,
            type: "get",
            dataType: "json",
            data: {
                "code": code,
                "exeprice": 100, //拼单执行价默认100, 去掉%号
                "term": term,
                "principal": assets,
                "cid": cid
            },
            success: function (data) {
                var msg = data.msg;
                if (isNaN(msg)) {
                    $("#joinFight_model .model_content .cost_box .cost").text(data.msg);
                } else {
                    $("#joinFight_model .model_content .cost_box .cost").text(data.msg + "元");
                }
            },
            error: function () {
                $("#tip").text("获取投顾费用失败").css("display", "block");
                tipMsg();
            }
        });
    }

    //倒计时
    function countDown(time, id) {
        var day_elem = $(id).find('.day');
        var hour_elem = $(id).find('.hour');
        var minute_elem = $(id).find('.minute');
        var second_elem = $(id).find('.second');
        var end_time = new Date(time).getTime(),//月份是实际月份-1
            sys_second = (end_time - new Date().getTime()) / 1000;

        var timer = setInterval(function () {
            if (sys_second > 1) {
                sys_second -= 1;
                var day = Math.floor((sys_second / 3600) / 24);
                var hour = Math.floor((sys_second / 3600) % 24);
                var minute = Math.floor((sys_second / 60) % 60);
                var second = Math.floor(sys_second % 60);
                day_elem && $(day_elem).text(day);//计算天
                $(hour_elem).text(hour < 10 ? "0" + hour : hour);//计算小时
                $(minute_elem).text(minute < 10 ? "0" + minute : minute);//计算分钟
                $(second_elem).text(second < 10 ? "0" + second : second);//计算秒
            } else {
                clearInterval(timer);
                $("#count_down span").css("color", "#393939");
            }
        }, 1000);
    }

});