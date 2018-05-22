$(function () {
    var cid = "tHbQGD7q4UFOzpJzzwqeVjgb223q";
    //tab
    $(".v1").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".dynamics_box").css("display", "block");
        $(".news_box").css("display", "none")
    });
    $(".v2").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".news_box").css("display", "block");
        $(".dynamics_box").css("display", "none");
    });

    //最新动态
    var cid = "tHbQGD7q4UFOzpJzzwqeVjgb223q";
    var index = 1;
    var size = 10;
    down();

    function down() {

        $.ajax({
            type: "POST",
            url: "http://www.i7quan.com/app/ProfitList",
            data: {"cid": cid, "pgIndex": index, "pgSize": size},
            dataType: "json",
            success: function (data) {
                var datas = data.datas;
                var str = "";
                var temp = $("#dynamics_box").html();
                $(datas).each(function (i, v) {
                    var newTemp = temp;
                    var a = datas[i].头像;
                    var b = "http://www.i7quan.com/";
                    var img = b + a;
                    if (datas[i].头像 == "") {
                        newTemp = newTemp.replace("@img", "images/icon.png")
                    }

                    ////////////////////////////////////////显示时间//////////////////////////////////////////////////////////

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
                    var Time = getDateDiff(datas[i].时间)


                    str += newTemp.replace("@1", datas[i].昵称)
                        .replace("@2", Time)
                        .replace("@4", datas[i].盈利)
                        .replace("@3", datas[i].详情)
                        .replace("@img", img)
                        .replace("@_gp", datas[i].股票)
                        .replace("@_dm", datas[i].代码)
                        .replace("@_id", datas[i].UserID)
                })
                $(".dynamics_box").append(str);

                //获得用户自己的ID
                $.ajax({
                    type: "POST",
                    url: "http://www.i7quan.com/app/userinfo",
                    data: {"cid": cid},
                    async: true,
                    dataType: "json",
                    success: function (data) {
                        sessionStorage.setItem("state", data.datas.状态)
                        var myid = data.datas.ID
                        sessionStorage.setItem("my_id", myid)
                    }
                })
                $(".dynamic").each(function (i, v) {
                    //点击li获取他的股票和代码，存起来，进入到询价页面。
                    $(".dynamic").eq(i).click(function () {
                        sessionStorage.setItem("stock_name", $(".mm").eq(i).text())
                        sessionStorage.setItem("stock_code", $(".yy").eq(i).text())
                        sessionStorage.setItem("stock_num", 10)
                        sessionStorage.setItem("index_jump", "首页动态");
                    })
                    //点击头像进入他的个人主页，如果是自己发布的进入到自己的主页
                    //点击后判断是不是用户自己的
                    $(".dynamic_icon").eq(i).click(function (event) {
                        var my_id = sessionStorage.getItem("my_id");
                        sessionStorage.setItem("index_id", $(".id").eq(i).text())
                        var i_id = $(".id").eq(i).text()
                        event.stopPropagation();
                    })
                })

                index++;
            }

        });
    }

    function downtwo() {
        $.ajax({
            type: "POST",
            url: "http://www.i7quan.com/app/GetNews",
            data: {"type": "公告", "pgIndex": index, "pgSize": 5},
            async: true,
            dataType: "json",
            success: function (data) {
            	console.log(data)
                var datas = data.datas
                var str = "";
                var temp = $("#news_box").html();
                $(datas).each(function (i, v) {
                    var newTemp = temp;
                    var a = datas[i].Pic;
                    var b = "http://www.i7quan.com";
                    var img = b + a;
                    if (datas[i].Pic == "") {
                        newTemp = newTemp.replace("@pic", "images/news_img01.png")
                    }

                    /////////////////////////////////显示时间///////////////
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
                    var Time = getDateDiff(datas[i].Time)
                    str += newTemp.replace("@1", datas[i].Title)
                        .replace("@2", Time)
                        .replace("@3", datas[i].Type)
                        .replace("@pic", img)
                        .replace("@Journalismid", datas[i].ID)
                })
                $(".news_box").append(str);
                //点击后进入新闻详情
                $(".new").each(function (i, v) {
                    $(".new").eq(i).click(function () {
                        var $vid = $(".Journalismid").eq(i).val()
                        sessionStorage.setItem("$vid", $vid)
                    })
                })


            }
        });
    }

    downtwo();


    //滑动到最底部自动刷新动态
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            down();
            downtwo();
        }
    });
})        