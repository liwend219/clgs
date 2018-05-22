$(function () {

    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //获取登陆状态
    var cid = sessionStorage.getItem("cid");

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");
    //发布拼单接口
    var release = website + myApi.getApi("RELEASE");
    //补全股票名称接口
    var symbolName = website + myApi.getApi("GETSYMBOLNAME");

    //获取与设置用户昵称
    var nickname = sessionStorage.getItem("用户昵称");
    $("#release_box .release_content .initiator_box .initiator_name").text(nickname);

    //获取与设置发布时间戳
    var time_stamp = sessionStorage.getItem("时间戳");
    $("#release_box .release_content .term_box .term_time").text(time_stamp);

    //防止快速多次点击标识
    var flag = false;
    //延时器变量
    var timer = null;

    //发布
    $(".release_btn").click(function () {
        //股票代码
        var project_code = $("#release_box .release_content .project_box .shares_box .project_code").val();

        //股票名称
        var project_name = $("#release_box .release_content .project_box .shares_box .project_name").text();

        //股票期限
        var project_term = $("#release_box .purchase_box .term_box .term_lists option:checked").text();
        project_term = project_term.replace(/月/g, "");

        //拼单总金额
        var fight_total = $("#release_box .release_content .fight_box .fight_money").val();

        //认购金额
        var project_assets = $("#release_box .purchase_box .subscription_box .subscription_money").val();

        //发布策略内容
        var strategy = $("#strategy .strategy_text").val();

        flag = true;
        timer = setTimeout(function () {
            if (flag) {
                //重置标识
                flag = false;

                if (project_code == "") {
                    $("#tip").text("股票代码不能为空").css("display", "block");
                    tipMsg();

                } else if (fight_total == "") {
                    $("#tip").text("拼单金额不能为空").css("display", "block");
                    tipMsg();

                } else if (fight_total.indexOf(0) == 0) {
                    $("#tip").text("拼单金额不能0开头").css("display", "block");
                    tipMsg();

                } else if (fight_total < 100) {
                    $("#tip").text("拼单金额必须大于100万").css("display", "block");
                    tipMsg();

                } else if (fight_total % 10 != 0) {
                    $("#tip").text("拼单金额必须是10万的整数倍").css("display", "block");
                    tipMsg();

                } else if (project_assets == "") {
                    $("#tip").text("认购金额不能为空").css("display", "block");
                    tipMsg();

                } else if (project_assets.indexOf(0) == 0) {
                    $("#tip").text("认购金额不能0开头").css("display", "block");
                    tipMsg();

                } else if (project_assets < 10) {
                    $("#tip").text("认购金额不能低于10万").css("display", "block");
                    tipMsg();

                } else if (project_assets % 10 != 0) {
                    $("#tip").text("认购金额必须是10万的整数倍").css("display", "block");
                    tipMsg();

                } else if (parseInt(project_assets) > parseInt(fight_total)) {
                    $("#tip").text("认购金额不能大于拼单金额").css("display", "block");
                    tipMsg();

                } else if (strategy == "") {
                    $("#tip").text("策略内容不能为空").css("display", "block");
                    tipMsg();

                } else {
                    $.ajax({
                        url: release,
                        type: "post",
                        dataType: "json",
                        data: {
                            "cid": cid,
                            "code": project_code,
                            "symbol": project_name,
                            "term": project_term,
                            "myprincipal": project_assets,
                            "profile": strategy
                        },
                        success: function (data) {
                            if (data.rs == true) {
                                setTimeout(function () {
                                    window.location.href = "fight.html";
                                }, 1000);

                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();
                            } else {
                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();
                            }
                        }
                    });
                }
            } else {
                clearTimeout(timer);
            }
        }, 300);
    });

    //股票代码补全股票名称
    $("#release_box .release_content .project_box .shares_box .project_code").on("input", function () {
        var stock_code = $(".project_code").val();
        if (stock_code.length == 6) {
            if (stock_code.indexOf(6) == 0) {
                stock_code = "sh" + stock_code;
            } else {
                stock_code = "sz" + stock_code;
            }

            $.ajax({
                url: symbolName,
                type: "get",
                dataType: "json",
                data: {
                    "code": stock_code
                },
                success: function (data) {
                    $(".project_name").text(data.n);
                },
                error: function () {
                    $("#tip").text("股票代码不正确").css("display", "block");
                    tipMsg();
                }
            });
        } else {
            $(".project_name").text("");
        }
    });
});