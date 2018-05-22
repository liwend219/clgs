$(function() {
	var state = sessionStorage.getItem("state")
	console.log(state);
	if(state != "已认证"){
		alert("请先进行实名认证，如果已经进行实名认证请耐心等候认证结果！");
		window.location.href= "modify_Authentication.html"
	}
    //拼单选项切换
    $("#items_box .item .list .entry").click(function() {
        //选中样式
        var selected_style = "active";
        //要显示的部分
        var show = $("#project_content .item");
        //选中索引
        var index = $(this).index();
        //选中标签id
        var id = $(this).attr("id");
        //tab切换
        changeTab(this, selected_style, index, show);
        //存储选中标签id
        sessionStorage.setItem("fightId", id);
        //移除个人中心拼单记录跳转会话存储
        sessionStorage.removeItem("pindan");
        //刷新页面
        window.location.reload();
    });

    //拼单项目页码
    var pgindex_fight = 1;
    //我的拼单页码
    var pgindex_myFight = 1;
    //控制显示条数
    var pgsize = 5;

    //获取选中标签存储的id
    var fightId = sessionStorage.getItem("fightId");

    if (fightId == null || fightId == "fight") {
        //选中索引
        var fight_index = 0;
        //选中tab
        var fight_label = $("#items_box .item .list .entry").eq(fight_index);
        //要显示的部分
        var fight_show = $("#project_content .item");
        //选中样式
        var fight_style = "active";
        // tab切换
        changeTab(fight_label, fight_style, fight_index, fight_show);

    } else if (fightId == "myFight") {
        fight_index = 1;
        fight_label = $("#items_box .item .list .entry").eq(fight_index);
        fight_show = $("#project_content .item");
        fight_style = "active";
        changeTab(fight_label, fight_style, fight_index, fight_show);

    }

    //tab切换函数
    function changeTab(ele, style, index, show) {
        $(ele).addClass(style).siblings().removeClass(style);
        $(show).eq(index).show().siblings().hide();
    }

    //个人中心拼单跳转tab选中我的拼单
    // 获取跳转会话存储
    var fight_jump = sessionStorage.getItem("pindan");
    //选中索引
    var checked_index = 1;
    //选中tab
    var checked_label = $("#items_box .item .list .entry").eq(checked_index);
    //要显示的部分
    var checked_show = $("#project_content .item");
    //选中样式
    var checked_style = "active";
    if (fight_jump == "我的拼单") {
        //移除滚动高度
        sessionStorage.removeItem("fight_offsetTop");
        changeTab(checked_label, checked_style, checked_index, checked_show);
    }

    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function() {
            $("#tip").fadeOut(1000);
        }, 1000);
    }
    // 滚动加载数据
    $(window).scroll(function() {
        // 拼单项目选中
        var activeFight = $("#fight").hasClass("active");
        // 我的拼单选中
        var activeMyFight = $("#myFight").hasClass("active");
        //滚动高度
        var scrollTop = $(window).scrollTop();
        if (scrollTop != 0) {
            //存储滚动条高度
            sessionStorage.setItem("fight_offsetTop", $(window).scrollTop());
        }
        //需滚动部分高度
        var docHeight = $(document).height();
        //可视区域高度
        var winHeight = $(window).height();

        if (winHeight + scrollTop >= docHeight) {
            if (activeFight) {
                // 拼单项目
                fight(pgsize);
                //设置数据条数
                var fight_length = $("#project_fight .project .project_list").length + 5;
                sessionStorage.setItem("拼单条数", fight_length);
            } else if (activeMyFight) {
                // 我的拼单
                myFight(pgsize);
                //设置数据条数
                var myFight_length = $("#project_myFight .project .project_list").length + 5;
                sessionStorage.setItem("拼单条数", myFight_length);
            }
        }
    });

    $(function() {
        var _offset = sessionStorage.getItem("fight_offsetTop");
        //保存页面状态
        if (fightId == null || fightId == "fight" || fightId == "myFight") {
            fight(pgsize);
            myFight(pgsize);
            var fight_num = pgsize;
            sessionStorage.setItem("拼单条数", fight_num);
            fight_num = sessionStorage.getItem("拼单条数");
            $('body,html').animate({ scrollTop: _offset });

        }
    });

    //拼单项目
    //获取登陆状态
    var cid = sessionStorage.getItem("cid");

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");
    //拼单项目接口
    var fight_project = website + myApi.getApi("STRATEGYLIST");
    //我的拼单接口
    var myFight_project = website + myApi.getApi("MYSTRATEGYLIST");
    //参与拼单接口
    var join_fight = website + myApi.getApi("JOINSTATEGY");
    //获取服务费接口
    var getCost = website + myApi.getApi("GETFEE");
    //获取用户信息接口
    var userInfo = website + myApi.getApi("USERINFO");

    function fight(num) {
        $.ajax({
            url: fight_project,
            type: "get",
            dataType: "json",
            timeout: 10000,
            data: {
                "pgindex": pgindex_fight,
                "pgsize": num
            },
            beforeSend: function() {
                $(".bottom_tip").css({
                    "display": "block",
                    "position": "fixed",
                    "bottom": "0.9rem"
                });
            },
            success: function(data) {
                var datas = data.datas;
                var str = "";
                var temp = $("#fight_items").html();

                $(".bottom_tip").css("display", "none");

                if (datas == "") {
                    $(".bottom_tip").html("我也是有底线的").css({
                        "display": "block",
                        "background": "#e6e6e7",
                        "position": "absolute",
                        "bottom": "-0.75rem"
                    });
                    return;
                }

                $(datas).each(function(index) {
                    //拼单已完成金额
                    var completed = datas[index].完成度;
                    completed = completed.replace(/%/g, "");

                    var newTemp = temp;

                    if (completed == 100) {
                        newTemp = newTemp.replace("@hide", "display: none")
                            .replace("@show", "display: block")
                            .replace("@state", "参与拼单")
                            .replace("@joinBtn_color", "color: #bfbfbf");
                    } else {
                        newTemp = newTemp.replace("@hide", "display: block")
                            .replace("@show", "display: none")
                            .replace("@fight_state", datas[index].完成度)
                            .replace("@fightState_color", "color: #d63f2b")
                            .replace("@fightState_font", "font-size: 0.24rem")
                            .replace("@state", "参与拼单")
                            .replace("@joinBtn_color", "color: #d63f2b");
                    }

                    str += newTemp.replace("@sid", datas[index].ID)
                        .replace("@completed", datas[index].完成度)
                        .replace("@icon", website + datas[index].头像)
                        .replace("@user_name", datas[index].昵称)
                        .replace("@code", datas[index].代码)
                        .replace("@shares", datas[index].股票)
                        .replace("@term", datas[index].期限)
                        .replace("@time", datas[index].截止)
                        .replace("@join_num", datas[index].参加人数);

                });
                $("#project_fight .project").append(str);

                pgindex_fight++;

                //拼单项目详情
                $("#project_fight .project .project_list .items .details_btn").click(function() {

                    //设置页面跳转标识
                    sessionStorage.setItem("跳转标识", "fight");

                    //获取被点击标签索引
                    var index = $("#project_fight .project .project_list .items .details_btn").index(this);

                    // 设置存储相关信息
                    //股票订单id
                    var id = $("#project_fight .project .project_list .id").eq(index).text();
                    sessionStorage.setItem("sid", id);

                    //跳转详情页
                    window.location.href = "fight_details.html";
                });

                //参与拼单
                $("#project_fight .project .project_list .items .join_btn").click(function() {
                    $("#joinFight_model").fadeIn();

                    //获取被点击标签索引
                    var index = $("#project_fight .project .project_list .items .join_btn").index(this);

                    //获取与存储股票订单ID
                    var id = $("#project_fight .project .project_list .id").eq(index).text();
                    $("#joinFight_model .model_content .id").text(id);

                    //获取与设置发起人名称
                    var initiator_name = $("#project_fight .project .project_list .initiator_box .initiator_name").eq(index).text();
                    $("#joinFight_model .model_content .strategy_box .strategy_name").text(initiator_name);

                    //获取与设置股票代码和名称
                    var project_name = datas[index].代码 + datas[index].股票;
                    $("#joinFight_model .model_content .collageProject_box .collageProject_name").text(project_name);

                    //获取服务费函数参数
                    //获取与存储股票代码
                    var code = datas[index].代码;
                    $("#joinFight_model .model_content .code").text(code);
                    //获取与存储股票期限
                    var term = datas[index].期限;
                    $("#joinFight_model .model_content .term").text(term);

                    //获取与存储拼单总金额
                    var total = datas[index].总额;
                    //去掉单位万
                    total = total.replace(/万/g, "");
                    $("#joinFight_model .model_content .total_value").text(total);

                    //获取与存储已完成金额
                    var senate = datas[index].已完成;
                    //去掉单位万
                    senate = senate.replace(/万/g, "");
                    $("#joinFight_model .model_content .senate_value").text(senate);
                });

                //拼单金额完成 移除参与拼单事件
                var completed_assets = $("#project_fight .project .project_list .completed");
                $(completed_assets).each(function(index) {
                    var completed_text = $(this).text();
                    completed_text = completed_text.replace(/%/g, "");
                    if (completed_text == 100) {
                        $("#project_fight .project .project_list .items .join_btn").eq(index).unbind("click").css("cursor", "default");
                    }

                    var percentage = $('#project_fight .project .project_list .project_info .info_details .right .circle .mask .percentage').text(completed_text);

                    var circle_right = $('#project_fight .project .project_list .project_info .info_details .right .circle .circle_right');

                    var circle_left = $('#project_fight .project .project_list .project_info .info_details .right .circle .circle_left');

                    if ($(percentage).eq(index).text() <= 50) {

                        $(circle_right).eq(index).css('transform', 'rotate(' + ($(percentage).eq(index).text() * 3.6) + 'deg)');
                    } else {
                        $(circle_right).eq(index).css({
                            'transform': 'rotate(0deg)',
                            "background": "#d63f2b"
                        });

                        $(circle_left).eq(index).css('transform', 'rotate(' + (($(percentage).eq(index).text() - 50) * 3.6) + 'deg)');
                    }

                });
            },
            error: function(XMLHttpRequest, textStatus) {
                if (textStatus == "timeout") {
                    $("#tip").text("请求超时, 请刷新页面").css("display", "block");
                    tipMsg();
                } else {
                    $("#tip").text("加载失败").css("display", "block");
                    tipMsg();
                }
            }
        });
    }

    //获取认购金额调用服务费函数
    $("#joinFight_model .model_content .subscription_box .subscription_price").on("input", function() {

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

    //我的拼单
    function myFight(num) {
        $.ajax({
            url: myFight_project,
            type: "get",
            dataType: "json",
            data: {
                "cid": cid,
                "pgindex": pgindex_myFight,
                "pgsize": num
            },
            beforeSend: function() {
                $(".bottom_tip").css({
                    "display": "block",
                    "position": "fixed",
                    "bottom": "0.9rem"
                });
            },
            success: function(data) {
                var datas = data.datas;
                var str = "";
                var temp = $("#myFight_items").html();

                $(".bottom_tip").css("display", "none");

                if (datas == "") {
                    $(".bottom_tip").html("我也是有底线的").css({
                        "display": "block",
                        "background": "#e6e6e7",
                        "position": "absolute",
                        "bottom": "-0.75rem"
                    });
                    return;
                }

                $(datas).each(function(index) {
                    var completed = datas[index].完成度;
                    completed = completed.replace(/%/g, "");
                    var newTemp = temp;

                    if (completed == 100) {
                        newTemp = newTemp.replace("@hide", "display: none")
                            .replace("@show", "display: block")
                            .replace("@myState", "参与拼单")
                            .replace("@joinBtn_color", "color: #bfbfbf");
                    } else {
                        newTemp = newTemp.replace("@hide", "display: block")
                            .replace("@show", "display: none")
                            .replace("@myFight_state", datas[index].完成度)
                            .replace("@myFightState_color", "color: #d63f2b")
                            .replace("@myFightState_font", "font-size: 0.24rem")
                            .replace("@myState", "参与拼单")
                            .replace("@joinBtn_color", "color: #d63f2b");
                    }

                    str += newTemp.replace("@sid", datas[index].ID)
                        .replace("@completed", datas[index].完成度)
                        .replace("@icon", website + datas[index].头像)
                        .replace("@user_name", datas[index].昵称)
                        .replace("@code", datas[index].代码)
                        .replace("@shares", datas[index].股票)
                        .replace("@term", datas[index].期限)
                        .replace("@time", datas[index].截止)
                        .replace("@join_num", datas[index].参加人数)
                        .replace("@state", datas[index].状态);
                });
                $("#project_myFight .project").append(str);

                pgindex_myFight++;

                //我的拼单项目详情
                $("#project_myFight .project .project_list .items .details_btn").click(function() {

                    //跳转标识
                    sessionStorage.setItem("跳转标识", "myFight");

                    var index = $("#project_myFight .project .project_list .items .details_btn").index(this);

                    // 设置存储相关信息
                    //股票订单id
                    var id = $("#project_myFight .project .project_list .id").eq(index).text();
                    sessionStorage.setItem("sid", id);

                    //参与资产
                    sessionStorage.setItem("参与资产", datas[index].参与资产);

                    //跳转详情页
                    window.location.href = "fight_details.html";
                });

                //参与拼单
                $("#project_myFight .project .project_list .items .join_btn").click(function() {
                        $("#joinFight_model").fadeIn();
                    //获取被点击标签索引
                    var index = $("#project_myFight .project .project_list .items .join_btn").index(this);

                    //获取与存储股票订单ID
                    var id = $("#project_myFight .project .project_list .id").eq(index).text();
                    $("#joinFight_model .model_content .id").text(id);

                    //获取与设置发起人名称
                    var initiator_name = $("#project_myFight .project .project_list .initiator_box .initiator_name").eq(index).text();
                    $("#joinFight_model .model_content .strategy_box .strategy_name").text(initiator_name);

                    //获取与设置股票代码和名称
                    var project_name = datas[index].代码 + datas[index].股票;
                    $("#joinFight_model .model_content .collageProject_box .collageProject_name").text(project_name);

                    //获取服务费函数参数
                    //获取与存储股票代码
                    var code = datas[index].代码;
                    $("#joinFight_model .model_content .code").text(code);
                    //获取与存储股票期限
                    var term = datas[index].期限;
                    $("#joinFight_model .model_content .term").text(term);

                    //获取与存储拼单总金额
                    var total = datas[index].总额;
                    //去掉单位万
                    total = total.replace(/万/g, "");
                    $("#joinFight_model .model_content .total_value").text(total);

                    //获取与存储已完成金额
                    var senate = datas[index].已完成;
                    //去掉单位万
                    senate = senate.replace(/万/g, "");
                    $("#joinFight_model .model_content .senate_value").text(senate);
                });


                var completed_assets = $("#project_myFight .project .project_list .completed");
                $(completed_assets).each(function(index) {
                    var completed_text = $(this).text();
                    completed_text = completed_text.replace(/%/g, "");
                    if (completed_text == 100) {
                        $("#project_myFight .project .project_list .items .join_btn").eq(index).unbind("click").css("cursor", "default");
                    }

                    var percentage = $('#project_myFight .project .project_list .project_info .info_details .right .circle .mask .percentage').text(completed_text);

                    var circle_right = $('#project_myFight .project .project_list .project_info .info_details .right .circle .circle_right');

                    var circle_left = $('#project_myFight .project .project_list .project_info .info_details .right .circle .circle_left');

                    if ($(percentage).eq(index).text() <= 50) {

                        $(circle_right).eq(index).css('transform', 'rotate(' + ($(percentage).eq(index).text() * 3.6) + 'deg)');

                    } else {
                        $(circle_right).eq(index).css({
                            'transform': 'rotate(0deg)',
                            "background": "#d63f2b"
                        });

                        $(circle_left).eq(index).css('transform', 'rotate(' + (($(percentage).eq(index).text() - 50) * 3.6) + 'deg)');
                    }
                });
            },
            error: function(XMLHttpRequest, textStatus) {
                if (textStatus == "timeout") {
                    $("#tip").text("请求超时, 请刷新页面").css("display", "block");
                    tipMsg();
                } else {
                    $("#tip").text("加载失败").css("display", "block");
                    tipMsg();
                }
            }
        });
    }

    //参与拼单取消事件
    $("#joinFight_model .model_content .model_option .cancel").click(function() {
        $("#joinFight_model").fadeOut();

        $("#joinFight_model .model_content .subscription_box .subscription_price").val("");

        $("#joinFight_model .model_content .cost_box .cost").text("");
    });

    //参与拼单确定事件
    $("#joinFight_model .model_content .model_option .sure").click(function() {
        //获取认购金额
        var subscription = $("#joinFight_model .model_content .subscription_box .subscription_price").val();

        //获取订单id
        var id = $("#joinFight_model .model_content .id").text();

        //获取已完成金额
        var senate = $("#joinFight_model .model_content .senate_value").text();

        //获取订单总金额
        var total = $("#joinFight_model .model_content .total_value").text();

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
                success: function(data) {
                    var datas = data.datas;
                    //认证状态
                    // var real_state = datas.状态;
                    // sessionStorage.setItem("state", real_state);

                    //余额
                    var balance = datas.余额;
                    sessionStorage.setItem("balance", balance);
                },
                error: function() {
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

        } else if (parseInt(subscription) + parseInt(senate) > parseInt(total)) {
            $("#tip").text("金额不能大于拼单总金额,还可拼" + (parseInt(total) - parseInt(senate)) + "万").css("display", "block");
            tipMsg();

        } else if (isNaN(payment_price)) {
            $("#tip").text("请获取投顾费用后再提交").css("display", "block");
            tipMsg();

        } else if (Number(balance) < Number(payment_price)) {
            $("#tip").text("账户余额不足, 请前往充值").css("display", "block");
            tipMsg();

        } else {
            $("#joinFight_model").fadeOut();

            //调用参与拼单
            joinFight(id, subscription, cid);

            $("#joinFight_model .model_content .subscription_box .subscription_price").val("");

            $("#joinFight_model .model_content .cost_box .cost").text("");
        }
    });

    // 参与拼单请求
    function joinFight(id, principal, cid) {
        $.ajax({
            url: join_fight,
            type: "get",
            dataType: "json",
            data: {
                "cid": cid,
                "sid": id,
                "principal": principal
            },
            success: function(data) {
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

                setTimeout(function() {
                    window.location.href = "payment.html";
                }, 1000);
            },
            error: function() {
                $("#tip").text("拼单失败").css("display", "block");
                tipMsg();
            }
        });
    }

    //获取服务费请求
    function getFee(code, term, assets, cid) {
        $.ajax({
            url: getCost,
            type: "get",
            dataType: "json",
            data: {
                "code": code,
                "exeprice": 100, //拼单执行价默认100, 去掉%号
                "term": term,
                "principal": assets,
                "cid": cid
            },
            success: function(data) {
                var msg = data.msg;
                if (isNaN(msg)) {
                    $("#joinFight_model .model_content .cost_box .cost").text(data.msg);
                } else {
                    $("#joinFight_model .model_content .cost_box .cost").text(data.msg + "元");
                }
            },
            error: function() {
                $("#tip").text("获取投顾费用失败").css("display", "block");
                tipMsg();
            }
        });
    }

    // 我要发布
    $(".release").click(function() {
        $.ajax({
            url: userInfo,
            type: "get",
            dataType: "json",
            data: {
                "cid": cid
            },
            success: function(data) {
                var datas = data.datas;
                var nickname = datas.昵称;

                //存储用户昵称
                sessionStorage.setItem("用户昵称", nickname);

                //存储时间戳
                sessionStorage.setItem("时间戳", new Date().Format("yyyy-M-d") + " " + "14:30");

                window.location.href = "release.html";
            },
            error: function() {
                $("#tip").text("访问失败,请重试").css("display", "block");
                tipMsg();
            }
        });
    });

});