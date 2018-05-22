$(function () {
        //获取cid
    var cid = sessionStorage.getItem("cid");
    $("#search").focus();
    //搜索
    $("#font").click(function () {
		var v1 = $("#search").val();
        //搜索
        $.ajax({
            type: "POST",
            url: "http://www.i7quan.com/app/Search",
            data: {"key": v1, "cid": cid, "pgIndex": 1, "pgSize": 10},
            dataType: "json",
            success: function (data) {
            	console.log(data)
                var ds = data.symbols;//股票——名称——代码
                var dr = data.news;//资讯——动态
                var str = "";
                var str2 = "";
                var temp = $("#templ").html();
                var temp2 = $("#templ2").html();
                $(ds).each(function (i, v) {
                    str += temp.replace("@sy", ds[i].Symbol)
                        .replace("@code", ds[i].Code)
                });
                $(".sss_li").html(str);

                $(dr).each(function (i, v) {
                    str2 += temp2.replace("@information", dr[i].Content)
                        .replace("@name_data", dr[i].Time)
                        .replace("@name_user", dr[i].Type)
                });
                $(".font_msg").html(str2);
                //点击询价
                $(".search_msg").each(function (i, v) {
                    $(".btn_btn").eq(i).click(function () {
                        sessionStorage.setItem("stock_code", $(".code").eq(i).text())
                        sessionStorage.setItem("stock_name", $(".symbol").eq(i).text())
                        sessionStorage.setItem("index_jump", "首页搜索");
                        window.location.href = "adviser.html"
                    })
                })


            },
            error: function () {
                alert("网络错误")
            }
        });
    });

    
    //监测输入框是否发生变化
    $("#search").on('input',function () {
        if ( $("#search").val() != "") {
             $(".box_search").css("display", "none");
            $(".box_focus").css("display", "block");
        }
        else {
          $(".sss_li").html("");
         $("#search").val("");
         $(".font_msg").html("")
        }
    });
    //逻辑
    //点击后输入框显示同样的文字,并跳到下一个页面显示输入对应的信息
    $(".one li").click(function () {
        var result = $.trim($(this).text().substring(1));
        $(".box_search").css("display", "none");
        $(".box_focus").css("display", "block");
        $("#search").val(result);
        $(".his_font").text(result);
    });

//  //点击删除回到第一个页面并且input里面的值去掉
//  $(".icon_del").click(function () {
//      $(".sss_li").html("");
//      $("#search").val("");
//      window.location.reload();
//  })
    //获取热搜关键词
    $.ajax({
        type: "POST",
        url: "http://www.i7quan.com/app/HotSearch",
        dataType: "json",
        success: function (data) {
//      	console.log(data)
            $(data).each(function (i, v) {
            });
            $(".font").each(function (i, v) {
                $(this).html(data[i])
            })
        }
    });


})