/*
 * jQuery flextextSlider v1.4
 * http://flextext.madebymufffin.com
 *
 * Copyright 2011, Tyler Smith
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * TouchWipe gesture credits: http://www.netcu.de/jquery-touchwipe-iphone-ipad-library
 */

jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

(function ($) {
  $.fn.extend({
    flextextslider: function(options) {
      //Plugin options and their default values
      var defaults = {
        animation: "fade",              //Select your animation type (fade/slide/show)
        slideshow: true,                //Should the slider animate automatically by default? (true/false)
        slideshowSpeed: 7000,           //Set the speed of the slideshow cycling, in milliseconds
        animationDuration: 500,         //Set the speed of animations, in milliseconds
        directionNav: true,             //Create navigation for previous/next navigation? (true/false)
        controlNav: true,               //Create navigation for paging control of each clide? (true/false)
        keyboardNav: true,              //Allow for keyboard navigation using left/right keys (true/false)
        touchSwipe: true,               //Touch swipe gestures for left/right slide navigation (true/false)
        prevText: "Previous",           //Set the text for the "previous" directionNav item
        nextText: "Next",               //Set the text for the "next" directionNav item
        randomize: false,               //Randomize slide order on page load? (true/false)
        slideToStart: 0,                //The slide that the slider should start on. Array notation (0 = first slide)
        pauseOnAction: true,            //Pause the slideshow when interacting with control elements, highly recommended. (true/false)
        pauseOnHover: false,            //Pause the slideshow when hovering over slider, then resume when no longer hovering (true/false)
        controlsContainer: "",          //Advanced property: Can declare which container the navigation elements should be appended too. Default container is the flextextSlider element. Example use would be ".flextextslider-container", "#container", etc. If the given element is not found, the default action will be taken.
        manualControls: ""              //Advanced property: Can declare custom control navigation. Example would be ".flextext-control-nav" or "#tabs-nav", etc. The number of elements in your controlNav should match the number of slides/tabs (obviously).
			}
			
			//Get slider, slides, and other useful variables
			var options =  $.extend(defaults, options),
			    slider = this,
			    container = $('.slides-text', slider),
			    slides = $('.slides-text li', slider),
			    length = slides.length;
			    ANIMATING = false,
          currentSlide = options.slideToStart;
      
      
      ///////////////////////////////////////////////////////////////////
      // flextextSLIDER: RANDOMIZE SLIDES
      if (options.randomize && length > 1) {
        slides.sort(function() { return (Math.round(Math.random())-0.5); });
        container.empty().append(slides);
      }
      ///////////////////////////////////////////////////////////////////
      
      
      //Slider animation initialize
      if (options.animation.toLowerCase() == "slide" && length > 1) {
        slider.css({"overflow": "hidden"});
        
        container.append(slides.filter(':first').clone().addClass('clone')).prepend(slides.filter(':last').clone().addClass('clone'));
        container.width(((length + 2) * slider.width()) + 2000); //extra width to account for quirks
        
        //Timeout function to give browser enough time to get proper width initially
        var newSlides = $('.slides-text li', slider);
        setTimeout(function() {
          newSlides.width(slider.width()).css({"float": "left"}).show();
        }, 100);

        container.css({"marginLeft": (-1 * (currentSlide + 1))* slider.width() + "px"});
        
      } else { //Default to fade
        slides.hide().eq(currentSlide).fadeIn(0).find('span:first').animate({top:0,opacity:1},options.animationDuration,'easeInOutQuint').next().delay(100).animate({top:0,opacity:1},options.animationDuration,'easeInOutQuint').next().delay(200).animate({top:0,opacity:1},options.animationDuration,'easeInOutQuint').next().delay(300).animate({top:0,opacity:1},options.animationDuration,'easeInOutQuint');
      }
      	
    	///////////////////////////////////////////////////////////////////
    	// flextextSLIDER: ANIMATION TYPE
    	function flextextAnimate(target) {
        if (!ANIMATING) {
          ANIMATING = true;
          if (options.animation.toLowerCase() == "slide") {
            if (currentSlide == 0 && target == length - 1) {
              container.animate({"marginLeft": "0px"}, options.animationDuration, function(){
        	      container.css({"marginLeft": (-1 * length) * slides.filter(':first').width() + "px"});
        	      ANIMATING = false;
        	      currentSlide = target;
        	    });
            } else if (currentSlide == length - 1 && target == 0) {
              container.animate({"marginLeft": (-1 * (length + 1)) * slides.filter(':first').width() + "px"}, options.animationDuration, function(){
        	      container.css({"marginLeft": -1 * slides.filter(':first').width() + "px"});
        	      ANIMATING = false;
        	      currentSlide = target;
        	    });
            } else {
              container.animate({"marginLeft": (-1 * (target + 1)) * slides.filter(':first').width() + "px"}, options.animationDuration, function(){
        	      ANIMATING = false;
        	      currentSlide = target;
        	    });
            }
        	} else if (options.animation.toLowerCase() == "show") {
            
            slides.eq(currentSlide).hide();
            slides.eq(target).show();
            ANIMATING = false;
            currentSlide = target;
            
        	} else { //Default to Fade
      	    slides.eq(currentSlide).find('span:first').animate({top:-600,opacity:0},options.animationDuration,'easeInOutQuint').next().delay(100).animate({top:-600,opacity:0},options.animationDuration,'easeInOutQuint').next().delay(200).animate({top:-600,opacity:0},options.animationDuration,'easeInOutQuint').next().delay(300).animate({top:-600,opacity:0},options.animationDuration,'easeInOutQuint',function(){slides.eq(currentSlide).fadeOut(0)})
			slides.eq(target).find('span:first').css({top:600,opacity:0}).next().css({top:600,opacity:0}).next().css({top:600,opacity:0}).next().css({top:600,opacity:0});
			slides.eq(target).fadeIn(0).find('span:first').delay(300).animate({top:0,opacity:1},options.animationDuration,'easeInOutQuint').next().delay(400).animate({top:0,opacity:1},options.animationDuration,'easeInOutQuint').next().delay(500).animate({top:0,opacity:1},options.animationDuration,'easeInOutQuint').next().delay(600).animate({top:0,opacity:1},options.animationDuration,'easeInOutQuint',function(){ANIMATING = false;currentSlide = target;});
			//slides.eq(currentSlide).fadeOut(options.animationDuration, function() {
//              slides.eq(target).fadeIn(options.animationDuration, function() {
//                ANIMATING = false;
//                currentSlide = target;
//              });
//              slider.css({"minHeight": "inherit"});
//            });
        	}
      	}
  	  }
    	///////////////////////////////////////////////////////////////////
    	
    	///////////////////////////////////////////////////////////////////
    	// flextextSLIDER: CONTROL NAV
      if (options.controlNav && length > 1) {
        if (options.manualControls != "" && $(options.manualControls).length > 0) {
          var controlNav = $(options.manualControls);
        } else {
          var controlNav = $('<ol class="flextext-control-nav"></ol>');
          var j = 1;
          for (var i = 0; i < length; i++) {
            controlNav.append('<li><a>' + j + '</a></li>');
            j++;
          }
          
          //extra children check for jquery 1.3.2 - Drupal 6
          if (options.controlsContainer != "" && $(options.controlsContainer).length > 0) {
            $(options.controlsContainer).append(controlNav);
          } else {
            slider.append(controlNav);
          }
          
          controlNav = $('.flextext-control-nav li a'); 
        }
        
        controlNav.eq(currentSlide).addClass('active');

        controlNav.click(function(event) {
          event.preventDefault(); 
          
          if ($(this).hasClass('active') || ANIMATING) {
            return;
          } else {

            controlNav.removeClass('active');
            $(this).addClass('active');
            
            var selected = controlNav.index($(this));
            flextextAnimate(selected);
            if (options.pauseOnAction) {
              clearInterval(animatedSlides);
            }
          }
        });
      }
      ///////////////////////////////////////////////////////////////////
      
      //////////////////////////////////////////////////////////////////
      //flextextSLIDER: DIRECTION NAV
      if (options.directionNav && length > 1) {
        //Create and append the nav
        if (options.controlsContainer != "" && $(options.controlsContainer).length > 0) {
            $(options.controlsContainer).append($('<ul class="flextext-direction-nav"><li><a class="prev" href="#"><span></span><span></span><span></span></a></li><li><a class="next" href="#"><span></span><span></span><span></span></a></li></ul>'));
          } else {
            slider.append($('<ul class="flextext-direction-nav"><li><a class="prev" href="#"><span></span><span></span><span></span></a></li><li><a class="next" href="#"><span></span><span></span><span></span></a></li></ul>'));
          }
      
      	$('.flextext-direction-nav li a').click(function(event) {
      	  event.preventDefault();
      	  if (ANIMATING) {
      	    return;
      	  } else {
        	  
        	  if ($(this).hasClass('next')) {
        	    var target = (currentSlide == length - 1) ? 0 : currentSlide + 1;
        	  } else {
        	    var target = (currentSlide == 0) ? length - 1 : currentSlide - 1;
        	  }
            
            if (options.controlNav) {
          	  controlNav.removeClass('active');
          	  controlNav.eq(target).addClass('active');
      	    }
      	    
        	  flextextAnimate(target);
        	  if (options.pauseOnAction) {
              clearInterval(animatedSlides);
            }
          }
      	});
      }
    	//////////////////////////////////////////////////////////////////

      //////////////////////////////////////////////////////////////////
      //flextextSLIDER: KEYBOARD NAV
      if (options.keyboardNav && length > 1) {
        $(document).keyup(function(event) {
          if (ANIMATING) {
            return;
          } else if (event.keyCode != 39 && event.keyCode != 37){
            return;
          } else {
            
            if (event.keyCode == 39) {
        	    var target = (currentSlide == length - 1) ? 0 : currentSlide + 1;
        	  } else if (event.keyCode == 37){
        	    var target = (currentSlide == 0) ? length - 1 : currentSlide - 1;
        	  }
      	  
        	  if (options.controlNav) {
          	  controlNav.removeClass('active');
          	  controlNav.eq(target).addClass('active');
      	    }
      	  
        	  flextextAnimate(target);
        	  if (options.pauseOnAction) {
              clearInterval(animatedSlides);
            }
          }
        });
      }
    	//////////////////////////////////////////////////////////////////
    	
    	//////////////////////////////////////////////////////////////////
      //flextextSLIDER: ANIMATION SLIDESHOW
      if (options.slideshow && length > 1) {
        var animatedSlides;
        
        function animateSlides() {
          if (ANIMATING) {
            return;
          } else {
        	  var target = (currentSlide == length - 1) ? 0 : currentSlide + 1;
      	  
        	  if (options.controlNav) {
          	  controlNav.removeClass('active');
          	  controlNav.eq(target).addClass('active');
      	    }
      	  
        	  flextextAnimate(target);
          }
        }
        
        //pauseOnHover
        if (options.pauseOnHover) {
          slider.hover(function() {
            clearInterval(animatedSlides);
          }, function() {
            animatedSlides = setInterval(animateSlides, options.slideshowSpeed);
          });
        }
        
        //Initialize animation
        if (length > 1) {
          animatedSlides = setInterval(animateSlides, options.slideshowSpeed);
        }
      }
    	//////////////////////////////////////////////////////////////////

			//////////////////////////////////////////////////////////////////
      //flextextSLIDER: TOUCHSWIPE GESTURES
      //Credit of concept: TouchSwipe - http://www.netcu.de/jquery-touchwipe-iphone-ipad-library
      if (options.touchSwipe && 'ontouchstart' in document.documentElement && length > 1) {
        slider.each(function() {
          var startX,
              min_move_x = 20;
              isMoving = false;
              
          function cancelTouch() {
            this.removeEventListener('touchmove', onTouchMove);
            startX = null;
            isMoving = false;
          }
          function onTouchMove(e) {
            if (isMoving) {
              var x = e.touches[0].pageX,
                  dx = startX - x;
            
              if(Math.abs(dx) >= min_move_x) {
                cancelTouch();
                if(dx > 0) {
                	var target = (currentSlide == length - 1) ? 0 : currentSlide + 1;
                }
                else {
                	var target = (currentSlide == 0) ? length - 1 : currentSlide - 1;
                }
            
                if (options.controlNav) {
              	  controlNav.removeClass('active');
              	  controlNav.eq(target).addClass('active');
                 }
                 
                flextextAnimate(target);
                if (options.pauseOnAction) {
                  clearInterval(animatedSlides);
                }
              }
            }
          }
          function onTouchStart(e) { 
            if (e.touches.length == 1) {
              startX = e.touches[0].pageX;
              isMoving = true;
              this.addEventListener('touchmove', onTouchMove, false);
            }
          }   
          if ('ontouchstart' in document.documentElement) {
            this.addEventListener('touchstart', onTouchStart, false);
          }
        });
      }
    	//////////////////////////////////////////////////////////////////
    	
    	//////////////////////////////////////////////////////////////////
      //flextextSLIDER: RESIZE FUNCTIONS (If necessary)
      if (options.animation.toLowerCase() == "slide" && length > 1) {
        var sliderTimer;
        $(window).resize(function(){
          newSlides.width(slider.width());
          //clones.width(slider.width());
          container.width(((length + 2) * slider.width()) + 2000); //extra width to account for quirks
          
          //slider resize reset
          clearTimeout(sliderTimer);
          sliderTimer = setTimeout(function(){
            flextextAnimate(currentSlide);
          }, 300);
        });
      }
      //////////////////////////////////////////////////////////////////
	  }
  });
  
})(jQuery);