 //check browser
var isie=(/msie/i).test(navigator.userAgent); //ie
var isie6=(/msie 6/i).test(navigator.userAgent); //ie 6
var isie7=(/msie 7/i).test(navigator.userAgent); //ie 7
var isie8=(/msie 8/i).test(navigator.userAgent); //ie 8
var isie9=(/msie 9/i).test(navigator.userAgent); //ie 9
var isie10=(/msie 10/i).test(navigator.userAgent); //ie 9
var isfirefox=(/firefox/i).test(navigator.userAgent); //firefox
var isapple=(/applewebkit/i).test(navigator.userAgent); //safari,chrome
var isopera=(/opera/i).test(navigator.userAgent); //opera
var isios=(/(ipod|iphone|ipad)/i).test(navigator.userAgent);//ios
var isipad=(/(ipad)/i).test(navigator.userAgent);//ipad
var isandroid=(/android/i).test(navigator.userAgent);//android
var device;
//if(isie7 || isie8 || isie9){ isie6=false;}
//if(isie9){ isie=false;}
//if(isapple || isios || isipad || isandroid){}else{}

function con(l,t){
  if( "console" in window ){
     var log = (t == undefined) ? l : t + l;
     console.log(log);
  }
}
if(!("console" in window)) {console={}; console.log = function(){};}

