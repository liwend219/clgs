// 运营商号段验证
function checkMobile(val) {
    var phoneReg = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6])|(17[1-8])|(18[0-9])|(19[8-9]))\d{8}$/;
    if (phoneReg.test(val)) {
        return true;
    } else {
        return false;
    }
}

//密码验证
function checkPwd(pwd) {
    var pwdReg = /^(\w){6,15}$/;
    if (pwdReg.test(pwd)) {
        return true;
    } else {
        return false;
    }
}

//银行卡
     function isBankCardNo(bcard) {
        var pattern = /^(\d{16}|\d{19})$/;
         if (pattern.test(bcard)) {
	        return true;
	    } else {
	        return false;
	    }
    };
//时间格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,         //月份
        "d+": this.getDate(),          //日
        "h+": this.getHours(),          //小时
        "m+": this.getMinutes(),         //分
        "s+": this.getSeconds(),         //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()       //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
// 帮助模态框
function showHelpMade(e,index){
    // alert(1)
    var text = ""
    if(index==1){
        text = {
            title:'投顾类型',
            content:'禁止投顾ST、*ST、上市新股、连续涨停、企业亏损、或其他被限制的股票。'
        }
    }else if(index==2){
        text = {
            title:'执行方式',
            content:'美式、平价看涨（投顾后持有五个交易日以上可以提前行权）。'
        }
    }else if(index==3){
        text = {
            title:'执行价格',
            content:'投顾后，由券商进入市场成交后反馈回来的实际执行价格。'
        }
    }else if(index==4){
        text = {
            title:'投顾期限',
            content:'即用户行使投顾的时间周期，用户可在行权周期内自行行权，或者到期自动行权。'
        }
    }
    else if(index == 5){
        text = {
            title:'投顾资产',
            content:'投顾的总金额，最低10万起且100万以内必须是10万的整数倍。100万以上必须是100万的整数倍。'
        }
    }
    console.log(e)
    e.preventDefault();
    $("#cover").css("display","block");
    $("#cover").animate({
        width: "100%",
        height: "100%",
        top: "0",
        left: "0"
    },0);
   
    $("#cover-content").animate({
        // height: "80px"
    },150);
    $(".cover-content-title").html('<b>'+text.title+'</b>')
    $(".cover-content-content").html(text.content)
    $('#cover-content').css('margin-top',-$('#cover-content').height()+'px')
}
//点击取消帮助模态框
$(function(){
    $("#cover-bg").click(function(){
        $("#cover").removeAttr("style");
        $("#cover-content").removeAttr("style");
    });
})
