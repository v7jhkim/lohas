(function($){
	$.fn.motionj_fadeBanner = function(o){
		o = $.extend({

			height: 300,
			speed : 1000,
			delay : 6000
		}, o || {});

		return this.each(function(){
			var e = $(this);
			var n_h = e.find('p').height();
			var pause = false;
			var no = 1, ext;
			var len = e.find('ul li').length-1;
			var replace_img = function(o, s, ext){
				if(s) o.attr('src', o.attr('src').replace('off.'+ext, 'on.'+ext));
				else o.attr('src', o.attr('src').replace('on.'+ext, 'off.'+ext));
			}
			var find_ext = function(imgE){
				var xt = imgE.find('img').attr('src').lastIndexOf('.') + 1;
				xt = imgE.find('img').attr('src').substr(xt);
				return xt;
			}
			e.css({
				position : 'relative',
				overflow : 'hidden',
				width : o.width
				
			}).find('ul').css({
				position : 'relative',
				'z-index' : 0,
				height : o.height
			}).find('li').css({
				position : 'absolute'
			});
			e.find('ul li:not(:eq(0))').hide();
			e.find('p').css({
				position : 'relative',
				'z-index' : 1

			}).find('span').css( 'margin-right' , '10px');
			e.find('ul li:eq(0)').addClass('on');
			e.find('p span:eq(0)').addClass('on');
			ext = find_ext(e.find('p span'));
			replace_img(e.find('p span:eq(0)').find('img'), true, ext);
			
			var ani = function(num, m, t){
				if(!e.find('p span:eq(' + num + ')').hasClass('on')){
					if( t =="prev" ){
						var index = e.find('p span.on').index();
						num =  index -1;
						if(num < 0) num = len; 
						else{ no = num; no--; }
					}else if( t =="next" ){
						var index = e.find('p span.on').index();
						num =  index +1;
						if(num > len) num = 0; 
						else{ no = num; no++; }	
					}else{
						if(num >= len) no = 0; 
						else{ no = num; no++; }	
					}		

					if(e.find('p span.on').length > 0){
						ext = find_ext(e.find('p span.on'));
						replace_img(e.find('p span.on').find('img'), false, ext);
						e.find('p span.on').removeClass('on');
					}
					e.find('p span:eq(' + num + ')').addClass('on');
					ext = find_ext(e.find('p span:eq(' + num + ')'));
					replace_img(e.find('p span:eq(' + num + ')').find('img'), true, ext);
					if(m){
						e.find('ul li').fadeOut(1000);
						e.find('ul li').removeClass('on');
						e.find('ul li:eq(' + num + ')').queue( function(){
							$(this).addClass('on');
							$(this).clearQueue();
							$(this).fadeIn(1000);
						});
					}else{
						e.find('ul li.on').fadeOut(o.speed);
						e.find('ul li.on').removeClass('on');
						e.find('ul li:eq(' + num + ')').fadeIn(o.speed);
						e.find('ul li:eq(' + num + ')').addClass('on');
					}


				}
			}
			e.find('p span').each(function(i){
				$(this).click( function(){
					ani(i, true);
				});
			});

			

			e.click( function(){ pause = true; }).mouseleave( function(){ pause = false; });
			//e.find("input").mouseover( function(){ pause = true; }).mouseleave( function(){ pause = false; });

			
		
			function play(){
			timer = setInterval(function(){ if(pause == false) ani(no, false); }, o.delay);
			}

			function stop(){
			clearInterval(timer)
			}

			play();
		});
		
	}
})(jQuery);

$(function(){	
	$("a.img_on").each(function(){
		var image = $(this).children("img");
		var imgsrc = $(image).attr("src");
	
		$(this).mouseenter(function(){
			var on =imgsrc.replace("_off", "_on");
			$(image).attr("src", on); 
		});
		
		$(this).mouseleave(function(){
			var off =imgsrc.replace("_on", "_off");
			$(image).attr("src", off); 
		});	
	});	
});//function