/*파라미터 구하기*/
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function setCookie(name,value,expiredays) {
    var today = new Date();
    var secure = location.protocol == "https:" ? "secure" : ""
    today.setDate(today.getDate()+expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";" + secure;
}


function getCookie( name ) {
   var nameOfCookie = name + "=";
   var x = 0;
   while ( x <= document.cookie.length )
   {
           var y = (x+nameOfCookie.length);
           if ( document.cookie.substring( x, y ) == nameOfCookie ) {
                   if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                           endOfCookie = document.cookie.length;
                   return unescape( document.cookie.substring( y, endOfCookie ) );
           }
           x = document.cookie.indexOf( " ", x ) + 1;
           if ( x == 0 )
                   break;
   }
   return "";
}


//네비게이션
function pageInfo(pNum,sNum,tNum, pageType){
  var pageNum = pNum;
  var subNum = sNum;
  var threeNum = tNum;
  var lnbUl = $(pageType+" .lnb_inner > ul");
  var snbUl = $(".lst_tab_cont .inner > ul");

  if(pageNum > 1 && pageNum <= lnbUl.find(">li").length){
    lnbUl.find(" > li.m"+pageNum).addClass("on");
    var lnb1img = lnbUl.find(" > li.m"+pageNum).find(">a>img");

  }else if(pageNum == 1){
  	var cacode = getUrlParameter('cacode');
  	if(cacode){
	  	cacode = parseInt(cacode.slice(1,2))-1;
	  	lnbUl.find(" > li.m1").eq(cacode).addClass("on");
  	}
  };

  if(subNum > 0 && subNum <= snbUl.find(">li").length){
    snbUl.find(" > li.m"+subNum).addClass("on");
  }


};//pageInfo


//탭
function tab(s,o,d){
	var o = $(o);
	var arr = $("<span>")
	.attr({"class":"arr"})
	.css({
		"display":"none",
		"width":8,
		"height":12,
		"position":"absolute",
		"right":-8,
		"top":19,
		"z-index":10,
		"background":"url(/images/about/bg_arr.gif)"
	});
	var $total = o.find("li").length-1;
	var $first = s-1;
	var $prev = $first;
	var tab_id = new Array();
	var $btn = o.find(">ul>li");
	var $simg = o.find(">ul>li:eq("+$first+")");
	$simg.append(arr);


	function img_change(img_obj,b,f){
		img_obj.attr("src",img_obj.attr("src").split(b).join(f));
	}//mg_change


	for( var i=0; i<=$total; i++){
		tab_id[i] = o.find(">ul>li:eq("+i+")>a").attr("href");
		$(tab_id[i]).css("display","none");
		$(tab_id[$first]).css("display","block");
		$btn.filter(":eq("+i+")").removeClass("fixed");
	 }

	 $simg.addClass("fixed");




	 $btn.unbind("click").bind("click",function(){

	 	var $this = $(this);
	 	var $index = $(this).index();
	 	$(this).append(arr);
	 	if(!$this.hasClass("fixed")){
		 	 $btn.each(function(){
		 	 	$(this).removeClass("fixed");
		 	 });
		 	 $this.addClass("fixed");
		 	 $(tab_id[$prev]).css("display","none");
		 	 $(tab_id[$index]).fadeIn(300);
		 	 $prev = $index;
	 	}
	 });

	 if(!d){ o.find(">ul>li>a").unbind("click").bind("click",function(event){event.preventDefault();});	};
}
//탭

/* stopPropagation */
function stopgoup(event){
	if (event.stopPropagation) {
		event.stopPropagation();
		event.preventDefault();
	} else {
		event.returnValue = false;
		event.cancelBubble = true;
	}
}

//fakefile
var W3CDOM = (document.createElement && document.getElementsByTagName);
function initFileUploads() {
	if (!W3CDOM) {
		return;
	}
	var fakeFileUpload = document.createElement('div');
	fakeFileUpload.className = 'fakefile';
	var inputbox = document.createElement('input')
	fakeFileUpload.appendChild(inputbox);
	fakeFileUpload.getElementsByTagName('input')[0].className = 'ipt';
	var image = document.createElement('img');
	image.src = '/pc/brand/images/common/btn_upload_off.gif';
	fakeFileUpload.appendChild(image);
	var x = document.getElementsByTagName('input');
	for (var i = 0; i < x.length; i++) {
		if (x[i].type != 'file') continue;
		if (x[i].parentNode.className != 'fileinputs') continue;
		x[i].className = 'file';
		var clone = fakeFileUpload.cloneNode(true);
		x[i].parentNode.appendChild(clone);
		x[i].relatedElement = clone.getElementsByTagName('input')[0];
		x[i].onchange = x[i].onmouseout = function() {
			this.relatedElement.value = this.value;
		}
	}
}
//fakefile


/* placeholder */
function focusInput(me){
	var ele = $("#"+$(me).attr("for"));
	ele.focus();
	hideLabel(ele);
}

function hideLabel(me){
	var ele = $("label[for='"+$(me).attr('id')+"']");
	ele.css("display","none");
}

function showLabel(me){
	if($(me).val() == ""){
		var ele = $("label[for='"+$(me).attr('id')+"']");
		ele.css("display","inline");
	}
}

/*라디오 버튼*/
function checkradio(me){
	var name = me.getAttribute("name");
    if($(me).prop("checked") == false){
    	return false;
    }else{
    	$("input[name='"+name+"']").parent().removeClass("on");
    	$(me).parent().addClass("on");
    }

}

/*체크박스*/
function checkChkbox(me, p){
	var t;
	p ? t = $(me).closest(p) : t = $(me).parent();
    if($(me).prop("checked") == false) t.removeClass("on");
    else t.addClass("on");
    return $(me).prop("checked");
}

/*이미지 로드 체크*/
$.fn.extend({
    ensureLoad: function(handler) {
        return this.each(function() {
            if(this.complete) {
                handler.call(this);
            } else {
                $(this).load(handler);
                this.onerror = function(){
                	handler.call(this);
                };
            }
        });
    }
});
/*다중 이미지 로드 체크*/
function imgLoad(opt){
	var imgEle = opt.tar.find("img");
	var imgLoad = 0;
	if(imgEle.length ==0){
		opt.Fn();
	}else{
		for(var l = 0 ; l < imgEle.length ; l++){
			imgEle.eq(l).ensureLoad(function(){
				imgLoad++;
				if(imgLoad == imgEle.length){
					opt.Fn();
				}
			});
		}
	}
}

/* iCutter - 커스터마이징*/
function iCutter(obj){
	if (typeof(obj) == "object"){
		for( var i = 0 ; i < obj.length ; i++){
			var divs = $(obj[i]);
			action(divs);
		}
	}else{
		var divs = $(obj);
		action(divs);
	}

	function action(divs){
		divs.each(function(){
			var $this = $(this);
			var divAspect = $this.outerHeight() / $this.outerWidth();
			var img = $this.find('>img');
			img.ensureLoad(function(){
				var imgAspect = img.outerHeight() / img.outerWidth();
				if (imgAspect <= divAspect) {
					var imgWidthActual = $this.outerHeight() / imgAspect;
					var imgWidthToBe = $this.outerHeight() / divAspect;
					if(!img.parent().hasClass('no_center')){
						var marginLeft = -Math.round(((imgWidthActual/$this.outerWidth())-1) / 2 * 100000)/1000;
					}else{
						var marginLeft = 0;
					}
					img.removeClass('w100p').addClass('h100p').css({"margin-left":marginLeft+"%", "top":0});
				} else {
					var imgHeightActual = $this.outerWidth() * imgAspect;
					var imgHeightToBe = $this.outerWidth() * divAspect;
					if(!img.parent().hasClass('no_center')){
						var marginTop = -Math.round(((imgHeightActual/$this.outerHeight())-1) / 2 * 100000)/1000;
					}else{
						var marginTop = 0;
					}
					img.removeClass('h100p').addClass('w100p').css({"top":marginTop+"%", "margin-left":0});
				}
				if(img.hasClass('ict_hide'))img.removeClass('ict_hide');
			});
		});//each
	}
}//iCutter



/* common 팝업 */
var popFn = {
	show : function(t, type, callback, bgNotClick){
		var bg = $("#pop_common");
		bg.css('display','block');
		t.css('display','block');
		if(type)$("html").addClass("of_hide3");
		var posi = t.css('position');
		imgLoad({tar : t, Fn : function(){
			popFn.resize({data : {tg : t, posi : posi, type : type}});
				bg.addClass('on');
				if(!bgNotClick)bg.on('click', function(){popFn.hide(t)});
				t.addClass('on');
				if(!!callback){
					callback();
				}
			}
		});
		$(window).on('resize', {tg : t, posi : posi, type : type}, popFn.resize);
	},
	hide : function(t, change){
		var bg = $("#pop_common");
		if(!change)bg.removeClass('on');
		bg.off('click');
		t.removeClass('on');
		if(!change)$("html").removeClass("of_hide3");
		setTimeout(function(){
			if(!change)bg.css('display','none');
			t.css('display','none');
		},300)
		$(window).off('resize', popFn.resize);
	},
	change : function(o){
		var bg = $("#pop_common");
		o.prev.removeClass('on');
		$(window).off('resize', popFn.resize);
		setTimeout(function(){
			o.prev.css('display','none');
		},300);
		o.next.css('display','block');
		var posi = o.next.css('position');
		imgLoad({tar : o.next, Fn : function(){
			popFn.resize({data : {tg : o.next, posi : posi, type : o.type}});
			bg.off('click').on('click', function(){popFn.hide(o.next)});
			o.next.addClass('on');
		}});
	},
	resize : function(e){
		var t = e.data.tg;
		var vH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		t.css({'max-height':''});
		var wBx = $("#area_brand_page").hasClass('on') ?  $("#area_brand_page")[0] : $("#area_shop_page")[0];
		var bxH = t.outerHeight();
		var scl = e.data.posi =='fixed' ? 0 : $(wBx).scrollTop();
		t.css({'max-height':vH, 'top':( bxH > vH ? scl : (vH-bxH)/2+scl )+"px"});
	}
}

var divSelect = {
	toggle : function(me){
		var list = $(me).parent().find('ul');
		if(list.hasClass('on')){
			list.removeClass('on');
			setTimeout(function(){
				list.css('display','none');
			},300);
			$('body').off('click',divSelect.hide);
		}else{
			if($(".divSelect > ul.on").length > 0){
				divSelect.hide();
			}
			list.css('display','block');
			setTimeout(function(){
				list.addClass('on');
			},50);
			$('body').on('click',divSelect.hide);
		}
		stopgoup(event);
		return false;
	},
	hide : function(){
		$(".divSelect > ul.on").css('display','none').removeClass('on');
		$('body').off('click',divSelect.hide);
	},
	select : function(me){
		var str = $(me).text();
		var val = $(me).data('value');
		var btn = $(me).parents('.divSelect').find('>button');
		btn.text(str).data('value',val);
		this.hide();
	}
}



$.fn.customSelect = function(settings) {
	var config = {
		replacedClass: 'custom-select-replaced', // Class name added to replaced selects
		customSelectClass: 'custom-select', // Class name of the (outer) inserted span element
		activeClass: 'custom-select-isactive', // Class name assigned to the fake select when the real select is in hover/focus state
		wrapperElement: '<div class="custom-select-container" />' // Element that wraps the select to enable positioning
	};
	if (settings) {
		$.extend(config, settings);
	}
	this.each(function() {
		var select = $(this);
		if(select.parent().hasClass('custom-select-container')){
			var par = select.parent();
			val = par.find('option:selected', this).text();
			par.find('.'+config.customSelectClass+' span span').text(val);
			return;
		}
		select.addClass(config.replacedClass);
		select.wrap(config.wrapperElement);
		var update = function() {
			val = $('option:selected', this).text();
			span.find('span span').text(val);
		};
		// Update the fake select when the real select’s value changes
		select.change(update);
		select.keyup(update);
		var span = $('<span class="' + config.customSelectClass + '" aria-hidden="true"><span><span>' + $('option:selected', this).text() + '</span></span></span>');
		select.after(span);
		// Change class names to enable styling of hover/focus states
		select.on({
			mouseenter: function() {
				span.addClass(config.activeClass);
			},
			mouseleave: function() {
				span.removeClass(config.activeClass);
			},
			focus: function() {
				span.addClass(config.activeClass);
			},
			blur: function() {
				span.removeClass(config.activeClass);
			},
			change: function() {
				span.removeClass(config.activeClass);
			}
		});
	});
};

//height길이 제일 긴줄에 맞게.
function HeightLength(ele){
		var arr = [];

			$(ele).each(function(i){
			arr[i] = $(this).height();
			});
		   // alert(Math.max.apply(0, arr))
			$(ele).css("height", Math.max.apply(0, arr))

};



function alignAside(start){
	var brand = $("#area_brand_page");
	var aside = $("#aside");
	var pageWidth = $("#area_brand_page > .inner").outerWidth();
	if(brand.hasClass("on")){
		aside.css('left',pageWidth-aside.width());
	}else{
		aside.css('left','');
	}
	if(start){
		aside.addClass('on');
	}
}
$(function(){
	alignAside(1);
	$(window).on('resize', alignAside);
})
var pageChangeFlag = false;
function changePage(){
	if(pageChangeFlag)return false;
	pageChangeFlag = true;
	var dura = 800;
	var brand = $("#area_brand_page");
	var shop = $("#area_shop_page");
	var brandOn = brand.hasClass("on");
	var pageWidth = brand.width();
	ajax(brandOn);

	function ajax(flag){
		if(flag){
			var url = "/pc/shop/index.do";
			var t = shop;
		}else{
			var url = "/pc/brand/index.do";
			var t = brand;
		}
		if(!t.hasClass('got')){
			$.ajax({
				type:"GET",
				url:url,
				dataType:"html",
				data : {"ajax":1},
				error:function(request,status,error){
					alert("error:"+error);
				},
				success : function(data) {
					t.addClass('got').find(">.inner").html(data);
					imgLoad({tar : t, Fn : function(){
						pageOnOff(flag);
					}});
				}
			});
		}else{
			pageOnOff(flag);
		}
	}
	function pageOnOff(flag){
		movePage(document.getElementById('wrap_inner'), quadEaseInOut, dura, flag);
		moveAside(document.getElementById('aside'), quadEaseInOut, dura, flag);
		if(flag){
			$("#aside .mall_brand").removeClass("ml");
			brand.removeClass("on");
			shop.addClass("on");
		}else{
			$("#aside .mall_brand").addClass("ml");
			brand.addClass("on");
			shop.removeClass("on");

		}
	}
}

function animate(opts) {

  var start = new Date;
  var id = setInterval(function() {
    var timePassed = new Date - start;
    var progress = timePassed / opts.duration;

    if (progress > 1) progress = 1;

    var delta = opts.delta(progress);
    opts.step(delta);

    if (progress == 1) {
      clearInterval(id);
      opts.ani_end ? opts.ani_end() : "";
    }
  }, opts.delay || 10);
}

function movePage(element, delta, duration, brandOn) {
	var to = 100;
	if(brandOn){
		animate({
			delay: 10,
			duration: duration || 1000, // 1 sec by default
			delta: delta,
			step: function(delta) {
				element.style.marginLeft = -to*delta + "%";
			},
			ani_end : function(){
				pageChangeFlag = false;
			}
		});
	}else{
		animate({
			delay: 10,
			duration: duration || 1000, // 1 sec by default
			delta: delta,
			step: function(delta) {
				element.style.marginLeft = -to*(1-delta) + "%";
			},
			ani_end : function(){
				pageChangeFlag = false;
			}
		});
	}
}

function moveAside(element, delta, duration, brandOn) {
	var pageWidth = $("#area_brand_page > .inner").outerWidth();
	var to = pageWidth-$(element).width();
	if(!brandOn){
		animate({
			delay: 10,
			duration: duration || 1000, // 1 sec by default
			delta: delta,
			step: function(delta) {
				element.style.left = to*delta + "px";
			}
		});
	}else{
		animate({
			delay: 10,
			duration: duration || 1000, // 1 sec by default
			delta: delta,
			step: function(delta) {
				element.style.left = to*(1-delta) + "px";
			}
		});
	}
}

/*makeEaseInOut*/
function makeEaseInOut(delta) {
  return function(progress) {
    if (progress < .5)
      return delta(2*progress) / 2;
    else
      return (2 - delta(2*(1-progress))) / 2;
  };
}

/*makeEaseOut*/
function makeEaseOut(delta) {
  return function(progress) {
    return 1 - delta(1 - progress);
  };
}

function quad(progress) {
	//	return 1 - Math.sin(Math.acos(progress))
	return Math.pow(progress, 3);
}

var quadEaseInOut = makeEaseInOut(quad);

/*my ha 버튼*/
function myhaBlink(){
	var myha = $(".btn_myha > button");
	var cnt = 0;
	var BlinkCnt = 11;
	var h_img = myha.find(".h_on");
	myha.removeClass('tran3');
	for(var i = 0 ; i < BlinkCnt ; i++){
		setTimeout(function(){
			cnt++;
			if(cnt === (BlinkCnt)){
				myha.addClass('tran3');
				$(".pop_myha").stop().fadeIn(400);
			}
			myha.hasClass('on')?myha.removeClass('on') : myha.addClass('on');
		},i*80)
	}
}

function popHACodeShow(){
	ajaxShowPopCont({
		url : '/pc/inc/ajax_get_ha_code.jsp',
		data : {}
	});
}

/*ajax 팝업 띄우기*/
function ajaxShowPopCont(o){
	var wBx = $("#area_brand_page").hasClass('on') ?  "#area_brand_page" : "#area_shop_page";
	var t = o.target ? $(o.target) : $(wBx).find(".popup_box_common");
	$.ajax({
		url : o.url,
		type : "get",
		dataType : "html",
		data : o.data,
		success : function(data){
			if(!o.append)t.html('');
			t.append(data);
			var popup = o.pop ? $(o.pop) : t.find(">*").eq(0);
			popFn.show(popup, o.type || null);
		},
		error : function(a,b,c){
			alert(c);
		}
	})
}


function seTmyhaPopFn(){
	$(".btn_myha > button").off("click").on("click", function(){
		var myha = $(this);
		var pop_myha = myha.parent().next(".pop_myha");
		if (pop_myha.css("display")=="block"){
			pop_myha.stop().fadeOut(300);
			myha.removeClass('on');
		}else{
			pop_myha.stop().fadeIn(400);
			myha.addClass('on');
		}
	});
	$(".pop_myha .btn_close").off("click").on("click", function(){
		var pop_myha = $(this).parents(".pop_myha");
		var myha = pop_myha.prev(".btn_myha").find('button');
		pop_myha.stop().fadeOut(300);
		myha.removeClass('on');
	});
}

function setCatePopFn(){
	$(".btn_cate > button").off("click").on("click", function(){
		var cate = $(this);
		var pop_cate = cate.parent().next(".pop_cate");
		if (pop_cate.css("display")=="block"){
			pop_cate.stop().fadeOut(300);
			cate.removeClass('on');
		}else{
			pop_cate.stop().fadeIn(400);
			cate.addClass('on');
		}
	});
	$(".pop_cate .btn_close").off("click").on("click", function(){
		var pop_cate = $(this).parents(".pop_cate");
		var cate = pop_cate.prev(".btn_cate").find('button');
		pop_cate.stop().fadeOut(300);
		cate.removeClass('on');
	});
}


function go_to_top(site){
	var el = "";
	site === "shop" ? el = "#area_shop_page" : el = "#area_brand_page";
	$(el).stop().animate({scrollTop:0},500);
}

function addFavorite(url){
    if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
        window.sidebar.addPanel(document.title,url || window.location.href,'');
    } else if(window.external && ('AddFavorite' in window.external)) { // IE Favorite
        window.external.AddFavorite(url || location.href,document.title);
    } else if(window.opera && window.print) { // Opera Hotlist
        this.title=document.title;
        return true;
    } else { // webkit - safari/chrome
        alert('즐겨찾기에 추가하기위해 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D 키를 눌러주세요.');
    }
}



