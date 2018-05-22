$(function () {
	
        var w = $(window).width();
        if (w > 750) {
            w = 750;
        }
        $("html").css("font-size", w / 7.5 + "px");
        $(window).resize(function () {
            var w = $(window).width();
            if (w > 750) {
                w = 750;
            }
            $("html").css("font-size", w / 7.5 + "px");
        });

        $("#footer_nav .nav_box .nav_item .nav_img").click(function () {
            var img_src = $(this).attr("src");
//          console.log(img_src);
            $(this).attr()
        })
        //点击进入填写地址页面
        $(".top").click(function(){
        	window.location.href = "Triangle_2.html"
        })
        

        //获取到地址电话等
        var name = sessionStorage.getItem("联系人");
        var phone = sessionStorage.getItem("手机号");
        var address = sessionStorage.getItem("详细地址");
//      console.log(address)
        if(name == "" ||name == null ){
        	$(".name").text("联系人")
        }else{
        	$(".name").text(name)
        }
        if(phone == "" ||phone == null ){
        	$(".phone").text("*********")
        }else{
        	$(".phone").text(phone)
        }
        if(address == "" ||address == null ){
        	$(".address").text("点击输入具体地址")
        }else{
        	$(".address_m").text(address)
        }
        //点击确认下单提醒扣款
        $(".footer .right").click(function(){
        	$("#realName_model").css("display","block");
        })
 // 实名认证模态框
    // 取消事件
    $("#realName_model .model_content .model_option .cancel").click(function () {
        $("#realName_model").fadeOut();

    });

    //确定事件
    $("#realName_model .model_content .model_option .sure").click(function () {
        $("#realName_model").fadeOut();
        var user_id = sessionStorage.getItem("user_id");
// 		console.log("usid",user_id)
 		
 		var cid = sessionStorage.getItem("cid");
// 		console.log("cid",cid)
 		
 		var ProductID = sessionStorage.getItem("ProductID");
// 		console.log("产品id",ProductID)
 		
 		var ProductName = sessionStorage.getItem("ProductName");
// 		console.log("产品名字",ProductName)
 		
 		var ProductNum = $("#quantity").val();
// 		console.log("购买数量",ProductNum)
 		
 		var ProductPrice = sessionStorage.getItem("ProductPrice");
// 		console.log("产品单价",ProductPrice)
 		
 		var ProductMoney =  parseInt($(".total").text());
// 		console.log("产品总价",ProductMoney)
 		
 		var Name = sessionStorage.getItem("联系人");
// 		console.log("联系人",Name)
 		
        var Phone = sessionStorage.getItem("手机号");
//      console.log("手机号",Phone)
        
        var Address = sessionStorage.getItem("详细地址");
//      console.log("详细地址",Address)
        if(Name == null||Name == undefined||Phone == null||Phone == undefined||Address == null||Address == undefined){
        	alert("请完善信息")
        }else{
        	$.ajax({
        	type: "post",
	            url: "http://106.15.59.178:8001/api/User/OrderCreate",
	            data:{
	            	"UserID":user_id,
	            	"CID":cid,
	            	"ProductID":ProductID,
	            	"ProductName":ProductName,
	            	"ProductNum":ProductNum,
	                "ProductPrice":ProductPrice,
	                "ProductMoney":ProductMoney,
	                "Name":Name,
	                "Phone":Phone,
	                "Address":Address,
	            },
	            dataType: "json",
	            success: function (data) {
	            	console.log(data.msg)
	            	if(data.rs == true && data.msg == "已完成"){
	            		//存下成功信息
	            		//跳转标识
	            		sessionStorage.setItem("三角形",data.rs);
	            		
	            		//总价
	            		sessionStorage.setItem("s_ProductMoney",data.datas.ProductMoney);
	            		//商品名称
	            		sessionStorage.setItem("s_ProductName",data.datas.ProductName);
//	            		创建时间
	            		sessionStorage.setItem("s_CreateTime",data.datas.CreateTime);
	            		//订单号
	            		sessionStorage.setItem("s_OrderCode",data.datas.OrderCode);
	            		
//	            		 跳转支付结果页面
	                            setTimeout(function () {
	                                window.location.href = "payment.html";
	                            }, 1000);
	            	}
	            	else if(data.rs == true&&data.msg == "你的余额不足"){
	            		if(confirm("订单已生成，您的余额不足是否前往充值？")==true){
	            			window.location.href="wallet.html"
	            		
	            	}
	            	}
	            	else if(data.rs == false){
	            		alert(data.msg)
	            	}
	            	
	            },
	            error : function(){
	            	alert("网络错误，提交失败")
	            }
	           
        })
        }
        
        
    });

    });