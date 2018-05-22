$(function () {
	//点击去实名
	$(".button_goma").click(function(){
		window.location.href="modify_Authentication.html"
	})
    // 审核状态
    var state = sessionStorage.getItem("state");
    if (state != "已认证") {
        $(".content").css("display", "none");
        $(".state_tip").css("display", "block")
    } else {
        $(".content").css("display", "block");
        $(".state_tip").css("display", "none")
    }

    $(".ranking .items .item").click(function () {
        //最近排行选项切换
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        index += 1;
        var term = (1 + index) * index / 2;

        ranking(term);
    });

    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }

    //登陆状态
    var cid = sessionStorage.getItem("cid");

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");
    //排行榜接口
    var rank = website + myApi.getApi("RANKING");
    //高手关注接口
    var attent = website + myApi.getApi("ATTENT");

	//高手排行页码
	var pgIndex = 1;
	//高手排行控制显示条数
	var pgSize = 20;

    ranking(1);

    // 请求排行数据
    function ranking(term) {
        $.ajax({
            url: rank,
            type: "get",
            dataType: "json",
            data: {
                "term": term,
                "cid": cid,
                "pgIndex": pgIndex,
                "pgSize": pgSize
            },
            success: function (data) {
                var datas = data.datas;
                var str = "";
                var rank_num = 1;
                var temp = $("#ranking").html();
                $(datas).each(function (index) {
                    var follow = datas[index].关注;
                    var userIcon = website + datas[index].头像;
                    var rank_change = datas[index].排名变化;
                    var newTemp = temp;

                    if (rank_change == 0) {
                        newTemp = newTemp.replace("@rank_change", "images/icon_mid.png")
                            .replace("@changeStyle", "width: 0.14rem; height: 0.02rem; position: absolute; top: 1rem; left: 0.15rem;");

                    } else {
                        newTemp = newTemp.replace("@rank_change", "images/icon_up.png")
                            .replace("@changeStyle", "width: 0.2rem; height: 0.22rem; position: absolute; top: 0.9rem; left: 0.15rem;");

                    }

                    if (userIcon == "") {
                        newTemp = newTemp.replace("@user_icon", "images/icon.png");
                    } else {
                        newTemp = newTemp.replace("@user_icon", userIcon);
                    }

                    if (follow) {
                        newTemp = newTemp.replace("@follow", "已关注");
                    } else {
                        newTemp = newTemp.replace("@follow", "关注");
                    }

                    str += newTemp.replace("@rank_id", datas[index].ID)
                        .replace("@rank_num", rank_num)
                        .replace("@user_name", datas[index].昵称)
                        .replace("@real_name", datas[index].状态)
                        .replace("@fans", datas[index].粉丝)
                        .replace("@profit", datas[index].收益率 + "%");

                    rank_num++;
                });

                $(".info_item").html(str);

                $("#tab_content .info_box .info_item .item .left .user_icon").click(function (event) {
                    //阻止冒泡事件
                    event.stopPropagation();

                    //获取当前索引
                    var index = $("#tab_content .info_box .info_item .item .left .user_icon").index(this);

                    //获取用户本人id
                    var self_id = sessionStorage.getItem("my_id");

                    //获取用户id
                    var userId = $("#tab_content .info_box .info_item .item .rank_id").eq(index).text();

                    sessionStorage.setItem("index_id", userId);

                    if (self_id == userId) {
                        window.location.href = "mydata.html";
                    } else {
                        window.location.href = "youdata.html";
                    }
                });

                //跳转详情页
                $("#tab_content .info_box .info_item .item").click(function () {
                    window.location.href = "master_details.html";

                    //设置本地存储数据
                    //获取当前索引
                    var index = $(this).index();

                    //存储用户ID
                    var userId = $("#tab_content .info_box .info_item .item .rank_id").eq(index).text();
                    sessionStorage.setItem("用户ID", userId);

                    //存储用户头像
                    var userIcon = $("#tab_content .info_box .info_item .item .user_icon").eq(index).attr("src");
                    sessionStorage.setItem("用户头像", userIcon);

                    //存储关注状态
                    var follow_state = $("#tab_content .info_box .info_item .item .right .follow").eq(index).text();
                    sessionStorage.setItem("关注状态", follow_state);
                });

                //添加关注
                $("#tab_content .info_box .info_item .item .right").click(function (event) {
                    //阻止冒泡事件
                    event.stopPropagation();

                    var index = $("#tab_content .info_box .info_item .item .right").index(this);

                    var userId = $("#tab_content .info_box .info_item .item .rank_id").eq(index).text();

                    var add_follow = $(".right .follow").eq(index).text();

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
                                    $(".right .follow").eq(index).text("已关注");

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
    }
});