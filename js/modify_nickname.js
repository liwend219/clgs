$(function () {
    var nname = sessionStorage.getItem("昵称");
    var sy = sessionStorage.getItem("简介");
    var cid = sessionStorage.getItem("cid");
    $("#nickname").val(nname);
    $("#mytext").html(sy);

    //昵称
    $(".detailed").click(function () {
        var nickname = $("#nickname").val();
        $.ajax({
            type: "GET",
            url: "http://www.i7quan.com/app/SetNickName",
            data: {"cid": cid, "nickname": nickname},
            async: true,
            dataType: "json",
            success: function (data) {
                if (data.rs) {
                    window.location.href = "data.html";
                }
                else {
                    alert(data.msg)
                }
            }
        });
    })
    //个人简介
    $(".detailedtwo").click(function () {
        var syno = $("#mytext").val();
        $.ajax({
            type: "GET",
            url: "http://www.i7quan.com/app/SetUserProfile",
            data: {"cid": cid, "profile": syno},
            async: true,
            dataType: "json",
            success: function (data) {
                if (data.rs) {
                    window.location.href = "data.html";
                }
                else {
                    alert(data.msg)
                }
            }
        });
    })
    $(".div a").attr("href", "javascript:history.back(-1);")
    //昵称
    $("#nickname").change(function () {
        $(".div").click(function () {

            var msg = confirm("确认要放弃本次编辑吗？")
            if (msg == true) {
                $("#nickname").val(nname);
                $(".div a").attr("href", "javascript:history.back(-1);")
            } else {
                $("#nickname").val(nname);
                $(".div a").attr("href", "")
            }
        })
    })
    //个人简介
    $("#mytext").keydown(function () {
        $(".div").click(function () {

            var msg = confirm("确认要放弃本次编辑吗？")
            if (msg == true) {
                $("#mytext").html(syno);
                $(".div a").attr("href", "javascript:history.back(-1);")
            } else {
                $("#mytext").html(syno);
                $(".div a").attr("href", "")
            }
        })
    });

    window.onload = function () {
        document.getElementById('mytext').onkeydown = function () {
            if (this.value.length >= 30)
                event.returnValue = false;
        }
    }
})