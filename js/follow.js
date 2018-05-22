$(function () {
    //提示信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }


    var cid = sessionStorage.getItem("cid");
    var index = 1;
    var size = 10;
    getAttentList()

    function getAttentList() {
        $.ajax({
            type: "POST",
            url: "http://www.i7quan.com/app/AttentList",
            data: {"cid": cid, "pgIndex": index, "pgSize": size},//
            async: true,
            dataType: "json",
            success: function (data) {
                var datas = data.datas;
                var str = "";
                var temp = $("#dynamics_box").html();
                $(datas).each(function (i, v) {
                    var newTemp = temp;
                    var a = datas[i].头像;
                    var b = "http://www.i7quan.com";
                    var img = b + a;
                    if (datas[i].头像 == "" || datas[i].头像 == null) {
                        newTemp = newTemp.replace("@img", "images/icon.png")
                    }
                    if (datas[i].简介 == null || datas[i].简介 == "") {
                        newTemp = newTemp.replace("@2", "他还没有编辑个人简介")
                    }
                    str += newTemp.replace("@1", datas[i].昵称)
                        .replace("@2", datas[i].简介)
                        .replace("@img", img)
                        .replace("@_id", datas[i].ID)
                })
                $(".dynamics_box").append(str);
                //点击取消关注，取消关注此人，并刷新数据
                $(".dynamic").each(function (i, v) {
                    $(".edit2").eq(i).click(function () {
                        var k_id = $.trim($(".AttentList_id").eq(i).val());
                        $.ajax({
                            type: "get",
                            url: "http://www.i7quan.com/app/RemoveAttent",
                            data: {"cid": cid, "aid": k_id},
                            dataType: "json",
                            success: function (data) {
                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();
                                $(".dynamic").eq(i).remove();
                                window.location.reload();
                            },
                            error: function () {
                                $("#tip").text("网络异常").css("display", "block");
                                tipMsg();
                            }
                        });
                    })
                })
                $(".dynamic").each(function(i,v){
                	  $(".img_box").eq(i).click(function (event) {
                        var my_id = sessionStorage.getItem("my_id");
                        sessionStorage.setItem("index_id", $(".AttentList_id").eq(i).val())
                        var i_id = $(".AttentList_id").eq(i).val()
                        if (my_id == i_id) {
                            window.location.href = "mydata.html"
                        }
                        else {
                            window.location.href = "youdata.html"
                        }
                        event.stopPropagation();
                    })
                })
                index++;
                
            }
        });
    }

    //滑动到最底部自动刷新动态
    $(window).scroll(function () {
        if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
            getAttentList();
        }
    });
})