function alginHeightTileList(el,target, resize){
	var resizeTimer;
	var vw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
		ele = $(el),
		len = ele.length,
		bx = ele.parent();

	var list = {ele : [],height : []};
	var tLen = target ? target.length : 1;
	for(var k = 0 ; k < tLen ; k++ ){
		list.ele[k] = [],list.height[k] = [];
	}
	var pos1, pos2;
	var idx = 0;
	for(var i = 0; i < len ; i++){
		var ee = ele.eq(i);
		pos2 = parseInt(ee.offset().top);
		if((pos1 && pos1 !== pos2)){
			setHeight();
			pos2 = parseInt(ee.offset().top);
			idx = 0;
		}
		for(var m = 0 ; m < tLen ; m++ ){
			list.ele[m][idx] = target ? ee.find(target[m]) : ee;
			list.height[m][idx] = list.ele[m][idx].css('height','').height();
		}
		pos1 = pos2;
		idx++;
		if(i === (len-1))setHeight();
	}

	function setHeight(){
		for(var j = 0 ; j < tLen ; j++ ){
			var liH = Math.max.apply(null, list.height[j]); //대상들 끼리 높이 비교
			for( l = 0 ; l < idx ; l++){
				list.ele[j][l].height(liH); //대상들끼리 높이 세팅
			}
			list.ele[j] = [],list.height[j] = [];
		}
	}
	if(!resize){
		$(window).on('resize',function(){
			clearTimeout(resizeTimer);
  			resizeTimer = setTimeout(function() {
  				alginHeightTileList(el,target, 1);
  			},50)
		});
	}
}

