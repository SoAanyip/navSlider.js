/**
 *	navSlider.js v0.1
 *	author by So Aanyip
 *  11/26 2014
 */
(function($){
	$.fn.extend({
		slider: function(direct,index,speed){
			if(this.length)	createSlider(this,direct,index,speed);
			return this;

			function createSlider($nav,direct,index,speed){
				var id='"'+'slider'+($('.navSlider').length+1) + '"';
				var slider = '<div id='+id+' class="navSlider"></div>';
				var $li = $nav.children();
				if(direct !== 'left' && direct !== 'top') direct='left';
				index = index || 0;
				if(index>$li.length) index=0;
				$nav.attr('data-index',index);

				$(slider).css('height',$li.height()+parseInt($li.css('padding-top'))+parseInt($li.css('padding-bottom'))+'px')
				.css('width',$li.width()+parseInt($li.css('padding-left'))+parseInt($li.css('padding-right'))+'px')
				.css('top',parseInt($li.css('border-top-width'))+parseInt($li.css('margin-top'))+'px')
				.css('left',parseInt($li.css('border-left-width'))+parseInt($li.css('margin-left'))+'px')
				.css('position','absolute').css('z-index','-100')
				.appendTo($nav);
				slider = $li.siblings('.navSlider');

				if(direct==='top'){
					$(slider).css('top',$li.css('border-top-width'));
					if(parseInt($nav.css('mpadding-top'))>0){
						$nav.css('overflow','hidden');
					}
				}
				if(index!=0){
					var gap = getGap(direct,index,$li);
					slider.css(direct,gap);
				}
				$li.mouseover(function(){
					for(var i=0;i<$li.length;i++){
						if(this === $li[i]){
							var gap = 0;
							gap = getGap(direct,i,$li);
							slide(slider,direct,gap,speed);
						}
					}
				});
				$li.mouseout(function(){
					var index = $nav.data('index');
					var gap = 0;
					gap=getGap(direct,index,$li);
					slide(slider,direct,gap,speed);
				});
				$li.click(function(){
					for(var i=0;i<$li.length;i++){
						if(this === $li[i]){
							$nav.data('index',i);
						}
					}
				});
				return slider;
			}

			function slide(slider,direct,gap,speed){
				if(!speed) speed='fast';
				else if(Number(speed)){
					if(speed<=0) speed=100;
					else speed=Number(speed);
				}else{
					if(speed === 'fast' || speed === 'normal' || speed === 'slow') ;
					else speed='fast';
				}
				if(direct === 'left'){
					slider.stop().animate({
						left: gap + 'px'
					},speed);
				}else if(direct === 'top'){
					slider.stop().animate({
						top: gap + 'px'
					},speed);
				}
			}

			function getGap(direct,index,$li){
				var firstGap,lastGap;
				if(direct === 'left'){
					firstGap = 'left';
					lastGap = 'right';
				}else if(direct === 'top'){
					firstGap = 'top';
					lastGap = 'bottom';
				}
				var gap = 0;
				for(var j=0;j<index;j++){
					gap+=parseInt($($li[j]).css('border-'+firstGap+'-width'));
					gap+=parseInt($($li[j]).css('padding-'+firstGap));
					if(direct === 'left'){
						gap+=parseInt($($li[j]).css('margin-'+firstGap));
						gap+=$($li[j]).width();
						gap+=parseInt($($li[j]).css('margin-'+lastGap));
					}
					if(direct === 'top'){
						gap+=$($li[j]).height();
						parseInt($($li[j]).css('margin-'+firstGap))>parseInt($($li[j]).css('margin-'+lastGap))? gap+=parseInt($($li[j]).css('margin-'+firstGap)):gap+=parseInt($($li[j]).css('margin-'+lastGap));
					}
					gap+=parseInt($($li[j]).css('padding-'+lastGap));
					gap+=parseInt($($li[j]).css('border-'+lastGap+'-width'));

				}
				if(direct === 'left') gap+=parseInt($($li[j]).css('margin-'+firstGap));
				gap+=parseInt($($li[index]).css('border-'+firstGap+'-width'));
				return gap;
			}
		}
	});
})(jQuery);