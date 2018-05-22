$(function(){
	$(".zjdm").click(function(){
		$("#inquiry_model").css("display","block")
	})
	$(".cancel").click(function(){
		$("#inquiry_model").css("display","none")
		$("#inquiry_modelt").css("display","none")
		$("#inquiry_modelj").css("display","none")
		$("#inquiry_modelX").css("display","none")
		$("#inquiry_modelC").css("display","none")
	})
	$(".zjbzj").click(function(){
		$("#inquiry_modelt").css("display","block")
	})
	$(".sqjs").click(function(){
		$("#inquiry_modelj").css("display","block")
	})
	if($("#num").text() >= 4){
		$(".qxxz").click(function(){
			$("#inquiry_modelX").css("display","block")
		})
	}else{
		$(".qxxz").click(function(){
			$("#inquiry_modelC").css("display","block")
		})
	}
	
	
	
	
	
	
})