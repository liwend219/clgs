$(function () {

    //当身份信息中有值是下面按钮才可用
    var $name = $("#ipt_name").val();
    var $idnum = $("#ipt_num").val();
    var $address = $("#address").val();
    $('input').on('input propertychange', function () {
        if (($.trim($("#ipt_name").val()) !== "" && $.trim($("#ipt_num").val()) !== "" && $.trim($("#address").val()) !== "")) {
            $('#sub_btn').css('opacity', '1');
            $('#sub_btn').attr("disabled", false);
        } else {
            $('#sub_btn').css('opacity', '0.5');
            $('#sub_btn').attr("disabled", true);
        }

    });
    //判断姓名，身份证信息是否为空
    if ($name == "" && $idnum == "" && $address == "") {
        $('#sub_btn').attr("disabled", true);
    }
    //判断是否添加图片
    $("#sub_btn").click(function () {

        if ($("#img1").val() == "" || $("#img2").val() == "" || $("#address").val() == "" || $("#ipt_num").val() == "" || $("#ipt_name").val() == "") {
            alert("您没有完善信息");
        }
        else {
            formValidate();
        }

    });

    var $cardnum = $("#cardnum").val();
    var $bankaddress = $("#bankaddress").val();
    $('#v2 input').on('input propertychange', function () {
        if (($.trim($("#cardnum").val()) !== "" && $.trim($("#bankaddress").val()) !== "")) {
            $('#sub_btn2').css('opacity', '1');
            $('#sub_btn2').attr("disabled", false);
        } else {
            $('#sub_btn2').css('opacity', '0.5');
            $('#sub_btn2').attr("disabled", true);
        }

    });


//  $("input[type='checkbox']").change(function () {
//      if ($("input[type='checkbox']").is(':checked')) {
//          $('#sub_btn2').css('opacity', '1');
//          $('#sub_btn2').attr("disabled", false);
//      }
//      else {
//          $('#sub_btn2').css('opacity', '0.5');
//          $('#sub_btn2').attr("disabled", true);
//      }
//  })


    $("#sub_btn2").click(function () {
        if ($("#cardnum").val() == "" || $("#bankaddress").val() == "" || $("#selCity").val() == "") {
            alert("您没有完善信息");
        } else {
            two()
        }


    });
    var cid = sessionStorage.getItem("cid");
    $("#cid").attr("value", cid);

    function isChinaName(ipt_name) {
        var pattern = /^[\u4E00-\u9FA5]{1,6}$/;
        return pattern.test(ipt_name);
    };

    function isCardNo(card) {
        var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return pattern.test(card);
    };

    function isBankCardNo(bcard) {
        var pattern = /^(\d{16}|\d{19})$/;
        ;
        return pattern.test(bcard);
    };

    function formValidate() {
        var str = '';

        if ($.trim($('#ipt_name').val()).length == 0) {
            str += '名称没有输入,请核对\n';
            $('#ipt_name').focus();
        } else {
            if (isChinaName($.trim($('#ipt_name').val())) == false) {
                str += '名称不合法,请核对\n';
                $('#ipt_name').focus();
            }
        }

        if ($.trim($('#ipt_num').val()).length == 0) {
            str += '身份证号码没有输入\n';
            $('#ipt_num').focus();
        } else {
            if (isCardNo($.trim($('#ipt_num').val())) == false) {
                str += '身份证号不正确；\n';
                $('#ipt_num').focus();

            }
        }

        if (str != '') {
            alert(str);

        } else {
            $("#v1").css("display", "none")
            $("#v2").css("display", "block")
        }
    }

    function two() {
        str = '';
        if ($.trim($('#cardnum').val()).length == 0) {
            str += '银行卡没有输入,请核对\n';
            $('#cardnum').focus();
        } else {
            if (isBankCardNo($.trim($('#cardnum').val())) == false) {
                str += '银行卡号不合法,请核对\n';
                $('#cardnum').focus();
            }
        }

        if (str != '') {
            alert(str);
        }
        else {
            var form = new FormData(document.getElementById("myform"));
            $.ajax({
                type: "post",
                url: "http://www.i7quan.com/app/RealName",
                data: form,
                dataType: "json",
                timeout: 600000,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.rs == true) {
                        window.location.href = "modify_tip.html"
                    } else {
                        alert("提交失败，请重试！")
                    }
                },
                error: function () {
                    alert("网络错误")
                },
                complete: function (XMLHttpRequest, status) {
                    if (status == 'timeout') {
                        $.alert("网络超时，请刷新")
                    }
                }
            });

        }

    }

})
		
      