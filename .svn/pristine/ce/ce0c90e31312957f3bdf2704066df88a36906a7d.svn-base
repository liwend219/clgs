$(function () {
    //我的信息
    var cid = sessionStorage.getItem("cid");
    $.ajax({
        type: "POST",
        url: "http://www.i7quan.com/app/userinfo",
        data: {"cid": cid},
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function (data) {
            var datas = data.datas;
            var str = "";
            var temp = $("body").html();
            $(datas).each(function (i, v) {
                var a = datas.头像;
                var b = "http://www.i7quan.com/";
                var img = b + a;
                if (datas.头像 == null || datas.头像 == "" || datas.头像 == "/app/GetHeadPic?p=") {
                    temp = temp.replace("@img", "images/icon.png")
                }
                if (datas.昵称 == "") {
                    $(".info_name").html("新用户001")
                }
                if (datas.简介 == "") {
                    $(".jianjie").html("编辑资料，筹备开场")
                }
                //替换模板内容
                str += temp.replace("@name", datas.昵称)
                    .replace("@jianjie", datas.简介)
                    .replace("@5", datas.关注)
                    .replace("@6", datas.粉丝)
                    .replace("@img", img)

            });
            $("body").html(str);

            //编辑
            $("#edit").click(function () {
                window.location.href = "data.html";
            })
        }
    });
    //获取自己的动态

    var my_id = sessionStorage.getItem("my_id");
    var flag = true;
    var index = 1;
    var size = 5;
    down();

    function down() {
        $.ajax({
            type: "POST",
            url: "http://www.i7quan.com/app/UserHomePage",
            data: {"cid": cid, "userid": my_id, "pageIndex": index, "pageSize": size},
            dataType: "json",
            success: function (data) {
                var datas = data.datas;
                //如果这个人没有动态就显示下面的box
                if (data.count < 1) {
                    $("#font_tip").css("display", "block")
                    $("#font_con").css("display", "none")
                }

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
})