function goLogin(){
	if(confirm("로그인을 하셔야합니다.\n로그인 페이지로 이동하시겠습니까?")){
		location.href="/login.jsp";
		return false;
	}else{
		return false;
	}
}

/*유투브 동영상 팝업*/
var videoPop = {
	show : function(o){
		var t = $("#mov_pop");
		var bx = t.find("#movFlv");
		var str = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+o.id+'?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>';
		bx.html(str);

		t.css({'display':'block'});
		this.resize({data : { t : t, rate : o.rate}});
		setTimeout(function(){
			t.addClass('on');
		},300);
		$(window).on('resize', {t : t, rate : o.rate} , videoPop.resize);
	},
	resize : function(e){
		var t = e.data.t;
		var rate = 0.5625;
		var vH = $(window).height();
		var movH =  Math.round(t.find(" > .inner > .mov_box").width()*rate);
		t.find(" > .inner > .mov_box").css("height",movH+"px");
		var bxH = t.find(" > .inner").outerHeight();
		t.find(" > .inner").css("margin-top",( bxH > vH ? $(window).scrollTop() : $(window).scrollTop()+(vH-bxH)/2 )+"px");
	},
	hide : function(){
		$("#mov_pop").removeClass('on');
		setTimeout(function(){
			$("#mov_pop").css("display","none");
			$("#movFlv>*").remove();
			$(window).off('resize', videoPop.resize);
		},400);
	},
	donotClose : function(e){
		e.stopPropagation();
	}
};

