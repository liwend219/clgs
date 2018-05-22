$(function () {

    var cid = sessionStorage.getItem("cid");
    var userid = sessionStorage.getItem("index_id");
    var flag = true;
    var index = 1;
    var size = 5;
    down();

    function down() {
        $.ajax({
            type: "POST",
            url: "http://www.i7quan.com/app/UserHomePage",
            data: {"cid": cid, "userid": userid, "pageIndex": index, "pageSize": size},
            async: true,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            success: function (data) {
                console.log(data)
                var datas = data.datas;
                console.log(datas);
                //如果这个人没有动态就显示下面的box
                if (data.count < 1) {
                    $("#font_tip").css("display", "block")
                    $("#font_con").css("display", "none")
                }
                //查询关注列表里有没有这个人，如果有就显示为已关注，没有就显示为未关注
                if (data.isattent) {
                    flag = false;
                    $(".edit").text("已关注")
                }
                else {
                    flag = true;
                }
                ;
                if (data.isrealname) {
                    $("#smrz").text("已实名")
                } else {
                    $("#smrz").text("未实名")
                }
                //他人信息
                var str = "";
                var temp = $(".conent").html();
                var img = "http://www.i7quan.com" + data.headpic;
                if (data.headpic == null || data.headpic == "" || data.headpic == "/app/GetHeadPic?p=") {
                    temp = temp.replace("@img", "images/icon.png")
                }
                if (data.profile == null || data.profile == "") {
                    temp = temp.replace($(".jianjie").text(), "他还没有编辑个人简介")
                }
                str += temp.replace("@img", img)
                    .replace("@nickname", data.nickname)
                    .replace("@1", data.attents)
                    .replace("@", data.fans)
                    .replace($(".jianjie").text(), data.profile)
                $(".conent").html(str);
                //设置他人动态
                var str2 = "";
                var temp2 = $("#dynamics_box").html();
                $(datas).each(function (i, v) {
                    var newTemp = temp2;
                    var a = datas[i].头像;
                    var b = "http://www.i7quan.com";
                    var img = b + a;
                    //如果没有详情就替换成头像和图片

                    if (datas[i].详情 == undefined) {
                        newTemp = newTemp.replace("@details", datas[i].昵称)
                            .replace("@images", img)
                    }

                    //////////////////////显示时间//////////////////
                    function getDateDiff(dateStr) {
                        dateStr = Date.parse(dateStr.replace(/-/gi, "/"));//如果是字符串需要转换时间戳
                        var publishTime = dateStr / 1000,
                            d_seconds,
                            d_minutes,
                            d_hours,
                            d_days,
                            timeNow = parseInt(new Date().getTime() / 1000),
                            d,
                            date = new Date(publishTime * 1000),
                            Y = date.getFullYear(),
                            M = date.getMonth() + 1,
                            D = date.getDate(),
                            H = date.getHours(),
                            m = date.getMinutes(),
                            s = date.getSeconds();
                        //小于10的在前面补0
                        M = M < 10 ? '0' + M : M;
                        H = H < 10 ? '0' + H : H;
                        m = m < 10 ? '0' + m : m;
                        s = s < 10 ? '0' + s : s;
                        d = timeNow - publishTime;
                        d_days = parseInt(d / 86400);
                        d_hours = parseInt(d / 3600);
                        d_minutes = parseInt(d / 60);
                        d_seconds = parseInt(d);
                        if (d_days > 0 && d_days < 3) {
                            return d_days + '天前';
                        } else if (d_days <= 0 && d_hours > 0) {
                            return d_hours + '小时前';
                        } else if (d_hours <= 0 && d_minutes > 0) {
                            return d_minutes + '分钟前';
                        } else if (d_seconds < 60) {
                            if (d_seconds <= 0) {
                                return '刚刚';
                            } else {
                                return d_seconds + '秒前';
                            }
                        } else if (d_days >= 3 && d_days < 30) {
                            return M + '-' + D + ' ' + H + ':' + m;
                        } else if (d_days >= 30) {
                            return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
                        }
                    };
                    var Time_o = getDateDiff(datas[i].时间)
                    str2 += newTemp.replace("@action", datas[i].动作)
                        .replace("@time", Time_o)
                        .replace("@details2", datas[i].详情)
                })
                $(".con_dynamic").append(str2);
                //遍历li如果有头像就隐藏详情
                $(".details2").each(function (i, v) {
                    var ui = $(".details2").eq(i).text()
//							console.log(ui)
                    if (ui == "undefined") {
                        $(".details2").eq(i).css("display", "none")
                    }
                })
                //如果没头像就隐藏头像
                $(".details").each(function (i, v) {
                    var vi = $(".details").eq(i).children('.head').attr("src")
                    if (vi == "@images") {
                        $(".details").eq(i).css("display", "none")
                    }
                    else if (vi == "http://www.i7quan.com") {
                        $(".head").eq(i).attr("src", "images/icon.png")
                    }
                })
                index++;
            }
        });
    }

    //滑动到最底部自动刷新动态
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            down()
        }
    });

    //点击关注，文字变为已关注，并调用关注接口关注此人
    //当flag为true时执行一个ajax，为flase时执行另外一个

    $(document).on('click', '.edit', function () {
        if (flag) {
            $.ajax({
                type: "POST",
                url: "http://www.i7quan.com/app/Attent",
                data: {"cid": cid, "aid": userid},
                async: true,
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    $(".edit").text("已关注")
                    flag = false;
                }
            })
        }
        else {
            $.ajax({
                type: "POST",
                url: "http://www.i7quan.com/app/RemoveAttent",
                data: {"cid": cid, "aid": userid},
                async: true,
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    $(".edit").text("关注")
                    flag = true;
                }
            })
        }
    })


})
