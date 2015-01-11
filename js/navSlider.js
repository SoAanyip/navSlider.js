/**
 *	navSlider.js v0.2.0
 *	author by So Aanyip
 *  10th Jan 2015
 */
(function($){
	"use strict";
	$.fn.extend({
		slider: function(direct,index,speed){
			if(this.length)	createSlider(this,direct,index,speed);
			return this;

			/**
			 * 创建和初始化滑块
			 * @param  {jQuery Object} $nav 菜单对象
			 * @param  {String} direct 滑块移动方向
			 * @param  {number} index  滑块起始位置	
			 * @param  {number || string} speed  滑块移动速度
			 */
			function createSlider($nav,direct,index,speed){
				/*初始化要用的数据，检测用户输入*/
				var $li = $nav.children('li');
				if(direct !== 'left' && direct !== 'top') direct='left';
				index = index || 0;
				if(index>$li.length || index<0) index=0;

				if(!speed) speed='fast';
				else if(Number(speed)){
					if(speed<=0) speed=100;
					else speed=Number(speed);
				}else{
					if(speed === 'fast' || speed === 'normal' || speed === 'slow') ;
					else speed='fast';
				}

				$nav.css('position','relative');
				$nav.attr('data-index',index);
				/*创建slider*/
				var id='"'+'slider'+($('.navSlider').length+1) + '"';
				var slider = '<div id='+id+' class="navSlider"></div>';
				var $slider = $(slider);

				/*初始化slider的css属性*/
				if(direct === 'left'){
		            $slider.css('left',getGap('left',index,$li)+'px')
		            .css('top',getOppo('left',$li.eq(index)));
				}else{
		            $slider.css('top',getGap('top',index,$li)+'px')
		            .css('left',getOppo('top',$li.eq(index)));
				}
				$slider.css('width',getSize('width',$li.eq(index)))
				.css('height',getSize('height',$li.eq(index)))
				.css('border-radius',$li.eq(index).css('border-top-left-radius'))
				.css('position','absolute')
				.css('z-index','-100');
				$slider.appendTo($nav);

				/*通过点击切换data-index*/
				$nav.on('click','li',function(ev){
					for(var i=0;i<$li.length;i++){
						if(this === $li[i]){
							$nav.data('index',i);
						}
					}
				})

				/*mouseover时调用动画方法*/
				$nav.on('mouseover','li',function(ev){
					var index = $nav.data('index');

					for(var i=0;i<$li.length;i++){
				        if(this === $li[i]){
				        	if(index === i) return;
				        	slide($slider,$li,i,direct,speed);
				        }
				    }
				})
				/*mouseout时调用动画方法*/
				$nav.on('mouseout','li',function(ev){
					var index = $nav.data('index');
					for(var i=0;i<$li.length;i++){
				        if(this === $li[index]){
				        	return;
				        }
				    }
				    slide($slider,$li,index,direct,speed);
				})

			}

			/**
			 * 滑块动画方法
			 * @param  {jQuery Object} $slider 滑块
			 * @param  {jQuery Object} $li     这个nav的子元素集合
			 * @param  {number} index   移动目标的index
			 * @param  {string} direct  滑块移动的方向
			 * @param  {number || string} speed   滑块移动速度
			 */
			function slide($slider,$li,index,direct,speed){
				if(direct === 'left'){
		            $slider.stop().animate({
		            	'left': getGap('left',index,$li)+'px',
		            	'width': getSize('width',$li.eq(index)),
						'height': getSize('height',$li.eq(index)),
						'border-radius':$li.eq(index).css('border-top-left-radius'),
						'top':getOppo('left',$li.eq(index))
		            },speed)
	        	}else{
		            $slider.stop().animate({
		            	'top':getGap('top',index,$li)+'px',
		            	'width': getSize('width',$li.eq(index)),
						'height': getSize('height',$li.eq(index)),
						'border-radius':$li.eq(index).css('border-top-left-radius'),
						'left':getOppo('top',$li.eq(index))
		            },speed)
	        	}
			}
			/**
			 * 获取当前选项卡的宽或者高
			 * @param  {string} name 'width' || 'height'
			 * @param  {jQuery Object} $li  当前选项卡
			 * @return {String}      带单位的长度
			 */
			function getSize(name,$li){
				var len = 0;
				if(name === 'width'){
					len=$li.width()+parseInt($li.css('padding-left'))+parseInt($li.css('padding-right'));
				}else{
					len=$li.height()+parseInt($li.css('padding-top'))+parseInt($li.css('padding-bottom'));
				}
				len+='px';
				return len;
			}
			/**
			 * 获取当前选项卡的反向的宽或者高
			 * @param  {string} direct 'left' || 'top'
			 * @param  {jQuery Object} $li  当前选项卡
			 * @return {number}      长度
			 */
			function getOppo(direct,$li){
				var gap=0;
				if(direct === 'left'){
					gap=parseInt($li.css('border-top-width'))+parseInt($li.css('margin-top'));
				}else if(direct === 'top'){
					gap=parseInt($li.css('border-left-width'))+parseInt($li.css('margin-left'));
				}
				return gap;
			}
			/**
			 * 获取滑块移动距离
			 * @param  {String} direct 'left' || 'top'
			 * @param  {number} index   移动目标的index
			 * @param  {jQuery Object} $li     这个nav的子元素集合
			 * @return {number}      长度
			 */
			function getGap(direct,index,$li){
				var gap = 0;
				if(direct === 'left'){
					for(var j=0;j<index;j++){
						gap+=parseInt($li.eq(j).css('margin-left'));
						gap+=parseInt($li.eq(j).css('border-left-width'));
						gap+=parseInt($li.eq(j).css('padding-left'));
						gap+= $li.eq(j).width();
						gap+= parseInt($li.eq(j).css('padding-right'));
						gap+= parseInt($li.eq(j).css('border-right-width'));
						gap+=parseInt($li.eq(j).css('margin-right'));
			        }
			        gap+=parseInt($li.eq(index).css('margin-left'));
			        gap+= parseInt($li.eq(index).css('border-left-width'));
		        }else{
					for(var j=0;j<index;j++){
						gap+=parseInt($li.eq(j).css('border-top-width'));
						gap+=parseInt($li.eq(j).css('padding-top'));
						gap+= $li.eq(j).height();
						gap+=parseInt($li.eq(j).css('padding-bottom'));
						gap+=parseInt($li.eq(j).css('border-bottom-width'));
						if(j<index){
							var nextMarTop = parseInt($li.eq(j+1).css('margin-top')),
								thisMarBtm = parseInt($li.eq(j).css('margin-bottom'));
							nextMarTop>thisMarBtm? gap+=nextMarTop : gap+=thisMarBtm;
						}
			        }
			        gap+= parseInt($li.eq(index).css('border-top-width'));
		        }
		        return gap;
			}

		}
	});
})(jQuery);