function showLoadingLayer(layer){
	layer = layer || "bx_loading_ani";
	if($("body > #"+layer).length === 0){
		$("body").append('<div id="'+layer+'" style="display:block"> <div class="bx_load"> <div class="loading_ani">loading..</div> <p>로딩중입니다. 잠시만 기다려주세요.</p> </div> </div>');
	}
	var l = $("body > #"+layer);

	setTimeout(function(){l.addClass('on');},100);
}
function hideLoadingLayer(layer){
	var l = layer ? $(layer) : $("#bx_loading_ani");
	l.removeClass('on');
	setTimeout(function(){l.css('display','none').remove();},300);
}

function alignContentHeight(){
	var site = $("#area_brand_page");
	var con = site.find("#container");
	var hd = site.find("#header_brand");
	var ft = site.find("#footer");
	function align(){con.css('min-height', $(window).height()-hd.outerHeight()-ft.outerHeight());}
	align();
	$(window).resize(align);
}

function closePopSetCookie(o){
    var expire = o.expire || 365
    $(o.chk).prop("checked") ? setCookie(o.coo,o.val,expire) : setCookie(o.coo,0,1);
    o.callback();
}

function setLocalData(o){
	if(typeof(Storage) !== "undefined") {
	    localStorage.setItem(o.name, o.data);
	} else {
	    setCookie(o.name, o.data, 1);
	}
}

