$(function(){
	
	$(".fenshi").css("border-bottom","0.01rem solid rgb(21, 165, 122)")
	$(".k_box .first li").click(function(){
		$(this).siblings('li').css("border-bottom","0.01rem solid #FFFFFF");
		$(this).css("border-bottom","0.01rem solid rgb(21, 165, 122)");
	});
	    //信息框隐藏
    function tipMsg() {
        setTimeout(function () {
            $("#tip").fadeOut(1000);
        }, 1000);
    }
   
//	盘口
	$(".pankou").click(function(){
	$(".k_graph img").css("display","none")
	$("#Diskdata").css("display","block")
			$.ajax({
				type:"post",
				url:"http://192.168.1.20:8005/Shares/GetShares",
				data: {"code": code},
		        dataType: "json",
				success: function (data) {
//					console.log(data[0])
//					今开
					var jinkai = Math.round(data[0].今日开盘价*100)/100;
//					昨收
                    var zuoshou = Math.round(data[0].昨日收盘价*100)/100;
//                 	 振幅
                    var zhenfu = (data[0].今日最高价-data[0].今日最低价)/data[0].昨日收盘价;
					var zhenfu1 = (zhenfu*100).toFixed(2)+"%";
//					涨停
                    var zhang = data[0].昨日收盘价*1.1
                    var zhang1 = Math.round(zhang*100)/100
//                  跌停
					var die = data[0].昨日收盘价*0.9
                    var die1 = Math.round(die*100)/100
//                  总手
					var zongshou = data[0].成交的股票数/100
                   
                      if(zongshou > 10000){
                      	var zongshou1 = zongshou/10000
                      	var zongshou2 = Math.round(zongshou1*100)/100
                      }else if(zongshou < 10000){
                      	var zongshou2 = zongshou
                      }
                      
//                  最高
                    var zuigao = Math.round(data[0].今日最高价*100)/100;
//                  最低
 					var zuidi = Math.round(data[0].今日最低价*100)/100;
// 					总量
                    var zongliang = data[0].成交金额;
                    if(zongliang > 100000000){
                      	var zongliang1 = zongliang/100000000;
                      	var zongliang2 = Math.round(zongliang1*100)/100+"亿";
                      }
                     else if(zongliang > 10000){
                      	var zongliang1 = zongliang/10000;
                      	var zongliang2 = Math.round(zongliang1*100)/100+"万";
                      }else if(zongliang < 10000){
                      	var zongliang2 = zongliang
                      }
                    
						var str = "";
		              var temp = $(".Diskdata").html();
		              str += temp.replace("@jin", jinkai)
		                         .replace("@zuo", zuoshou)
		                         .replace("@zhen", zhenfu1)
		                         .replace("@zhang", zhang1)
		                         .replace("@die", die1)
		                         .replace("@zong", zongshou2+"万")
		                         .replace("@gao", zuigao)
		                         .replace("@di", zuidi)
		                         .replace("@liang", zongliang2)
		                 $("#Diskdata").html(str);
				},
				error:function(){
					alert("网络错误")
				}
				
			});
	})
//	买卖
	var code = sessionStorage.getItem("$_code"); 
        $.ajax({
        	type:"post",
				url:"http://192.168.1.20:8005/Shares/GetShares",
				data: {"code": code},
		        dataType: "json",
				success: function (data) {
//					console.log(data[0])
//				console.log(data[0].卖一)
						var str = "";
		              var temp = $("#mai").html();
		              str += temp.replace("@m1", Math.round(data[0].卖一报价*100)/100)
		                         .replace("@m2", Math.round(data[0].卖二报价*100)/100)
		                         .replace("@m3", Math.round(data[0].卖三报价*100)/100)
		                         .replace("@m4", Math.round(data[0].卖四报价*100)/100)
		                         .replace("@m5", Math.round(data[0].卖五报价*100)/100)
		                         .replace("@n1", Math.round(data[0].卖一*100)/100)
		                         .replace("@n2", Math.round(data[0].卖二*100)/100)
		                         .replace("@n3", Math.round(data[0].卖三*100)/100)
		                         .replace("@n4", Math.round(data[0].卖四*100)/100)
		                         .replace("@n5", Math.round(data[0].卖五*100)/100)
		                         .replace("@x1", Math.round(data[0].买一报价*100)/100)
		                         .replace("@x2", Math.round(data[0].买二报价*100)/100)
		                         .replace("@x3", Math.round(data[0].买三报价*100)/100)
		                         .replace("@x4", Math.round(data[0].买四报价*100)/100)
		                         .replace("@x5", Math.round(data[0].买五报价*100)/100)
		                         .replace("@z1", Math.round(data[0].买一*100)/100)
		                         .replace("@z2", Math.round(data[0].买二*100)/100)
		                         .replace("@z3", Math.round(data[0].买三*100)/100)
		                         .replace("@z4", Math.round(data[0].买四*100)/100)
		                         .replace("@z5", Math.round(data[0].买五*100)/100)
		                 $(".mai").html(str);
			}
        });

	

		$.ajax({
				type:"post",
				url:"http://192.168.1.20:8005/Shares/GetShares",
				data: {"code": code},
		        dataType: "json",
				success: function (data) {
//					console.log(data)
		 		var img = data[0].股票代码;
		 		$(".k_graph img").attr("src","http://image.sinajs.cn/newchart/min/n/"+img+".gif");
//		 				console.log(img)
					 					//日k
				$(".rk").click(function(){
			    	$(".k_graph img").css("display","block")
			    	$("#Diskdata").css("display","none")
			    	$(".k_graph img").attr("src","http://image.sinajs.cn/newchart/daily/n/"+img+".gif")
			    })
							//	月k
			    $(".yuek").click(function(){
			    	$(".k_graph img").css("display","block")
			    	$("#Diskdata").css("display","none")
			    	$(".k_graph img").attr("src","http://image.sinajs.cn/newchart/monthly/n/"+img+".gif")
			    })
			    //周k
				$(".zhouk").click(function(){
			    	$(".k_graph img").css("display","block")
			    	$("#Diskdata").css("display","none")
			    	$(".k_graph img").attr("src","http://image.sinajs.cn/newchart/weekly/n/"+img+".gif")
			    })
			
				//分时
				$(".fenshi").click(function(){
			    	$(".k_graph img").css("display","block")
			    	$("#Diskdata").css("display","none")
			    	$(".k_graph img").attr("src","http://image.sinajs.cn/newchart/min/n/"+img+".gif");
			    })
				
			}
	})
		
//		setTimeout(function(){
//			shuaxin()
//		},20000)//2秒运行一次
	
	
//	上面的信息

	function shuaxin2(){
		$.ajax({
				type:"post",
				url:"http://192.168.1.20:8005/Shares/GetShares",
				data: {"code": code},
		        dataType: "json",
				success: function (data) {
					console.log(data[0])
//					console.log(data[0].股票代码)
					
					var Currentprice = Math.round(data[0].当前价格*100)/100;//当前价格
					
					var cc = data[0].当前价格-data[0].昨日收盘价; 
					var cc1 = Math.round(cc*100)/100; //
					
					var dd = (data[0].当前价格-data[0].昨日收盘价)/data[0].昨日收盘价;
					var dd1 = (dd*100).toFixed(2)+"%"
					if(cc1>0){
						cc1 = "+"+cc1
						$(".name").css("background","#e1433d")
						$("#genghuan").css("background","#e1433d")
					}else{
						cc1 = cc1
						$(".name").css("background","rgb(21, 165, 122)")
						$("#genghuan").css("background","rgb(21, 165, 122)")
					}
					if(dd>0){
						dd1 = "+"+dd1
						$(".name").css("background","#e1433d")
						$("#genghuan").css("background","#e1433d")
					}else{
						dd1 = dd1
						$(".name").css("background","rgb(21, 165, 122)")
						$("#genghuan").css("background","rgb(21, 165, 122)")
					}
					  var str = "";
		              var temp = $("#name").html();
		              str += temp.replace("@GPname", data[0].股票名称)
		                         .replace("@GPcode", data[0].股票代码)
		                         .replace("@Cupr", Currentprice)
		                         .replace("@cc", cc1)
		                         .replace("@dd", dd1)
		                 $(".name").html(str);
		                 
									}
			});
	
	}
			        	setInterval(function(){
								shuaxin2()
							},2000)//2秒运行一次         	
	
		
		
//	模态框信息
		$.ajax({
				type:"post",
				url:"http://192.168.1.20:8005/Shares/GetShares",
				data: {"code": code},
		        dataType: "json",
				success: function (data) {
					//					模态框
                      var str2 = "";
		              var temp2 = $("#ad_name").html();
		              str2 += temp2.replace("@GPname", data[0].股票名称)
		                         .replace("@GPcode", data[0].股票代码)
//		                         .replace("@Cupr", Currentprice)
//		                         .replace("@cc", cc1)
//		                         .replace("@dd", dd1)
		                 $(".ad_name").append(str2);
		                 
		                 sessionStorage.setItem("$_code",data[0].股票代码);
		                  sessionStorage.setItem("$_name",data[0].股票名称);
		                var Currentprice = Math.round(data[0].当前价格*100)/100;//当前价格
		                var dd = (data[0].当前价格-data[0].昨日收盘价)/data[0].昨日收盘价;
						var dd1 = (dd*100).toFixed(2)+"%"
//						涨停
                        var zhang = data[0].昨日收盘价*1.1
                      	var zhang1 = Math.round(zhang*100)/100
//                    	console.log(zhang1)
//                    	跌
                        var die = data[0].昨日收盘价*0.9
                      	var die1 = Math.round(die*100)/100
//                    	console.log(die1)
		              var str3 = "";
		              var temp3 = $("#zhangdiefu").html();
		              if(dd>0 || dd==0){
							dd1 = "+"+dd1
							temp3 = temp3.replace("@color", "color:#de4238")
						}
		               if(dd<0){
							dd1 = dd1
							temp3 = temp3.replace("@color", "color:#2bd637")
						}
		              str3 += temp3.replace("@4.82", Currentprice)
		                         .replace("@10.07", dd1)
		                         .replace("@zhang", zhang1)
		                         .replace("@die", die1)
		                 $(".zhangdiefu").append(str3);
				}
				})
	
//	    模态框
    //登陆状态
    var cid = sessionStorage.getItem("cid");

    //接口api
    //网址
    var website = myApi.getApi("WEBSITE");

    //获取服务费接口
    var getFee = website + myApi.getApi("GETFEE");
    //询价接口
    var askPrice = website + myApi.getApi("ASKPRICE");
    //询价记录接口
    var askPrice_record = website + myApi.getApi("ASKPRICE_RECORD");
    //询价记录提交接口
    var askSubmit_record = website + myApi.getApi("ASKSUBMIT_RECORD");
    //成交接口
    var deal_record = website + myApi.getApi("DEAL");
    //结算接口
    var settlement_record = website + myApi.getApi("SETTLEMENT");
    //补全股票名称接口
    var completion_name = website + myApi.getApi("GETSYMBOLNAME");
    //用户信息接口
    var userinfo = website + myApi.getApi("USERINFO");
	
	  //如果执行方式为t+1
    $(".term_lists").on("change",function(){
    	 var result = $(".term_lists").val();
//  	 console.log(result)
            if(result == "5d"){
            	$(".implement_lists").text("T+1");
            }
            if(result == "10d"){
            	$(".implement_lists").text("T+2");
            }
             if(result == "1m"||result == "2m"||result == "3m"){
            	$(".implement_lists").text("T+5");
            }
    })
    
    
    //点击询价
    $(".inquiry_btn").click(function () {
         //登陆状态
   		 var cid = sessionStorage.getItem("cid");
        // 股票代码
        var stock_code = sessionStorage.getItem("$_code");
        var stock_code = stock_code.slice(2,stock_code.length)
        // 股票名称
        var stock_name = sessionStorage.getItem("$_name");

        // 股票执行方式
        var stock_implement = $(".tab_content .tab_left .stock_implement .implement_lists ").text();
        console.log(stock_implement)
        
        // 股票执行价格
        var stock_price = $(".tab_content .tab_left .stock_price .price_lists option:checked").text();
        stock_price = stock_price.replace(/%/g, "");

        // 股票期限
        var stock_term = $(".tab_content .tab_left .stock_term .term_lists option:checked").val();
//       console.log(stock_term)

        // 投顾资产
        var stock_assets = $(".tab_content .tab_left .stock_assets .assets_text").val();

        flag = true;

        timer = setTimeout(function () {
            if (flag) {
                //重置标识
                flag = false;

                if (stock_assets >= 100 && stock_assets % 10 == 0) {
                    $.ajax({
                        type: "get",
                        url: userinfo,
                        data: {
                            "cid": cid
                        },
                        dataType: "json",
                        success: function (data) {
                        	console.log(data)
                            var datas = data.datas;
                            var realName_state = datas.状态;
                            console.log(datas)
                            sessionStorage.setItem("state", realName_state);
                        },
                        error: function () {
                            $("#tip").text("获取状态失败, 请重试").css("display", "block");
                            tipMsg();
                        }
                    });
                }

                //获取实名状态
                var realName_state = sessionStorage.getItem("state");

                if (stock_assets == "") {
                    $("#tip").text("投顾资产不能为空").css("display", "block");
                    tipMsg();

                } else if (stock_assets.indexOf(0) == 0) {
                    $("#tip").text("投顾资产不能0开头").css("display", "block");
                    tipMsg();

                } else if (stock_assets < 20) {
                    $("#tip").text("投顾资产不能低于20万").css("display", "block");
                    tipMsg();

                } else if (stock_assets % 10 != 0) {
                    $("#tip").text("投顾资产必须是10万的整数倍").css("display", "block");
                    tipMsg();

                } else if (realName_state != "已认证" && stock_assets >= 100) {
                    $("#realName_model").fadeIn();

                } else {
                    $.ajax({
                        url: getFee,
                        type: "get",
                        timeout: 5000,
                        dataType: "json",
                        data: {
                            "code": stock_code,
                            "exeprice": stock_price,
                            "term": stock_term,
                            "principal": stock_assets,
                            "cid": cid
                        },
                        success: function (data) {
                            $("#inquiry_model").fadeIn();

                            //询价模态框股票代码
                            $("#inquiry_model .model_content .code_box .code_name").text(stock_code + " " + stock_name);

                            //询价模态框股票执行方式
                            $("#inquiry_model .model_content .implement_box .category").text(stock_implement);

                            //询价模态框股票执行价格
                            $("#inquiry_model .model_content .price_box .price").text(stock_price + "%");

                            //询价模态框股票期限
                            if(stock_term == "5d"){
                            	 $("#inquiry_model .model_content .term_box .term").text("1周");
                            }
                            if(stock_term == "10d"){
                            	 $("#inquiry_model .model_content .term_box .term").text("2周");
                            }
                            if(stock_term == "1m"){
                            	 $("#inquiry_model .model_content .term_box .term").text("1月");
                            }
                            if(stock_term == "2m"){
                            	 $("#inquiry_model .model_content .term_box .term").text("2月");
                            }
                            if(stock_term == "3m"){
                            	 $("#inquiry_model .model_content .term_box .term").text("3月");
                            }
//                          $("#inquiry_model .model_content .term_box .term").text(stock_term);
//                             console.log(stock_term)
                            //询价模态框投顾资产
                            $("#inquiry_model .model_content .assets_box .assets").text(stock_assets + "万");

                            //询价模态框投顾费用(服务费)
                            var msg = data.msg;
                            if (isNaN(msg)) {
                                $("#inquiry_model .model_content .cost_box .cost").text(data.msg);
                                $("#inquiry_model .model_content .cost_box .cost_text").css("display", "none");
                                $("#inquiry_model .model_content .cost_box .cost").css({
                                	"width": "100%",
                                	"text-align": "center"
                                });
                            } else {
                                $("#inquiry_model .model_content .cost_box .cost").text(data.msg + "元");
                                $("#inquiry_model .model_content .cost_box .cost_text").css("display", "block");
                                $("#inquiry_model .model_content .cost_box .cost").css({
                                	"width": "50%",
                                	"text-align": "left"
                                });
                            }
                        },
                        error: function (XMLHttpRequest, status) {
                            if (status == "timeout") {
                                $("#tip").text("请求超时, 请重试").css("display", "block");
                                tipMsg();
                            } else {
                                $("#tip").text("询价失败, 请重试").css("display", "block");
                                tipMsg();
                            }
                        }
                    });
                }
            } else {
                clearTimeout(timer);
            }
        }, 300);       
    })
        //询价模态框事件
    // 取消事件
    $("#inquiry_model .model_content .model_option .cancel").click(function () {
        $("#inquiry_model").fadeOut();
    });
      //确定事件
    $("#inquiry_model .model_content .model_option .sure").click(function () {

        // 股票代码
        var stock_code = sessionStorage.getItem("$_code");
         var stock_code = stock_code.slice(2,stock_code.length)
        // 股票名称
        var stock_name = sessionStorage.getItem("$_name");

        //股票执行方式
        var stock_implement = $("#inquiry_model .model_content .implement_box .category").text();

        //股票执行价格
        var stock_price = $("#inquiry_model .model_content .price_box .price").text();
        stock_price = stock_price.replace(/%/g, "");

        //股票期限
        var stock_term = $("#inquiry_model .term").text();
//      console.log(stock_term)
        //投顾资产
        var stock_assets = $("#inquiry_model .model_content .assets_box .assets").text();

        flag = true;
        timer = setTimeout(function () {

            if (flag) {
                //重置标识
                flag = false;
 
                    $.ajax({
                        url: askPrice,
                        type: "post",
                        dataType: "json",
                        data: {
                            "code": stock_code,
                            "symbol": stock_name,
                            "exemode": stock_implement,
                            "exeprice": stock_price,
                            "term": stock_term,
                            "principal": stock_assets,
                            "cid": cid
                        },
                        success: function (data) {
                        	console.log(data)
                            if (data.rs) {
                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();

                                $("#inquiry_model").fadeOut();

                                // 刷新页面
                                setTimeout(function () {
                                    window.location.reload();
                                }, 1000);

                                //清除首页/高手跳转股票代码和名称会话存储
                                sessionStorage.removeItem("stock_code");
                                sessionStorage.removeItem("stock_name");
                            } else{
                                $("#tip").text(data.msg).css("display", "block");
                                tipMsg();
                            }
                            
                        },
                        error: function () {
                            $("#tip").text("报价失败").css("display", "block");
                            tipMsg();
                        }
                    });
            } else {
                clearTimeout(timer);
            }
        }, 300);

    });
        // 实名认证模态框
    // 取消事件
    $("#realName_model .model_content .model_option .cancel").click(function () {
        $("#realName_model").fadeOut();

    });

    //确定事件
    $("#realName_model .model_content .model_option .sure").click(function () {
        $("#realName_model").fadeOut();
        window.location.href = "modify_Authentication.html";
    });
    //协议跳转
    $(".agreement .text a").click(function () {
        window.location.href = "agreement.html";
        //跳转标识
        sessionStorage.setItem("跳转标识", "adviser_agreement");
    });
    //判断协议是否被选中
    $(".info_submit .agreement .checkbox").change(function () {
        if ($("input[type='checkbox']").is(':checked')) {
            $(".info_submit .agreement .checkbox").attr("checked", "checked");
            $(".info_submit .inquiry_btn").removeAttr("disabled").css({
                "opacity": 1,
                "cursor": "pointer"
            });
        } else {
            $(".info_submit .agreement .checkbox").removeAttr("checked");
            $(".info_submit .inquiry_btn").attr("disabled", "disabled").css({
                "opacity": 0.5,
                "cursor": "Default"
            });
            $("#tip").text("请勾选协议").css("display", "block");
            tipMsg();
        }
    });
})