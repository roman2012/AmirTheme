/*!
 * Imagebox • JavaScript Application
 * Version 2.0.0
 * http://codecanyon.net/item/imagebox-image-viewing-script/89035
 *
 * imagebox.js
 *
 * Copyright (c) 2009-2012, Sarathi Hansen
 *
 *
 * NOTES
 *
 * This file should be used for development of imagebox.
 * For production, please use the compressed 'imagebox.min.js'
 * as its file size is much smaller.
 */

// create the imagebox object if it doesn't already exist
var imagebox = imagebox || { galleries: {} };

// wrapper
(function() {



//----------------------------------------------------
// 1. | Public Imagebox Object - Methods
//----------------------------------------------------

/*
 * Builds the imagebox cache
 *
 * @param		options		options you want to set for imagebox
 * @return		void
 */
imagebox.build = function(options) {
	
	var anchors = document.body.getElementsByTagName('a');
	var rel, m, a, key;
	
	if(!options){ options = {}; }
	for(key in _defaultOptions){ _globalOptions[key] = options.hasOwnProperty(key)? options[key] : _defaultOptions[key]; }
	
	// find and cache all images that are setup to open in Imagebox
	var i = anchors.length;
	while(i--) {
		
		a   = anchors[i];
		rel = a.getAttribute('rel');
		
		if(/^(image|light)box/i.test(rel)) {
			
			var loader = new Image();
			loader.src = a.getAttribute('href');
			loader.imageDoesNotExist = false;
			loader.onerror = function(){ this.imageDoesNotExist = true; };
			
			m = rel.match(/^(?:image|light)box\[(.*?)\]/i);
			
			a.imagebox = {
				
				image: a.getElementsByTagName('img').length? a.getElementsByTagName('img')[0] : { width: 0, height: 0, ib_noImgTag: true },
				loader: loader,
				title: a.getAttribute('title'),
				gallery: m? m[1] : null,
				options: null
			};
			
			if(m = rel.match(/\{(.+?)\}$/)) a.imagebox.options = new Function('return {' + m[1] + '}')();
			
			if(_globalOptions.noTrigger || (a.imagebox.options && a.imagebox.options.noTrigger)) {
				
				a.className += ' ib-notrigger';
				a.onclick = function() {
					
					if(window.event) window.event.returnValue = false;
					return false;
				};
				
			} else {
				
				a.onclick = function() {
					
					open(this, true);
					
					if(window.event) window.event.returnValue = false;
					return false;
				};
			}
			
			a.removeAttribute('title');
			cache.push(a);
		}
	}
	
	// create the overlay
	domOverlay = document.createElement('div');
	domOverlay.setAttribute('id', 'ib-overlay');
	if(_globalOptions.clickOverlayToClose) domOverlay.onclick = close;
	document.body.appendChild(domOverlay);
	
	// create the keyboard controls and scrolling into view features
	createKeyboardControls();
	window.onscroll = updateLocation;
	window.onresize = updateLocation;
}

/*
 * Opens a cached thumbnail in imagebox
 *
 * @param		anchor		an anchor element that has been chached in imagebox
 * @return		void
 */
imagebox.open = function(anchor) { open(anchor, true); }

/*
 * Jumps to a chosen image in the current gallery
 *
 * @param		index		the index of the image in the gallery to jump to
 * @return		void
 */
imagebox.jumpto = function(index) {
	
	if(index === null || !gallery[index] || _isAnimating || !document.getElementById('ib-container')) return;
	
	current = index;
	open(gallery[current]);
}

/*
 * Creates a gallery
 *
 * @param		id			the gallery's ID (used in the rel attribute of the image)
 * @param		name		the gallery's name (shown when the gallery is open)
 * @param		options		options that will apply to all images in the gallery
 * @return		void
 */
imagebox.creategallery = function(id, name, options) {
	
	imagebox.galleries[id] = {
		
		id:      id,
		name:    name,
		options: options || {}
	};
}








//----------------------------------------------------
// 2. | Variables
//----------------------------------------------------

var domContainer, domTitle, domClose, domNext, domPrev, domOverlay, domImage;
var thumbA, thumbImg, thumbWidth, thumbHeight;
var _newLeft, _newTop, _newWidth, _newHeight;
var _showNext, _showPrev;

var _updateTimer;

var _isAnimating    = false;
var _hasTitle       = false;

var cache           = [];
var gallery         = [];
var current         = -1;

var        _options = {};
var  _globalOptions = {};
var _defaultOptions = {
	
	zoomDuration        : 300,
	resizeDuration      : 300,
	fadeDuration        : 400,
	slideDuration       : 300,
	
	animation           : 'zoom',
	
	galleryTitle        : '%CURRENT% / %TOTAL%',
	continuousGalleries : false,
	
	overlayOpacity      : 0.8,
	clickOverlayToClose : true,
	
	noTrigger           : false,
	viewportPadding     : 40,
	
	showShadow          : false,
	className           : null,
	keyboardControls    : true
};

var _isIE            = /msie/i.test(navigator.userAgent);
var hasComputedStyle = document.defaultView && document.defaultView.getComputedStyle;
var shdwDirs         = ['n','e','s','w','nw','ne','se','sw'];





//----------------------------------------------------
// 3. | Core Imagebox Functions
//----------------------------------------------------

/*
 * Finds all images that are in the same gallery as the current image
 *
 * @param		anchor		the current anchor tag being shown in imagebox
 * @return		void
 */
function populateGallery(anchor) {
	
	if(!anchor.imagebox.gallery) {
		
		gallery = [anchor];
		current = 0;
		
	} else {
		
		gallery = [];
		var i = cache.length, n = 0;
		while(i--) {
			
			if(cache[i].imagebox.gallery && cache[i].imagebox.gallery === anchor.imagebox.gallery) {
				
				gallery.push(cache[i]);
				if(cache[i] === anchor) { current = n; }
				n++;
			}
		}
	}
}

/*
 * Open the next image in the gallery
 *
 * @return		void
 */
function next() {
	
	imagebox.jumpto(
		
		// wrap to beginning
		_options.continuousGalleries && current === gallery.length-1? 0:
		// next image
		current < gallery.length? current+1:
		// don't jump
		null
	);
}

/*
 * Open the previous image in the gallery
 *
 * @return		void
 */
function prev() {
	
	imagebox.jumpto(
		
		// wrap to end
		_options.continuousGalleries && current === 0? gallery.length-1:
		// previous image
		current > 0? current-1:
		// don't jump
		null
	);
}

/*
 * Set the size and position of the imagebox domContainer
 *
 * @param		l			the left position of the domContainer
 * @param		t			the top position of the domContainer
 * @param		w			the width of the domContainer
 * @param		h			the height of the domContainer
 * @return		void
 */
function setSize(l, t, w, h) {
	
	if(l){ domContainer.style.left   = l + 'px'; }
	if(t){ domContainer.style.top    = t + 'px'; }
	if(w){ domContainer.style.width  = w + 'px'; }
	if(h){ domContainer.style.height = h + 'px'; }
}

function setDimensions() {
	
	if(thumbA.imagebox.loader.imageDoesNotExist) {
		
		_newWidth  = 400;
		_newHeight = 300;
		
	} else {
		
		_newWidth  = thumbA.imagebox.loader.width;
		_newHeight = thumbA.imagebox.loader.height;
	}
	
	var size = getPageSize();
	if(_newWidth > size.width-(_options.viewportPadding*2) || _newHeight > size.height-(_options.viewportPadding*2)) {
		
		var newSize = proportionalResize(_newWidth, _newHeight, size.width-(_options.viewportPadding*3), size.height-(_options.viewportPadding*3));
		_newWidth   = newSize.width;
		_newHeight  = newSize.height;
	}
}

/*
 * Set the new left and top positions that imagebox will move to
 *
 * @return		void
 */
function setNewPosition() {
	
	var scroll = getPageScroll();
	var size   = getPageSize();
	
	var oldWidth  = domContainer.style.width;
	var oldHeight = domContainer.style.height;
	
	setSize(null, null, _newWidth, _newHeight);
	domTitle.style.display = 'block';
	
	_newLeft = Math.round(Math.max((size.width/2)  - (_newWidth/2) + scroll.x, scroll.x + _options.viewportPadding));
	_newTop  = Math.round(Math.max((size.height/2) - ((_newHeight  + domTitle.offsetHeight)/2) + scroll.y, scroll.y + _options.viewportPadding));
	
	domContainer.style.width  = oldWidth;
	domContainer.style.height = oldHeight;
	domTitle.style.display = 'none';
}

/*
 * Set imagebox's title
 *
 * @param		newTitle	imagebox's new title
 * @return		void
 */
function setTitle(newTitle) {
	
	_hasTitle = newTitle? true : false;
	
	if(thumbA.imagebox.gallery) {
		
		var text = _hasTitle? newTitle : '';
		text += '<div id="ib-gallery-title"' + (_hasTitle? ' class="ib-hastitle"' : '') + '">';
			
			text += _options.galleryTitle
				.replace(/ /g, '&nbsp;')
				.replace(/%CURRENT%/, current+1)
				.replace(/%TOTAL%/, gallery.length)
				.replace(/%GALLERY%/, imagebox.galleries.hasOwnProperty(thumbA.imagebox.gallery)? imagebox.galleries[thumbA.imagebox.gallery].name : thumbA.imagebox.gallery);
			
			if(_options.galleryTitle.indexOf('%LIST%') != -1) {
				
				var list = '<span id="ib-gallery-list">';
				var i = -1, len = gallery.length-1;
				while(i++ < len) {
					
					list += (i === current? '<strong>' + (i+1) + '</strong>' : '<a onclick="imagebox.jumpto('+i+')">' + (i+1) + '</a>') + '<wbr/>';
				}
				list += '</span>';
				text = text.replace(/%LIST%/, list);
			}
			
		text += '</div>';
		
		domTitle.innerHTML = text;
		_hasTitle = true;
		
	}
	
	else if(newTitle) domTitle.innerHTML = newTitle;	
}

/*
 * Shows the navigation buttons (next, prev)
 * if the current image needs them
 *
 * @return		void
 */
function toggleNavigation() {
	
	_showNext = false;
	_showPrev = false;
	
	if(thumbA.imagebox.gallery) {
		
		if(_options.continuousGalleries) {
			
			_showNext = true;
			_showPrev = true;
			
		} else {
			
			if(gallery[current+1]) _showNext = true;
			if(gallery[current-1]) _showPrev = true;
		}
	}
	
	domNext.style.display = _showNext? 'block' : 'none';
	domPrev.style.display = _showPrev? 'block' : 'none';
}

/*
 * Creates the elements that make up imagebox and inserts them into the dom
 *
 * @return		void
 */
function create() {
	
	domContainer  = addElement('div', document.body, 'ib-container');
	domImage      = addElement('img', domContainer,  'ib-image');
	
	var titleMask = addElement('div', domContainer,  'ib-title-mask');
	domTitle      = addElement('div', titleMask,     'ib-title');
	
	domClose      = addElement('div', domContainer,  'ib-close', close);
	domNext       = addElement('div', domContainer,  'ib-next',  next);
	domPrev       = addElement('div', domContainer,  'ib-prev',  prev);
	
	domNext.innerHTML = domPrev.innerHTML = '<div></div>';
	
	if(_options.showShadow) {
		
		var i = 8;
		while(i--) addElement('div', domContainer, 'ib-'+shdwDirs[i], null, 'ib-shadow');
	}
}





//----------------------------------------------------
// 4. | Open / Change / Close
//----------------------------------------------------

/*
 * Opens a cached image in imagebox
 *
 * @param		anchor			the anchor element that has been chached
 * @param		resetGallery	whether or not to repopulate the gallery
 * @return		void
 */
function open(anchor, resetGallery) {
	
	if(_isAnimating) return;
	if(resetGallery) { populateGallery(anchor); }
	
	for(var key in _globalOptions) {
		
		_options[key] = anchor.imagebox.options && anchor.imagebox.options.hasOwnProperty(key)? anchor.imagebox.options[key]:
						imagebox.galleries.hasOwnProperty(anchor.imagebox.gallery) && imagebox.galleries[anchor.imagebox.gallery].options && imagebox.galleries[anchor.imagebox.gallery].options.hasOwnProperty(key)? imagebox.galleries[anchor.imagebox.gallery].options[key]:
						_globalOptions[key];
	}
	
	domOverlay.style.display = 'block';
	
	thumbA      = anchor;
	thumbImg    = anchor.imagebox.image;
	
	thumbWidth  = thumbImg.width;
	thumbHeight = thumbImg.height;
	
	setDimensions();
	_isAnimating = true;
	
	if(!document.getElementById('ib-container')) {
		
		create();
		
		setTitle(anchor.imagebox.title);
		setNewPosition();
		
		var offset = getElementOffset(thumbImg);
		setSize(offset.left, offset.top, thumbWidth, thumbHeight);
		
		domImage.setAttribute('src', anchor.getAttribute('href'));
		
		animateOpacity(domOverlay, _options.overlayOpacity, _options.fadeDuration, function(){ setTimeout(startOpeningAnimations, 100); });
		
	} else {
		
		domNext.style.display = 'none';
		domPrev.style.display = 'none';
		
		if(_hasTitle)
			animateTitle(-domTitle.offsetHeight - css(domTitle, 'margin-top'), startChangingAnimations);
			
		else startChangingAnimations();
	}
}
function startOpeningAnimations() {
	
	setOpacity(domContainer, 0);
	domContainer.style.display = 'block';
	
	var visible = css(thumbA, 'display', false) != 'none' && !thumbImg.ib_noImgTag;
	if(_options.animation == 'zoom' && visible) {
		
		animateOpacity(domContainer, 1, Math.floor(_options.zoomDuration*0.5));
		animateZoom(_options.zoomDuration, afterOpeningAnimations);
		
	} else if(_options.animation == 'fade' || !visible) {
		
		setSize(_newLeft, _newTop, _newWidth, _newHeight);
		animateOpacity(domContainer, 1, _options.fadeDuration, afterOpeningAnimations);
	}
}
function afterOpeningAnimations() {
	
	domClose.style.visibility = 'visible';
	if(!_isIE) {
		
		setOpacity(domClose, 0);
		animateOpacity(domClose, 1, _options.fadeDuration);
	}
	
	domTitle.style.display = 'block';
	domTitle.style.top = (-domTitle.offsetHeight - css(domTitle, 'margin-top')) + 'px';
	
	if(_hasTitle) {
		
		animateTitle(0, function(){ _isAnimating = false; });
		
	} else {
		
		domTitle.style.display = 'none';
		_isAnimating = false;
	}
	
	toggleNavigation();
}

/*
 * Changes the image in imagebox
 *
 * @return		void
 */
function change() {
	
	domImage.style.display = 'none';
	setTitle(thumbA.imagebox.title);
	
	setNewPosition();
	
	var style = domContainer.style;
	if(parseFloat(style.left)   == _newLeft  &&
	   parseFloat(style.top)    == _newTop   &&
	   parseFloat(style.width)  == _newWidth &&
	   parseFloat(style.height) == _newHeight) {
		
		setTimeout(afterChangingAnimations, 200);
		
	} else {
		
		animateZoom(_options.resizeDuration, afterChangingAnimations);
	}
}
function startChangingAnimations() {
	
	if(_options.className) domContainer.className = _options.className;
	
	domTitle.style.display = 'none';
	
	if(_isIE) {
		
		domClose.style.visibility = 'hidden';
		
	} else {
		
		animateOpacity(domClose, 0, _options.fadeDuration);
	}
	
	animateOpacity(domImage, 0, _options.fadeDuration, change);
}
function afterChangingAnimations() {
	
	domImage.setAttribute('src', thumbA.getAttribute('href'));
	domImage.style.display = 'block';
	
	if(_isIE) {
		
		domClose.style.visibility = 'visible';
		
	} else {
		
		animateOpacity(domClose, 1, _options.fadeDuration);
	}
	
	animateOpacity(domImage, 1, _options.fadeDuration, function() {
		
		if(_hasTitle) {
			
			domTitle.style.display = 'block';
			domTitle.style.top = (-domTitle.offsetHeight - css(domTitle, 'margin-top')) + 'px';
			animateTitle(0, function(){ _isAnimating = false; });
			
		} else {
			
			_isAnimating = false;
		}
		
		
		toggleNavigation();
	});
}

/*
 * Closes imagebox
 *
 * @return		void
 */
function close() {
	
	if(_isAnimating) return;
	
	clearInterval(_updateTimer);
	
	domContainer.removeChild(domClose);
	domContainer.removeChild(domNext);
	domContainer.removeChild(domPrev);
	
	var offset = getElementOffset(thumbImg);
	
	_newLeft   = offset.left;
	_newTop    = offset.top;
	_newWidth  = thumbImg.width;
	_newHeight = thumbImg.height;
	
	_isAnimating = true;
	
	if(_hasTitle) {
		
		animateTitle(-domTitle.offsetHeight - css(domTitle, 'margin-top'), startClosingAnimations);
		
	} else {
		
		startClosingAnimations();
	}
}
function startClosingAnimations() {
	
	domTitle.style.display = 'none';
	
	var visible = css(thumbA, 'display', false) != 'none' && !thumbImg.ib_noImgTag;
	if(_options.animation == 'zoom' && visible) {
		
		setTimeout(function(){ animateOpacity(domContainer, 0, Math.floor(_options.zoomDuration*0.5)); },
			_options.zoomDuration - Math.floor(_options.zoomDuration*0.5));
		animateZoom(_options.zoomDuration, afterClosingAnimations);
		
	} else if(_options.animation == 'fade' || !visible) {
		
		animateOpacity(domContainer, 0, _options.fadeDuration, afterClosingAnimations);
	}
}
function afterClosingAnimations() {
	
	document.body.removeChild(domContainer);
	animateOpacity(domOverlay, 0, _options.fadeDuration, function() {
		
		domOverlay.style.display = 'none';
		_isAnimating = false;
	});
}





//----------------------------------------------------
// 5. | Helper Functions
//----------------------------------------------------

/*
 * Gets the scroll position and size of the page
 */
function getPageScroll() {
	
	var posx = 0, posy = 0;
	
	if(window.pageXOffset){ posx = window.pageXOffset; } else
	if(document.body.scrollLeft){ posx = document.body.scrollLeft; } else
	if(document.documentElement && document.documentElement.scrollLeft){ posx = document.documentElement.scrollLeft; }
	
	if(window.pageYOffset){ posy = window.pageYOffset; } else
	if(document.body.scrollTop){ posy = document.body.scrollTop; } else
	if(document.documentElement && document.documentElement.scrollTop){ posy = document.documentElement.scrollTop; }
	
	return { x: posx, y: posy };
}
function getPageSize(){ return { width: domOverlay.offsetWidth, height: domOverlay.offsetHeight }; }


/*
 * Elements
 */
// Adds a new element to the dom
function addElement(type, parent, id, click, cssClass) {
	
	var el = document.createElement(type);
	el.setAttribute('id', id);
	if(cssClass) el.className = cssClass;
	if(click) el.onclick = click;
	
	parent.appendChild(el);
	return el;
}
// Proportionally resizes a rectangle to fit inside of another rectangle
function proportionalResize(recWidth, recHeight, boundWidth, boundHeight) {
	
	var tempWidth = recWidth, tempHeight = recHeight;
	
	if(recWidth/boundWidth >= recHeight/boundHeight) {
		
		recWidth  = boundWidth;
		recHeight = recHeight * (recWidth / tempWidth);
		
	} else {
		
		recHeight = boundHeight;
		recWidth  = recWidth * (recHeight / tempHeight);
	}
	
	return { width: Math.round(recWidth), height: Math.round(recHeight) };
}
// Gets the left and top positions of a non-absolutely positioned element
function getElementOffset(el) {
	
	var left = 0, top = 0;
	
	if(el.offsetParent) {
		
		left = el.offsetLeft + css(el, 'padding-left') + css(el, 'border-left-width');
		top  = el.offsetTop  + css(el, 'padding-top')  + css(el, 'border-top-width');
		
		while(el = el.offsetParent) {
			
			left += el.offsetLeft;
			top  += el.offsetTop;
		}
	}
	
	return { left: left, top: top };
}

// Sets an elements opacity
function setOpacity(el, op) {
	
	el.style.opacity  = op;
	el.style.filter   = 'alpha(opacity='+(op*100)+')';
}
// Gets an elements opacity
function getOpacity(el) {
	
	var s = el.style, op = s.opacity? s.opacity : s.filter? s.filter : 1;
	return parseFloat(op);
}

// Gets a css property from an element
function css(el, style, parse) {
	
	var value = '0';
	
	if(parse !== false) parse = true;
	if(hasComputedStyle) {
		
		value = document.defaultView.getComputedStyle(el, '').getPropertyValue(style);
		
	} else if(el.currentStyle) {
		
		style = style.replace(/-(\w)/g, function($0, $1){ return $1.toUpperCase(); });
		value = el.currentStyle[style];
	}
	
	return parse? toNum(value) : value;
}

function toNum(string) {
	var num = parseFloat(string);
	return isNaN(num)? 0 : num;
}


/*
 * Animations
 */

// The easing functions for the animations
function easing(t, b, c){ return ((t*=2) < 1)? c*t*t + b : -c * ((--t)*(t-2) - 1) + b; }
function easingZoom(t, b, c, part1, part2){ return (t < 1)? c*part1 + b : -c*part2 + b; }

// Animates the opacity of an element
function animateOpacity(el, opacity, duration, callback) {
	
	var op;
	
	var start = css(el, 'opacity');
	var delta = (opacity - start)/2;
	var progress;
	
	var begin = new Date().getTime();
	var timer = window.setInterval(function() {
		
		progress = (new Date().getTime() - begin) / duration;
		if(progress >= 1) {
			
			window.clearInterval(timer);
			
			setOpacity(el, opacity);
			
			if(callback) callback();
			
		} else {
			
			op = easing(progress, start, delta);
			
			el.style.opacity = op;
			el.style.filter  = 'alpha(opacity='+(op*100)+')';
		}
	}, 10);
}

// Animates the dimensions of imagebox to those set in the _new* variables
function animateZoom(duration, callback) {
	
	var progress, p2, easePart1, easePart2;
	
	var sleft   = css(domContainer, 'left');
	var stop    = css(domContainer, 'top');
	var swidth  = css(domContainer, 'width');
	var sheight = css(domContainer, 'height');
	
	var dleft   = (_newLeft - sleft)/2;
	var dtop    = (_newTop - stop)/2;
	var dwidth  = (_newWidth - swidth)/2;
	var dheight = (_newHeight - sheight)/2;
	
	var round = Math.floor;
	var style = domContainer.style;
	var begin = new Date().getTime();
	var timer = window.setInterval(function() {
		
		progress = (new Date().getTime() - begin) / duration;
		if(progress >= 1) {
			
			window.clearInterval(timer);
			
			style.left   = _newLeft   + 'px';
			style.top    = _newTop    + 'px';
			style.width  = _newWidth  + 'px';
			style.height = _newHeight + 'px';
			
			if(callback) callback();
			
		} else {
			
			// these are calculations that are done before hand
			// so they don't need to be repeated four times
			// in the easing function calls below
			p2           = progress*2;
			easePart1    = p2*p2;
			easePart2    = ((p2-1)*(p2-3) - 1);
			
			style.left   = round(easingZoom(p2, sleft, dleft, easePart1, easePart2)) + 'px';
			style.top    = round(easingZoom(p2, stop, dtop, easePart1, easePart2)) + 'px';
			style.width  = round(easingZoom(p2, swidth, dwidth, easePart1, easePart2)) + 'px';
			style.height = round(easingZoom(p2, sheight, dheight, easePart1, easePart2)) + 'px';
		}
		
	}, 10);
}

// Animates the title bar to slide to a new position
function animateTitle(end, callback) {
	
	var i;
	var start = css(domTitle, 'top');
	var delta = (end - start)/2;
	var style = domTitle.style;
	var progress;
	var duration = _options.slideDuration;
	
	var round = Math.floor;
	var begin = new Date().getTime();
	var timer = window.setInterval(function() {
		
		progress = (new Date().getTime() - begin) / duration;
		if(progress >= 1) {
			
			window.clearInterval(timer);
			
			style.top = end;
			
			if(callback) callback();
			
		} else {
			
			style.top = round(easing(progress, start, delta)) + 'px';
		}
		
	}, 10);
}


/*
 * Extras
 */

// creates the keyboard controls
function createKeyboardControls() {
	
	var checkkey = function(e) {
		
		if(!document.getElementById('ib-container') || !_options.keyboardControls) return;
		
		var evt = e? e : window.event? window.event : null;
		if(!evt) return;
		
		var key = evt.charCode? evt.charCode : evt.keyCode? evt.keyCode : evt.which? evt.which : 0;
		
		if(key === 39) next(); else
		if(key === 37) prev(); else
		if(key === 27) close();
	}
	
	if(typeof document.onkeydown === 'function') {
		
		var oldonkeydown = document.onkeydown;
		document.onkeydown = function() {
			
			oldonkeydown();
			checkkey();
		}
		
	} else {
		
		document.onkeydown = checkkey;
	}
}

// controls imagebox moving and resizing into view when the page is scrolled or resized
function updateLocation() {
	
	if(_isAnimating || !document.getElementById('ib-container')) return;
	
	clearTimeout(_updateTimer);
	_updateTimer = setTimeout(function() {
		
		if(_isAnimating || !document.getElementById('ib-container')) return;
		
		setDimensions();
		
		var scroll = getPageScroll();
		var size   = getPageSize();
		
		_newLeft = Math.round(Math.max((size.width/2)  - (_newWidth/2) + scroll.x, scroll.x + _options.viewportPadding));
		_newTop  = Math.round(Math.max((size.height/2) - ((_newHeight  + domTitle.offsetHeight)/2) + scroll.y, scroll.y + _options.viewportPadding));
		
		animateZoom(_options.zoomDuration, function(){ _isAnimating = false; });
	}, 200);
}

})();

/*!
 * Imagebox • JavaScript Application
 * Version 2.0.0
 * http://codecanyon.net/item/imagebox-image-viewing-script/89035
 *
 * imagebox.js
 *
 * Copyright (c) 2009-2012, Sarathi Hansen
 */