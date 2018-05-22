$(function () {

var cid = sessionStorage.getItem("cid");
    $.ajax({
        type: "POST",
        url: "http://www.i7quan.com/app/userinfo",
        data: {"cid": cid},
        async: true,
        dataType: "json",
        success: function (data) {
//      	console.log(data.datas)
        	   //设置自己的信息
//			    $("#phone").val(data.datas.账号);
//			    $("#cardno").val(data.datas.卡号);
			    $("#cid").val(cid);
//			    if(data.datas.账号 =="" || data.datas.账号 ==null){
//			    	 $("#phone").val("");
//			    }else if(data.datas.卡号 =="" || data.datas.卡号 ==null){
//			    	 $("#cardno").val("");
//			    }
        	}
        })
//if ($("#phone").val()=="" || $("#cardno").val()=="" || $("#money_inpt").val() =="") {
//          $('#sb').css('opacity', '0.5');
//          $('#sb').attr("disabled", "disabled");
//      }
//当充值金额有值的时候下面的按钮才可用
    $('input').on('input propertychange', function () {
        if($("#amount2").val() > 0&& $("#alipayacc").val()!=''){
        	$('#sb').css('opacity', '1');
            $('#sb').removeAttr("disabled")
        }
        else {
               $('#sb').css('opacity', '0.5');
            $('#sb').attr("disabled", "disabled");
        }
    });
//  if($("#phone").val()=="" || $("#cardno").val()=="" || $("#money_inpt").val() ==""){
//  	alert("您未完善信息！")
//  }

 
})
//www.i7quan.com/pay/zn_qkpay_sub_app?cid=oT8WFOJXvOtGFPE6DtOiuPc6OXFW&cardno=6212261207016277709&phone=13396915656&money=100;