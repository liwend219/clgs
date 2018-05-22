$(function () {
    //获取询价记录提交/拼单存储
    //订单代码及名称
    var order_name = sessionStorage.getItem("order_name");

    //服务费用
    var payment_price = sessionStorage.getItem("payment_price");
//  payment_price = payment_price.replace(/元/g, "");

    //扣款时间戳
    var payment_time = sessionStorage.getItem("payment_time");

    //获取跳转标识
    var identification = sessionStorage.getItem("跳转标识");
    
    //获取三角形跳转
    var sanjiao = sessionStorage.getItem("三角形");
    console.log(sanjiao)
    
    //获取单号
    var s_OrderCode = sessionStorage.getItem("s_OrderCode");
    //获取总价
    var s_ProductMoney = sessionStorage.getItem("s_ProductMoney");
    //获取商品名称
    var s_ProductName = sessionStorage.getItem("s_ProductName");
    //获取创建时间
    var s_CreateTime = sessionStorage.getItem("s_CreateTime");
    
    
    
    
    // 拼单跳转支付
    if (identification == "fight_payment") {
        $("#fight_jump").css("display", "block");

        //服务费
        $("#fight_jump .payment_content .payment_result .payment_price").text("-" + payment_price);

        //订单名称及代码
        $("#fight_jump .payment_content .payment_info .order_name").text("拼单-" + order_name);

        //拼单支付时间
        $("#fight_jump .payment_method .time").text(payment_time);
    }

    // 投顾跳转支付
    if (identification == "adviser_payment") {
        $("#inquiry_jump").css("display", "block");

        //服务费
        $("#inquiry_jump .payment_content .payment_result .payment_price").text("-" + payment_price);

        //订单名称及代码
        $("#inquiry_jump .payment_content .payment_info .order_name").text("询价-" + order_name);

        //投顾支付时间
        $("#inquiry_jump .payment_content .payment_info .time").text(payment_time);
    }
    //三角形主机跳转
    if(sanjiao == "true"){
    	 $("#sanjiao").css("display", "block");
    	$("#sanjiao .payment_content .payment_result .payment_price").text("-￥" + s_ProductMoney);
    	$("#sanjiao .payment_info .time").text(s_CreateTime);
    	$("#sanjiao .payment_content .payment_info .order_name").text(s_ProductName);
    	$("#sanjiao .payment_content .payment_info .OrderCode").text(s_OrderCode);
    }
});