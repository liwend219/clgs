//		点击t+d
		$(function(){
			$("#font_td").click(function(){
				$("#right").attr("href","guize_jygzTD.html")
				$(".t1").css("display","none")
				$(".td").css("display","block")
				$("#faqiCl").css("display","none")
				$("#faqiCl2").css("display","block")
			});
			$("#font_t1").click(function(){
				$("#right").attr("href","guize_jygz.html")
				$(".t1").css("display","block")
				$(".td").css("display","none")
				$("#faqiCl").css("display","block")
				$("#faqiCl2").css("display","none")
				
			});
//			//			判断是否存在策略组
			var uid = sessionStorage.getItem("my_id");
			//          console.log(uid)
			$.ajax({
				type: 'post',
				url: 'http://139.196.178.5:8006/api/union/scheme/HaveScheme.json',
				dataType: "json",
				data: {
					"userid": uid
				},
				success: function(data) {
					console.log(data)
					if(data.rs) {
						$("#font_td").click(function() {
							$(".shodx").css("display", "block")
							$(".shod").css("display", "block")
						})
						$("#font_t1").click(function() {
							$(".shodx").css("display", "none")
						})
						$("#faqiCl2").click(function() {
							//				判断是否存在策略组
							$("#inquiry_modelX").css("display", "block");

							$("#inquiry_modelX .cancel").click(function() {
								$("#inquiry_modelX").css("display", "none")
							})
							$("#inquiry_modelX .sure").click(function() {
								window.location.href = "gupiao_t6.html"
							})
						})
					}
					if(data.rs == false) {
						$("#font_td").click(function() {
							$(".shodx").css("display", "block")
							$(".shod2").css("display", "block")
						})
						$("#font_t1").click(function() {
							$(".shodx").css("display", "none")
						})

					}
				}

			})
			//			点击去申请策略组
			$(".shod").click(function() {
				window.location.href = "gupiao_t6.html"
			})
			
			//获取计算公式即时改变止盈止损等。。。
            $.ajax({
				type: 'post',
				url: 'http://192.168.1.20:8006/api/home/scheme/index.json',
				dataType: "json",
				data: {
					"device": 1
				},
				success: function(data) {
					console.log(data.datas.strRisk)
//					挂单系数
                    sessionStorage.setItem("lever",data.datas.strRisk.leverValue.value)
					sessionStorage.setItem("gdxs",data.datas.strRisk.tradingCountRatio.value) 
					sessionStorage.setItem("zhfy",data.datas.strRisk.serviceCharge.value) 
				}
            })
            
//          初始化页面数据
      	$.ajax({
				type: 'post',
				url: 'http://192.168.1.20:8005/Shares/GetShares',
				data: {
					"code": code
				},
				dataType: "json",
				success: function(data) {
					
								//					当前价格
					var cprice = Math.round(data[0].当前价格 * 100) / 100
//                  	var cprice = sessionStorage.getItem("cprice")
						console.log("当前价---" + cprice)
			            var gdxs = sessionStorage.getItem("gdxs")
						var dmje = Math.ceil(100*cprice*gdxs/100) * 100;
						console.log("td点买金额",dmje)
					    sessionStorage.setItem("dmje",dmje)
//						综合费
						var zhfy = sessionStorage.getItem("zhfy")
                        var zhf = dmje/10000*zhfy
                        if(dmje<10000){
                        	var zhf = 28
                        }
                        console.log("综合费",zhf)
                        //                      初始化渲染
                        $('#dianmaijine2').text(dmje)
                        $('#zhiying2').html("+"+dmje+"<span style='color:#393939'>元</span>")
						$('#zhisun2').html("-"+dmje+"<span style='color:#393939'>元</span>")
                        $('#lybzj2').text('履约保证金　　0'+"元")
                        $('#jyzhf2').text('交易综合费　　'+zhf+"元")
                        
                                   
//          页面数据显示
			$('#shuliang2').bind('input propertychange', function() {
			
				if(parseFloat($(this).val()) < 100 || parseFloat($(this).val()) % 100 != 0) {
					$('#dianmaijine2').text(0)
					$('#zhiying2').text(0)
					$('#zhisun2').text(0)
					$('#lybzj2').text('履约保证金　　0')
					$('#jyzhf2').text('交易综合费　　0')
					
				} else {
						 
						//          取到点买金额
						var cprice =  Math.round(data[0].当前价格 * 100) / 100
			            var gdxs = sessionStorage.getItem("gdxs")
						var dmje = Math.ceil(parseFloat($(this).val())*cprice*gdxs/100) * 100;
//						console.log("td点买金额",dmje)
                        sessionStorage.setItem("dmje",dmje)
//						综合费
						var zhfy = sessionStorage.getItem("zhfy")
                        var zhf = dmje/10000*zhfy
                        var zhf = Math.round(zhf * 100) / 100
                        if(dmje<10000){
                        	var zhf = 28
                        }
                         $('#dianmaijine2').text(dmje)
                        $('#zhiying2').html("+"+dmje+"<span style='color:#393939'>元</span>")
						$('#zhisun2').html("-"+dmje+"<span style='color:#393939'>元</span>")
                        $('#lybzj2').text('履约保证金　　0'+"元")
                        $('#jyzhf2').text('交易综合费　　'+zhf+"元")
				}
			})
				}	
			})
      	
      				var id = sessionStorage.getItem("my_id")
					var cid = sessionStorage.getItem("cid")
//    	查询策略组
		$.ajax({
						type: 'post',
						url: 'http://139.196.178.5:8006/api/union/scheme/GetScheme.json',
						data: {
							"userid": id,
							"cid": cid
						},
						dataType: "json",
						success: function(data) {
							console.log("策略组id",data.datas.ssid)
							sessionStorage.setItem("ssid",data.datas.ssid)
						}
						})
      	
//    	点击T+d
				
          $("#faqiCl2").click(function(){
          		var schemeId = sessionStorage.getItem("ssid")
				var money = sessionStorage.getItem("dmje");
				var buyPriceOrder = sessionStorage.getItem("cprice")
				var orderType = 2
				var lever = sessionStorage.getItem("lever")
				var quitLoss = "-"+money
				var quitGain = money
				var principal = 0
				var serviceCharge = sessionStorage.getItem("zhfy")
				var stockCode = sessionStorage.getItem("$_code")
				var volumeOrder = $("#shuliang2").val()
				console.log(volumeOrder)
          		$.ajax({
				type: 'post',
				url: 'http://139.196.178.5:8006/api/union/scheme/outStrategyCreate.json',
				data: {
					"userid": id,
					"cid": cid,
					"schemeId": schemeId,                    //策略组id
					"money": money,                          //点买金额 = 买入价 * 股数 * 系数（接口1 strRisk中的tradingCountRatio），100向上取整，例如:2103 转化为-> 2200
					"buyPriceOrder": buyPriceOrder,          //买入价（当前行情）
					"orderType": orderType,                  //买入方式（2:市价
					"lever": lever,                          //杠杆
					"quitLoss": quitLoss,                    //止损金额
					"quitGain": quitGain,                    //止盈金额
					"principal": principal,                  //保证金
					"serviceCharge": serviceCharge,          //手续费
					"stockCode": stockCode,                  //股票代码
					"volumeOrder": volumeOrder               //股数
					
				},
				dataType: "json",
				success: function(data) {
					console.log(data)
				}
				})
          })

		})