function getLocalData(o){
	if(typeof(Storage) !== "undefined") {
	    return localStorage.getItem(o.name);
	} else {
	    return getCookie(o.name);
	}
}

function removeLocalData(o){
	if(typeof(Storage) !== "undefined") {
	    return localStorage.removeItem(o.name);
	} else {
		document.cookie = o.name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;' + (location.protocol == "https:") ? "secure" : "";
	}
}


function alertLayer(o){
	var str = '';
	str +='	<div class="inner">\n';
	str +='		<h2>\n';
	if(o.img){
		str +='			<img src="'+o.img+'" alt="알럿이미지" />\n';
	}
	str +='			<span>'+o.tit+'</span>\n';
	str +='		</h2>\n';
	str +='		<section>\n';
	str +='			<div class="txt">'+o.txt+'</div>\n';
	str +='			<div class="btn"><button class="close_btn">닫기</button></div>\n';
	str +='		</section>\n';
	str +='	</div>\n';

	var div = document.createElement('div');
	div.className = 'pop_type1 custom_alert';
	var $div = $(div);
	$div.html(str);
	$('body').append($div);
	popFn.show($div);
	$div.find('.close_btn').click(function(){
		popFn.hide($div);
		setTimeout(function(){$div.remove()},500);
	});
}

/*input only number*/

function onlyNumber(obj, limit){
    // Allow: backspace, delete, tab, escape, enter and .
	var e = event;
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
         // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
         // Allow: Ctrl+C
        (e.keyCode == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (e.keyCode == 86 && e.ctrlKey === true) ||
         // Allow: Ctrl+X
        (e.keyCode == 88 && e.ctrlKey === true) ||
        // Allow: Ctrl+Z
        (e.keyCode == 90 && e.ctrlKey === true) ||
         // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
             // let it happen, don't do anything
             return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
    // 한글입력 방지
    obj.value = obj.value.replace( /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');

    if(limit != undefined){
    	if(obj.value.length >= limit) e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
}
