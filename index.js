function ajax(e,t,n,o){var i;try{i=new XMLHttpRequest}catch(a){try{i=new ActiveXObject("Microsoft.XMLHTTP")}catch(a){throw alert("您的浏览器版本过低，请使用较新的浏览器访问"),a}}i.open(e,t,!0),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.onreadystatechange=function(){4==i.readyState&&200==i.status&&o(i.responseText)},i.send(n)}function ok(){var e=document.getElementById("name").value.replace(/(^\s*)|(\s*$)/g,"");if(e.length<2)return void alert("您的姓名至少应为2个字");var t=document.getElementById("tel").value.replace(/(^\s*)|(\s*$)/g,"");if(t.length<7)return void alert("您的手机号码输入不正确");var n=document.getElementById("title").value,o=document.getElementById("city").value,i=document.getElementById("note").value,a=document.getElementById("dealer").value;try{ajax("post",domain+"/?r=tdrive","name="+encodeURIComponent(e)+"&tel="+t+"&title="+encodeURIComponent(n)+"&city="+o+"&note="+encodeURIComponent(i)+"&dealer="+a,function(e){clickCount("landing-page-submit"),document.getElementById("name").value="",document.getElementById("tel").value="",document.getElementById("note").value="",alert(e)})}catch(c){alert("提交数据出错")}}function initOptions(e,t){var n="";if(t=t||"area",e&&e.length>0)for(var o=0;o<e.length;o++)n+='<option value="'+e[o].id+'">'+e[o][t]+"</option>";return n}function initProvince(e){document.getElementById("province").innerHTML=initOptions(e),loadCity()}function initCity(e){document.getElementById("city").innerHTML=initOptions(e),loadDealer()}function loadCity(e){var e=document.getElementById("province").value;getScript(domain+"?r=city&fid="+e+"&callback=initCity")}function initDealer(e){document.getElementById("dealer").innerHTML=initOptions(e,"name")}function loadDealer(){var e=document.getElementById("city").value;getScript(domain+"?r=dealer/get&lang=cn&callback=initDealer&city="+e)}function getScript(e){var t=document.createElement("script");t.src=e,document.getElementsByTagName("head")[0].appendChild(t)}function preLoadImages(e,t){for(var n=e.length,o=0,i=0;n>i;i++)!function(i){var a=new Image;a.onerror=a.onload=function(){o++,o==n&&t()},a.src=e[i]}(i)}function clickCount(e){"function"==typeof totaltag&&totaltag(domain+location.pathname+"#"+e)}function initPage(){var e=isMobile?"mobile1.jpg":"pc.jpg",t=[e,"bg.jpg"];preLoadImages(t,function(){document.getElementById("logo").innerHTML="<img src='"+e+"'' alt='腾势电动车' width='100%' border='0' />",document.body.style.display="block",getScript(domain+"?r=city&fid=0&callback=initProvince")})}var domain="http://www.denza.com/",isMobile=navigator.userAgent.toLowerCase().indexOf("mobile")>0&&navigator.userAgent.toLowerCase().indexOf("ipad")<0;document.addEventListener("DOMContentLoaded",initPage,!1);