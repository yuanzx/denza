var domain = "http://www.denza.com/";
var isMobile =navigator.userAgent.toLowerCase().indexOf('mobile')>0&&navigator.userAgent.toLowerCase().indexOf('ipad')<0;
var logo = isMobile?"mobile1.jpg":"pc.jpg";
document.getElementById("logo").innerHTML="<img src='"+logo+"'' alt='腾势电动车' width='100%' border='0' />";
function ajax(method,url,param,callback){
	var request;
    try{
        request = new XMLHttpRequest();
    }catch(e){
        try{
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }catch(e){
            alert("您的浏览器版本过低，请使用较新的浏览器访问");
            throw e;
        }
    }
    request.open(method,url,true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var result;
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            if(request.status==200){
            	callback();
                // result =JSON.parse(request.responseText);
                // callback(result);
            }
        }
    }
    request.send(param);
}

function submit(){
	var name = document.getElementById("name").value.replace(/(^\s*)|(\s*$)/g,'');
	if (name.length<2) {
		alert("您的姓名至少应为2个字");
		return;
	};
	var tel = document.getElementById("tel").value.replace(/(^\s*)|(\s*$)/g,'');
	if (tel.length<7) {
		alert("您的手机号码输入不正确");
		return;
	};	
	var title = document.getElementById("title").value;
	var city = document.getElementById("city").value;
	var note = document.getElementById("note").value;
	var dealer =  document.getElementById("dealer").value;
	try{
		ajax("post",domain+"/?r=tdrive",{name:name,tel:tel,title:title,city:city,note:note,dealer:dealer},function(){
			alert("提交成功");
		})
	}
	catch(e){
		// alert("提交数据出错")
		throw e;
	}
	
}
function initOptions(res,val){
	var str="";
	val = val || "area"
	if (res&&res.length>0) {
		for (var i = 0; i < res.length; i++) {
			str+='<option value="'+res[i]["id"]+'">'+res[i][val]+'</option>'
		};
	}
	return str;
}
function initProvince(res){
	document.getElementById("province").innerHTML = initOptions(res);	
	loadCity()
}
function initCity(res){
	document.getElementById("city").innerHTML = initOptions(res);
	loadDealer();
}
function loadCity(fid){
	var fid = document.getElementById("province").value;
	getScript(domain+"?r=city&fid="+fid+"&callback=initCity");
}
function initDealer(res){
	document.getElementById("dealer").innerHTML = initOptions(res,"name");	
}
function loadDealer(){
	var id = document.getElementById("city").value;
	getScript(domain+"?r=dealer/get&lang=cn&callback=initDealer&city="+id);
}
function getScript(src){
	var script = document.createElement("script");
	script.src = src;
	document.getElementsByTagName('head')[0].appendChild(script); 
}
getScript(domain+"?r=city&fid=0&callback=initProvince");

