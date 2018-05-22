 $(function () {
    //一级tab菜单切换
    $(".items_box .item .list").click(function () {
        //选中样式
        var selected_style = "active";
        //要显示的部分
        var show = $(".list_content .part");
        //选中索引
        var index = $(this).index();
        //选中标签id
        var id = $(this).attr("id");
        //tab切换
        changeTab(this, selected_style, index, show);
        //存储选中标签id
        sessionStorage.setItem("supId", id);
        //移除个人中心询价记录跳转会话存储
        sessionStorage.removeItem("xunjia");
        //移除首页最新动态跳转会话存储
        sessionStorage.removeItem("index_jump");
        //刷新页面
        window.location.reload();
        //新添加
    });

    //二级tab菜单切换
    $(".item_submenu .list_submenu .entry_submenu").click(function () {
        //选中样式
        var selected_style = "current";
        //要显示的部分
        var show = $(".tab_content .tab");
        //选中索引
        var index = $(this).index();
        //选中标签id
        var id = $(this).attr("id");
        //tab切换
        changeTab(this, selected_style, index, show);
        //存储选中标签id
        sessionStorage.setItem("subId", id);
        //移除个人中心询价记录跳转会话存储
        sessionStorage.removeItem("xunjia");
        //移除首页最新动态跳转会话存储
        sessionStorage.removeItem("index_jump");
    });

    //询价记录页码
    var pgindex_inquiry = 1;

    //成交页码
    var pgindex_deal = 1;

    //结算页码
    var pgindex_settlement = 1;

    //控制显示条数
    var pgsize = 10;

    //一级菜单id
    var supId = sessionStorage.getItem("supId");
    //二级菜单id
    var subId = sessionStorage.getItem("subId");

    if (supId == null || supId == "enquiry") {
        //选中索引
        var sup_index = 0;
        //选中tab
        var sup_label = $(".items_box .item .list").eq(sup_index);
        //要显示的部分
        var sup_show = $(".list_content .part");
        //选中样式
        var sup_style = "active";
        // tab切换
        changeTab(sup_label, sup_style, sup_index, sup_show);

    } else if (supId == "deal_record") {
        sup_index = 1;
        sup_label = $(".items_box .item .list").eq(sup_index);
        sup_show = $(".list_content .part");
        sup_style = "active";
        changeTab(sup_label, sup_style, sup_index, sup_show);

    } else if (supId == "settlement_record") {
        sup_index = 2;
        sup_label = $(".items_box .item .list").eq(sup_index);
        sup_show = $(".list_content .part");
        sup_style = "active";
        changeTab(sup_label, sup_style, sup_index, sup_show);

    }

    if (subId == null || subId == "inquiry_project") {
        //选中索引
        var sub_index = 0;
        //选中tab
        var sub_label = $(".item_submenu .list_submenu .entry_submenu").eq(sub_index);
        //要显示的部分
        var sub_show = $(".tab_content .tab");
        //选中样式
        var sub_style = "current";
        // tab切换
        changeTab(sub_label, sub_style, sub_index, sub_show);

    } else if (subId == "inquiry_record") {
        sub_index = 1;
        sub_label = $(".item_submenu .list_submenu .entry_submenu").eq(sub_index);
        sub_show = $(".tab_content .tab");
        sub_style = "current";
        changeTab(sub_label, sub_style, sub_index, sub_show);

    }

    //tab切换函数
    function changeTab(ele, style, index, show) {
        $(ele).addClass(style).siblings().removeClass(style);
        $(show).eq(index).show().siblings().hide();
    }

    //个人中心询价记录跳转tab选中询价记录
    // 获取跳转会话存储
    var inquiryRecord_jump = sessionStorage.getItem("xunjia");
    //选中索引
    var checked_index = 1;
    //选中tab
    var checked_label = $(".item_submenu .list_submenu .entry_submenu").eq(checked_index);
    //要显示的部分
    var checked_show = $(".tab_content .tab");
    //选中样式
    var checked_style = "current";

    //重置一级菜单选中状态
    //选中索引
    var first_index = 0;
    //选中tab
    var first_label = $(".items_box .item .list").eq(first_index);
    //要显示的部分
    var first_show = $(".list_content .part");
    //选中样式
    var first_style = "active";

    if (inquiryRecord_jump == "询价记录") {
        //移除滚动高度
        sessionStorage.removeItem("adviser_offsetTop");
        //移除首页最新动态跳转会话存储
        sessionStorage.removeItem("index_jump");
        changeTab(first_label, first_style, first_index, first_show);
        changeTab(checked_label, checked_style, checked_index, checked_show);
    }

    //高手详情跳转
    var masterDetail_jump = sessionStorage.getItem("masterDetail_jump");

    //选中索引
    var master_index = 0;
    //选中tab
    var master_label = $(".item_submenu .list_submenu .entry_submenu").eq(master_index);
    //要显示的部分
    var master_show = $(".tab_content .tab");
    //选中样式
    var master_style = "current";

    if (masterDetail_jump == "高手详情") {
        //移除个人中心询价记录跳转会话存储
        sessionStorage.removeItem("xunjia");
        //移除二级菜单选中状态
        sessionStorage.removeItem("subId");
        //移除滚动高度
        sessionStorage.removeItem("adviser_offsetTop");
        changeTab(first_label, first_style, first_index, first_show);
        changeTab(master_label, master_style, master_index, master_show);

    }

    //首页/搜索跳转
    var index_jump = sessionStorage.getItem("index_jump");

    if (index_jump == "首页搜索" || index_jump == "首页动态") {
        //移除个人中心询价记录跳转会话存储
        sessionStorage.removeItem("xunjia");
        //移除二级菜单选中状态
        sessionStorage.removeItem("subId");
        //移除滚动高度
        sessionStorage.removeItem("adviser_offsetTop");
        changeTab(first_label, first_style, first_index, first_show);
        changeTab(master_label, master_style, master_index, master_show);
    }

    //信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    // 滚动加载数据
    $(window).scroll(function () {
        // 询价记录选中
        var currentInquiry = $("#inquiry_record").hasClass("current");

        // 成交记录选中
        var activeDeal = $("#deal_record").hasClass("active");

        // 结算记录选中
        var activeSettlement = $("#settlement_record").hasClass("active");

        //滚动高度
        var scrollTop = $(window).scrollTop();
        if (scrollTop != 0) {
            //存储滚动条高度
            sessionStorage.setItem("adviser_offsetTop", $(window).scrollTop());
        }

        //需滚动部分高度
        var docHeight = $(document).height();

        //可视区域高度
        var winHeight = $(window).height();

        if (winHeight + scrollTop >= docHeight) {
            if (activeDeal) {
                // 成交
                deal(pgsize);
                //设置数据条数
                var deal_length = $(".part_two .deal_box .content_lists").length + 10;
                sessionStorage.setItem("数据条数", deal_length);

            } else if (activeSettlement) {
                // 结算
                settlement(pgsize);
                //设置数据条数
                var settlement_length = $(".part_three .settlement_box .content_lists").length + 10;
                sessionStorage.setItem("数据条数", settlement_length);

            } else if (currentInquiry) {
                // 询价
                inquiry_record(pgsize);
                //设置数据条数
                var inquiryRecord_length = $(".part_one .tab_content .tab_right .content_lists").length + 10;
                sessionStorage.setItem("数据条数", inquiryRecord_length);

            }
        }
    });

    $(function () {
        //获取滚动条存储的高度
        var _offset = sessionStorage.getItem("adviser_offsetTop");

        // 一级菜单保存页面状态
        if (supId == null || supId == "enquiry" || supId == "settlement_record") {
            deal(pgsize);
            var deal_num = pgsize;
            sessionStorage.setItem("数据条数", deal_num);

        } else if (supId == "deal_record") {
            deal_num = sessionStorage.getItem("数据条数");
            deal(deal_num);
            $('body,html').animate({scrollTop: _offset});

        }

        if (supId == null || supId == "enquiry" || supId == "deal_record") {
            settlement(pgsize);
            var settlement_num = pgsize;
            sessionStorage.setItem("数据条数", settlement_num);

        } else if (supId == "settlement_record") {
            settlement_num = sessionStorage.getItem("数据条数");
            settlement(settlement_num);
            $('body,html').animate({scrollTop: _offset});
        }

        // 二级菜单保存页面状态
        if (subId == null || subId == "inquiry_project") {
            inquiry_record(pgsize);
            var inquiryRecord_num = pgsize;
            sessionStorage.setItem("数据条数", inquiryRecord_num);

        } else if (subId == "inquiry_record") {
            inquiryRecord_num = sessionStorage.getItem("数据条数");
            inquiry_record(inquiryRecord_num);
            $('body,html').animate({scrollTop: _offset});

        }
    });

    //登陆状态
    var cid = sessionStorage.getItem("cid");

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");

    //获取服务费接口
    var getFee = website + myApi.getApi("GETFEE");
    //询价接口
    var askPrice = website + myApi.getApi("ASKPRICE");
    //询价记录接口
    var askPrice_record = website + myApi.getApi("ASKPRICE_RECORD");
    //询价记录提交接口
    var askSubmit_record = website + myApi.getApi("ASKSUBMIT_RECORD");
    //成交接口
    var deal_record = website + myApi.getApi("DEAL");
    //结算接口
    var settlement_record = website + myApi.getApi("SETTLEMENT");
    //补全股票名称接口
    var completion_name = website + myApi.getApi("GETSYMBOLNAME");
    //用户信息接口
    var userinfo = website + myApi.getApi("USERINFO");

    // 询价
    //获取与设置高手详情与首页页面跳转的股票代码和名称
    // 股票代码
    var code = sessionStorage.getItem("stock_code");
    $(".tab_content .tab_left .stock_code .code_text").val(code);

    // 股票名称
    var name = sessionStorage.getItem("stock_name");
    $(".tab_content .tab_left .stock_name .name_text").val(name);


    //投顾资产
    var num = sessionStorage.getItem("stock_num");
    $(".tab_content .tab_left .stock_assets .assets_text").val(num);

    //防止快速多次点击标识
    var flag = false;
    //延时器变量
    var timer = null;
    //如果执行方式为t+1
    $(".term_lists").on("change",function(){
    	 var result = $(".term_lists").val();
//  	 console.log(result)
            if(result == "5d"){
            	$(".implement_lists").text("T+1");
            }
            if(result == "10d"){
            	$(".implement_lists").text("T+2");
            }
             if(result == "1m"||result == "2m"||result == "3m"){
            	$(".implement_lists").text("T+5");
            }
    })
    //点击询价
    $(".inquiry_btn").click(function () {

        // 股票代码
        var stock_code = $(".tab_content .tab_left .stock_code .code_text").val();

        // 股票名称
        var stock_name = $(".tab_content .tab_left .stock_name .name_text").val();

        // 股票执行方式
        var stock_implement = $(".tab_content .tab_left .stock_implement .implement_lists ").text();
//      console.log(stock_implement)
        
        // 股票执行价格
        var stock_price = $(".tab_content .tab_left .stock_price .price_lists option:checked").text();
        stock_price = stock_price.replace(/%/g, "");

        // 股票期限
        var stock_term = $(".tab_content .tab_left .stock_term .term_lists option:checked").val();
//       console.log(stock_term)

        // 投顾资产
        var stock_assets = $(".tab_content .tab_left .stock_assets .assets_text").val();

        flag = true;

        timer = setTimeout(function () {
            if (flag) {
                //重置标识
                flag = false;

                if (stock_assets >= 100 && stock_assets % 10 == 0) {
                    $.ajax({
                        type: "get",
                        url: userinfo,
                        data: {
                            "cid": cid
                        },
                        dataType: "json",
                        success: function (data) {
                            var datas = data.datas;
                            var realName_state = datas.状态;
                            sessionStorage.setItem("state", realName_state);
                        },
                        error: function () {
                            $("#tip").text("获取状态失败, 请重试").css("display", "block");
                            tipMsg();
                        }
                    });
                }

                //获取实名状态
                var realName_state = sessionStorage.getItem("state");

                if (stock_code == "") {
                    $("#tip").text("股票代码不能为空").css("display", "block");
                    tipMsg();

                } else if (stock_code.length < 6) {
                    $("#tip").text("请输入正确的股票代码").css("display", "block");
                    tipMsg();

                } else if (stock_name == "") {
                    $("#tip").text("请输入正确的股票代码").css("display", "block");
                    tipMsg();

                } else if (stock_assets == "") {
                    $("#tip").text("投顾资产不能为空").css("display", "block");
                    tipMsg();

                } else if (stock_assets.indexOf(0) == 0) {
                    $("#tip").text("投顾资产不能0开头").css("display", "block");
                    tipMsg();

                } else if (stock_assets < 30) {
                    $("#tip").text("投顾资产不能低于30万").css("display", "block");
                    tipMsg();

                } else if (stock_assets % 10 != 0) {
                    $("#tip").text("投顾资产必须是10万的整数倍").css("display", "block");
                    tipMsg();

                } else if (realName_state != "已认证" && stock_assets >= 100) {
                    $("#realName_model").fadeIn();

                } else {
                    $.ajax({
                        url: getFee,
                        type: "get",
                        timeout: 5000,
                        dataType: "json",
                        data: {
                            "code": stock_code,
                            "exeprice": stock_price,
                            "term": stock_term,
                            "principal": stock_assets,
                            "cid": cid
                        },
                        success: function (data) {
                            $("#inquiry_model").fadeIn();

                            //询价模态框股票代码
                            $("#inquiry_model .model_content .code_box .code_name").text(stock_code + " " + stock_name);

                            //询价模态框股票执行方式
                            $("#inquiry_model .model_content .implement_box .category").text(stock_implement);

                            //询价模态框股票执行价格
                            $("#inquiry_model .model_content .price_box .price").text(stock_price + "%");

                            //询价模态框股票期限
                            if(stock_term == "5d"){
                            	 $("#inquiry_model .model_content .term_box .term").text("1周");
                            }
                            if(stock_term == "10d"){
                            	 $("#inquiry_model .model_content .term_box .term").text("2周");
                            }
                            if(stock_term == "1m"){
                            	 $("#inquiry_model .model_content .term_box .term").text("1月");
                            }
                            if(stock_term == "2m"){
                            	 $("#inquiry_model .model_content .term_box .term").text("2月");
                            }
                            if(stock_term == "3m"){
                            	 $("#inquiry_model .model_content .term_box .term").text("3月");
                            }
//                          $("#inquiry_model .model_content .term_box .term").text(stock_term);
//                             console.log(stock_term)
                            //询价模态框投顾资产
                            $("#inquiry_model .model_content .assets_box .assets").text(stock_assets + "万");

                            //询价模态框投顾费用(服务费)
                            var msg = data.msg;
                            if (isNaN(msg)) {
                                $("#inquiry_model .model_content .cost_box .cost").text(data.msg);
                                $("#inquiry_model .model_content .cost_box .cost_text").css("display", "none");
                                $("#inquiry_model .model_content .cost_box .cost").css({
                                	"width": "100%",
                                	"text-align": "center"
                                });
                            } else {
                                $("#inquiry_model .model_content .cost_box .cost").text(data.msg + "元");
                                $("#inquiry_model .model_content .cost_box .cost_text").css("display", "block");
                                $("#inquiry_model .model_content .cost_box .cost").css({
                                	"width": "50%",
                                	"text-align": "left"
                                });
                            }
                        },
                        error: function (XMLHttpRequest, status) {
                            if (status == "timeout") {
                                $("#tip").text("请求超时, 请重试").css("display", "block");
                                tipMsg();
                            } else {
                                $("#tip").text("询价失败, 请重试").css("display", "block");
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

    //询价模态框事件
    // 取消事件
    $("#inquiry_model .model_content .model_option .cancel").click(function () {
        $("#inquiry_model").fadeOut();
    });


    //确定事件
    $("#inquiry_model .model_content .model_option .sure").click(function () {

        // 股票代码
        var stock_code = $(".tab_content .tab_left .stock_code .code_text").val();

        // 股票名称
        var stock_name = $(".tab_content .tab_left .stock_name .name_text").val();

        //股票执行方式
        var stock_implement = $("#inquiry_model .model_content .implement_box .category").text();

        //股票执行价格
        var stock_price = $("#inquiry_model .model_content .price_box .price").text();
        stock_price = stock_price.replace(/%/g, "");

        //股票期限
        var stock_term = $(".tab_content .tab_left .stock_term .term_lists option:checked").val();
//      console.log(stock_term)
        //投顾资产
        var stock_assets = $("#inquiry_model .model_content .assets_box .assets").text();

        flag = true;
        timer = setTimeout(function () {

            if (flag) {
                //重置标识
                flag = false;
 
                    $.ajax({
                        url: askPrice,
                        type: "post",
                        dataType: "json",
                        data: {
                            "code": stock_code,
                            "symbol": stock_name,
                            "exemode": stock_implement,
                            "exeprice": stock_price,
                            "term": stock_term,
                            "principal": stock_assets,
                            "cid": cid
                        },
                        success: function (data) {
                            if (data.rs) {
                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();

                                $("#inquiry_model").fadeOut();

                                // 刷新页面
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);

                                //清除首页/高手跳转股票代码和名称会话存储
                                sessionStorage.removeItem("stock_code");
                                sessionStorage.removeItem("stock_name");
                            } else {
                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();
                            }
                        },
                        error: function () {
                            $("#tip").text("报价失败").css("display", "block");
                            tipMsg();
                        }
                    });
            } else {
                clearTimeout(timer);
            }
        }, 300);

    });

    // 实名认证模态框
    // 取消事件
    $("#realName_model .model_content .model_option .cancel").click(function () {
        $("#realName_model").fadeOut();

    });

    //确定事件
    $("#realName_model .model_content .model_option .sure").click(function () {
        $("#realName_model").fadeOut();
        window.location.href = "modify_Authentication.html";
    });

    //协议跳转
    $(".agreement .text a").click(function () {
        window.location.href = "agreement.html";
        //跳转标识
        sessionStorage.setItem("跳转标识", "adviser_agreement");
    });

    //判断协议是否被选中
    $(".info_submit .agreement .checkbox").change(function () {
        if ($("input[type='checkbox']").is(':checked')) {
            $(".info_submit .agreement .checkbox").attr("checked", "checked");
            $(".info_submit .inquiry_btn").removeAttr("disabled").css({
                "opacity": 1,
                "cursor": "pointer"
            });
        } else {
            $(".info_submit .agreement .checkbox").removeAttr("checked");
            $(".info_submit .inquiry_btn").attr("disabled", "disabled").css({
                "opacity": 0.5,
                "cursor": "Default"
            });
            $("#tip").text("请勾选协议").css("display", "block");
            tipMsg();
        }
    });

    // 询价记录
    function inquiry_record(num) {
        $.ajax({
            url: askPrice_record,
            type: "get",
            timeout: 10000,
            dataType: "json",
            data: {
                "pgindex": pgindex_inquiry,
                "pgsize": num,
                "cid": cid
            },
            beforeSend: function () {
                $(".bottom_tip").css({
                    "display": "block",
                    "position": "fixed",
                    "bottom": "0.9rem"
                });
            },
            success: function (data) {
                var datas = data.datas;
                var str = "";
                var temp = $("#inquiry").html();

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

                $(datas).each(function (index) {
                    //股票状态
                    var state = datas[index].状态;

                    //投顾费用(服务费)
                    var cost = datas[index].费用;

                    //备注信息
                    var remark = datas[index].备注;

                    // 存储股票状态标签
                    var labelImg = "";
                    var record = temp;

                    if (cost == "" || cost == "null") {
                        if (remark == "" || remark == null) {
                            record = record.replace("@cost", "");
                        } else {
                            record = record.replace("@cost", datas[index].备注);
                        }
                    } else {
                        record = record.replace("@cost", datas[index].费用 + "元");
                    }

                    if (state == "回复") {
                        labelImg = "images/label_quotedPrice.png";
                        record = record.replace("@display", "display:inline-block");

                    } else if (state == "过期") {
                        labelImg = "images/label_expired.png";
                        record = record.replace("@display", "display:none");

                    } else if (state == "询价") {
                        labelImg = "images/label_pendingQuotation.png";
                        record = record.replace("@display", "display:none");

                    } else if (state == "错误") {
                        labelImg = "images/label_refuse.png";
                        record = record.replace("@display", "display:none");

                    } 
//                  else if (state == "已拒绝") {
//                  	labelImg = "images/label_refuse.png";
//                      record = record.replace("@display", "display:none");
//                  }

                    str += record.replace("@asKid", datas[index].ID)
                        .replace("@code", datas[index].代码)
                        .replace("@name", datas[index].股票)
                        .replace("@srcImg", labelImg)
                        .replace("@time", datas[index].询价时间)
                        .replace("@category", datas[index].执行方式)
                        .replace("@price", datas[index].执行价格 + "%")
                        .replace("@term", datas[index].期限)
                        .replace("@assets", datas[index].本金);
                });

                $(".tab_right").append(str);
                pgindex_inquiry++;

                //询价记录提交
                $(".tab_right .content_lists .btn").click(function () {

                    flag = true;
                    timer = setTimeout(function () {
                        if (flag) {
                            //重置标识
                            flag = false;

                            $.ajax({
                                type: "get",
                                url: userinfo,
                                data: {
                                    "cid": cid
                                },
                                dataType: "json",
                                success: function (data) {
                                    var datas = data.datas;
                                    //认证状态
                                    var real_state = datas.状态;
                                    sessionStorage.setItem("state", real_state);

                                    //余额
                                    var balance = datas.余额;
                                    sessionStorage.setItem("balance", balance);
                                },
                                error: function () {
                                    $("#tip").text("服务器错误").css("display", "block");
                                    tipMsg();
                                }
                            });
                        } else {
                            clearTimeout(timer);
                        }
                    }, 300);

                    // 获取实名状态
                    var real_state = sessionStorage.getItem("state");

                    if (real_state != "已认证") {
                        $("#tip").text("未实名认证, 不能进行提交").css("display", "block");
                        tipMsg();

                    } else {
                        $("#inquiryRecord_model").fadeIn();

                        //获取当前点击索引
                        var index = $(".tab_right .content_lists .btn").index(this);

                        //股票代码和名称
                        var title = $(".tab_right .content_lists .title_box .title").eq(index).text();
                        //存储在询价记录模态框的股票代码和名称
                        $("#inquiryRecord_model .model_content .temporary_title").text(title);

                        // 投顾费用(服务费)
                        var cost = $(".tab_right .content_lists .cost_box .cost").eq(index).text();
                        //存储在询价记录模态框的投顾费用(服务费)
                        $("#inquiryRecord_model .model_content .temporary_cost").text(cost);

                        //股票id
                        var askid = $(".tab_right .content_lists .asKid").eq(index).text();
                        //存储在询价记录模态框的股票id
                        $("#inquiryRecord_model .model_content .temporary_askid").text(askid);

                        //投顾资产
                        var principal = $(".tab_right .content_lists .assets_box .assets").eq(index).text();
                        //截取掉 万 字符
                        principal = principal.replace(/万/g, "");
                        //存储在询价记录模态框的投顾资产
                        $("#inquiryRecord_model .model_content .temporary_principal").text(principal);

                        $("#inquiryRecord_model .model_content .title").text("请确认您的【" + title + "】投顾订单,投顾费用为" + cost);
                    }
                });
            },
            error: function (XMLHttpRequest, textStatus) {
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

    //询价记录模态框事件
    // 取消事件
    $("#inquiryRecord_model .model_content .model_option .cancel").click(function () {
        $("#inquiryRecord_model").fadeOut();
    });

    //确定事件
    $("#inquiryRecord_model .model_content .model_option .sure").click(function () {
        //获取用户账户余额
        var balance = sessionStorage.getItem("balance");

        //股票id
        var askid = $("#inquiryRecord_model .model_content .temporary_askid").text();

        //投顾资产
        var principal = $("#inquiryRecord_model .model_content .temporary_principal").text();

        //股票名称和代码
        var title = $("#inquiryRecord_model .model_content .temporary_title").text();

        //投顾费用(服务费)
        var cost = $("#inquiryRecord_model .model_content .temporary_cost").text();
        //截取掉单位 元
        cost = cost.replace(/元/g, "");

        flag = true;
        timer = setTimeout(function () {
            if (flag) {
                //重置标识
                flag = false;

                if (Number(balance) < Number(cost)) {
                    $("#tip").text("账户余额不足, 请前往充值").css("display", "block");
                    tipMsg();

                } else {
                    $.ajax({
                        url: askSubmit_record,
                        type: "post",
                        dataType: "json",
                        data: {
                            "askid": askid,
                            "principal": principal,
                            "cid": cid
                        },
                        success: function (data) {
                        	if (data.rs) {
	                        	$("#inquiryRecord_model").fadeOut();
	
	                            //存储股票名称和代码
	                            sessionStorage.setItem("order_name", title);
	
	                            //存储投顾费用(服务费)
	                            sessionStorage.setItem("payment_price", cost);
	
	                            //获取询价记录下单时间
	                            sessionStorage.setItem("payment_time", new Date().Format("yyyy-M-d hh:mm:ss"));
	
	                            //跳转标识
	                            sessionStorage.setItem("跳转标识", "adviser_payment");
	
	                            $("#tip").text(data.msg).css("display", "block");
	                            tipMsg();
	
	                            //跳转支付结果页面
	                            setTimeout(function () {
	                                window.location.href = "payment.html";
	                            }, 1000);
                        	} else {
                        		$("#tip").text(data.msg).css("display", "block");
                            tipMsg();
                        	}
                        },
                        error: function () {
                            $("#tip").text("支付失败").css("display", "block");
                            tipMsg();
                        }
                    });
                }
            } else {
                clearTimeout(timer);
            }
        }, 300);
    });

    //成交
    function deal(num) {
        $.ajax({
            url: deal_record,
            type: "get",
            timeout: 10000,
            dataType: "json",
            data: {
                "cid": cid,
                "pgIndex": pgindex_deal,
                "pgSize": num
            },
            beforeSend: function () {
                $(".bottom_tip").css({
                    "display": "block",
                    "position": "fixed",
                    "bottom": "0.9rem"
                });
            },
            success: function (data) {
                var datas = data.datas;
                var str = "";
                var temp = $("#deal").html();

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

                $(datas).each(function (index) {

                    id = datas[index].ID;
                    str += temp.replace("@id", datas[index].ID)
                        .replace("@oid", datas[index].ID)
                        .replace("@code", datas[index].代码)
                        .replace("@name", datas[index].股票)
                        .replace("@state", datas[index].状态)
                        .replace("@assets", datas[index].投顾资产)
                        .replace("@available", datas[index].可用资产 + "万")
                        .replace("@init_price", datas[index].价格)
                        .replace("@expire_time", datas[index].到期时间);

                    //浮动盈亏和当前价
                    // floatProfit(id);
                });

                $(".deal_box").append(str);
                pgindex_deal++;

                // 查看详情
                $(".part_two .deal_box .content_lists .more").click(function () {

                    var index = $(".part_two .deal_box .content_lists .more").index(this);

                    // 设置详情页需求的数据
                    //股票id
                    var id = $(".part_two .deal_box .content_lists .oid").eq(index).text();
                    localStorage.setItem("id", id);

                    //股票代码和名称
                    var stock_info = $(".part_two .deal_box .content_lists .title_box .title").eq(index).text();
                    localStorage.setItem("stock_info", stock_info);

                    //股票初始价
                    var init_price = $(".part_two .deal_box .content_lists .init_box .init_price").eq(index).text();
                    localStorage.setItem("init_price", init_price);

                    //股票投顾资产
                    var investment_assets = $(".part_two .deal_box .content_lists .investment_box .investment_assets").eq(index).text();
                    localStorage.setItem("investment_assets", investment_assets);

                    //股票可用资产
                    var available_assets = $(".part_two .deal_box .content_lists .available_box .available_assets").eq(index).text();
                    localStorage.setItem("available_assets", available_assets);

                    //股票到期时间
                    var expire_time = $(".part_two .deal_box .content_lists .expire_box .expire_time").eq(index).text();
                    localStorage.setItem("expire_time", expire_time);

                    //股票执行方式
                    var category = datas[index].执行方式;
                    localStorage.setItem("category", category);

                    //股票执行价
                    var price = datas[index].执行价;
                    localStorage.setItem("price", price);

                    //股票期限
                    var term = datas[index].期限;
                    localStorage.setItem("term", term);

                    //股票服务费
                    var cost = datas[index].费用;
                    localStorage.setItem("cost", cost);

                    //股票开始时间
                    var begin_time = datas[index].开始时间;
                    localStorage.setItem("begin_time", begin_time);

                    //股票状态
                    var shares_state = $(".part_two .deal_box .content_lists .title_box .state").eq(index).text();
                    localStorage.setItem("shares_state", shares_state);

                    //跳转详情页
                    window.location.href = "product_details.html";
                });
            },
            error: function (XMLHttpRequest, textStatus) {
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

    // 获取浮动盈亏和当前价
    // function floatProfit(id) {
    //     $.ajax({
    //         url: "www.i7quan.com/app/FloatProfit",
    //         type: "get",
    //         dataType: "json",
    //         data: {
    //             "idarr": id
    //         },
    //         success: function (data) {
    //             var oid = $(".part_two .deal_box .content_lists .oid").index($("#" + data[0].id));
    //             //当前价
    //             $(".part_two .deal_box .content_lists .current_box .current_price").eq(oid).text(data[0].newpric);
    //
    //             //浮动盈亏
    //             $(".part_two .deal_box .content_lists .position_box .situation").eq(oid).text(data[0].profit);
    //         },
    //         error: function (XMLHttpRequest) {
    //
    //         }
    //     });
    //     //间隔刷新浮动盈亏和当前价数据
    //     setTimeout(floatProfit, 5000, id);
    // }

    // 结算
    function settlement(num) {
        $.ajax({
            url: settlement_record,
            type: "get",
            timeout: 10000,
            dataType: "json",
            data: {
                "cid": cid,
                "pgIndex": pgindex_settlement,
                "pgSize": num
            },
            beforeSend: function () {
                $(".bottom_tip").css({
                    "display": "block",
                    "position": "fixed",
                    "bottom": "0.9rem"
                });
            },
            success: function (data) {
                var datas = data.datas;
                var str = "";
                var temp = $("#settlement").html();

                $(".bottom_tip").css("display", "none");
                if (datas == "") {
                    $(".bottom_tip").html("我也是有底线的").css({
                        "display": "block",
                        "background": "#e6e6e7",
                        "position": "absolute",
                        "bottom": "-0.75rem"
                    });

                }

                $(datas).each(function (index) {
                    var newTemp = temp;
                    //持仓状态
                    var state = datas[index].状态;
                    console.log(state)
                    //结算价
                    var settlement_price = datas[index].结束价格;
                    // 结算盈亏
                    var settlement_profit = datas[index].盈亏;
                    var labelImg = "";
                    if (state == "已平仓") {
                        labelImg = "images/label_closed.png";

                    } else if (state == "申请平仓") {
                        labelImg = "images/label_closeing.png";

                    }
                    else if (state == "撤单") {
                        labelImg = "images/label_cancelOrder.png";

                    }
                    if (settlement_price == 0 || settlement_price == "null") {
                        newTemp = newTemp.replace("@settlement_price", "");

                    } else {
                        newTemp = newTemp.replace("@settlement_price", datas[index].结束价格);

                    }

                    if (settlement_profit == 0 || settlement_profit == "null") {
                        newTemp = newTemp.replace("@state_price", 0);

                    } else {
                        newTemp = newTemp.replace("@state_price", datas[index].盈亏 + "元");

                    }

                    str += newTemp.replace("@code", datas[index].代码)
                        .replace("@name", datas[index].股票)
                        .replace("@labelImg", labelImg)
                        .replace("@assets", datas[index].投顾资产)
                        .replace("@init_price", datas[index].价格)
                        .replace("@start_time", datas[index].时间)
                        .replace("@end_time", datas[index].结算时间);
                });

                $(".settlement_content").append(str);
                pgindex_settlement++;
            },
            error: function (XMLHttpRequest, textStatus) {
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

    //股票代码补全股票名称
    $(".tab_content .tab_left .stock_code .code_text").on("input", function () {
        //股票代码
        var stock_code = $(".code_text").val();
        if (stock_code.length == 6) {
            if (stock_code.indexOf(6) == 0) {
                stock_code = "sh" + stock_code;
            } else {
                stock_code = "sz" + stock_code;
            }

            $.ajax({
                url: completion_name,
                type: "get",
                dataType: "json",
                data: {
                    "code": stock_code
                },
                success: function (data) {
                    $(".name_text").val(data.n);
                },
                error: function () {
                    $("#tip").text("股票代码不正确").css("display", "block");
                    tipMsg();
                }
            });
        } else {
            $(".name_text").val("");
        }
    });
});