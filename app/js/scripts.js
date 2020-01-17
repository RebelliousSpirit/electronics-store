// Lazy loading img & background images using intersection observer
// Reference: https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/
// Using example: <img class="lazy" src="thumb.gif" data-src="real-img.jpg" data-srcset="real-img@1x.jpg 1x, real-img@2x.jpg 2x">
// Background image class usign example: <div class="lazy-background"> with added class ".visible" for styling
// Background image style attribute lazy loading example: <div data-bg="image.jpg">

// delete window.IntersectionObserver; // Fallback Testing

document.addEventListener('DOMContentLoaded', function() {

	var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
	var lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-background'));
	var lazyBackgroundsData = [].slice.call(document.querySelectorAll('[data-bg]'));

	if ('IntersectionObserver' in window) {

		let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove('lazy');
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});
		lazyImages.forEach(function(lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});

	let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				lazyBackgroundObserver.unobserve(entry.target);
			}
		});
	});
	lazyBackgrounds.forEach(function(lazyBackground) {
		lazyBackgroundObserver.observe(lazyBackground);
	});

	let lazyBackgroundDataObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				let lazyBackgroundData = entry.target;
				lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
				lazyBackgroundDataObserver.unobserve(lazyBackgroundData);
			}
		});
	});
	lazyBackgroundsData.forEach(function(lazyBackgroundData) {
		lazyBackgroundDataObserver.observe(lazyBackgroundData);
	});

	} else {

		// Fallback

		lazyImages.forEach(function(lazyImage) {
			lazyImage.src = lazyImage.dataset.src;
			lazyImage.srcset = lazyImage.dataset.srcset;
		});
		lazyBackgrounds.forEach(function(lazyBackground) {
			lazyBackground.classList.add('visible');
		});
		lazyBackgroundsData.forEach(function(lazyBackgroundData) {
			lazyBackgroundData.style.backgroundImage = 'url(' + lazyBackgroundData.dataset.bg + ')';
		});

	}

});

document.addEventListener("DOMContentLoaded", function() {
	//*initializing the slider
	$('#main-slider').slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 2500,
		infinite: true,
		fade: true,
		swipe: true,
		pauseOnHover: true,
		arrows: false,
		dotsClass: "main-slider__dots",
	});
	$('.main-slider__dots li button').html('');
	
	/**
	 * dropdown menu in the header
	 */
	(function () {
		var touch = $('.dropdown-btn');
		var menuWrapper = $('.dropdown');
		var dropdownMenu = $('.dropdown-menu');
		var w = $(window).width();

	  	$('html').click(function() {
	    	menuWrapper.find('.dropdown-menu').slideUp();
	    	touch.delay(1600).removeClass('active-btn'); 
	  	});

		menuWrapper.click(function(e) {
		   e.stopPropagation();
		});

		$(touch).on('click', function(e) {
		    e.preventDefault();
		    var menu = $(this).next('.dropdown-menu');
		    var isClosed = menu.is(':hidden'); 
		    
		    menuWrapper.stop(false, true).find('.dropdown-menu').slideUp(); 
		    touch.delay(1600).removeClass('active-btn'); 
		   
		    if (isClosed) {
		    	menu.slideDown();
		    	$(this).delay(1600).addClass('active-btn');
			}else{
				$(this).delay(1600).removeClass('active-btn');
			}

		});
	})();	

	/**
	 * star rating appears when hovering over the product image
	 */
	$('.addon-product__thumb-wrap img').hover(function() {
		var parent = $(this).closest('.addon-product');
		$(parent).children('.star-rating').css({
			opacity: '1',
			top: '5px'
		});
	}, function() {
		var parent = $(this).closest('.addon-product');
		$(parent).children('.star-rating').css({
			opacity: '0',
			top: '0'
		});
	});

	
	$('.star-rating__bg').each(function(index, el) {
		var ratingCount	= $(el).data('rating');
		var elemWidth = (ratingCount * 20) + "%";

		$(el).css('width', elemWidth);
	});

	/**
	 * remove the typical click behavior of an item
	 */	
	$('.tooltip-inner').on('click',function(event) {
		event.preventDefault();
		event.stopPropagation();
		/* Act on the event */
	});
	
	/**
	 * fixed menu in site header
	 */
	$(window).scroll(function(){
		if ($(this).width() > 523) {
			 if($(this).scrollTop()>40){
	            $('#fixed-top-nav').addClass('fixed-nav');
	        }
	        else if ($(this).scrollTop()<40){
	            $('#fixed-top-nav').removeClass('fixed-nav');
	        }
		}       
    });
   
    /**
     * modla window
     */
    $('.gallery-item__thumb img').on('click', function(event) {
    	event.preventDefault();
		createModalWindow();

    	var thisImgSrc = $(this).attr('src');
    	var title = $(this).attr('alt');
    	var modalImg = '<figure><img src="" alt="изображение">\
			<figcaption></figcaption></figure>';
		
		$('.page-holder').css('overflow', 'hidden');
		$('#modal-window .modal-window__content').prepend(modalImg);
		$('#modal-window figure>img').attr('src', thisImgSrc);
		$("#modal-window .modal-window__content figcaption").html(title);
		$('#modal-window').css({
			display: 'block'
		});
    });

    $('.addon-product .addon-quick-view').on('click', function(event) {
    	event.preventDefault();
    	createModalWindow();

    	var parent = $(this).closest('.addon-product');
    	var thisImg = $(parent).children('.addon-product__thumb-wrap').children('a').children('img');
    	var thisImgSrc = $(thisImg).attr('src');
    	var title = $(thisImg).attr('alt');
    	var modalImg = '<figure><img src="" alt="изображение" class="img-responsive">\
			<figcaption></figcaption></figure>';
		
		$('.page-holder').css('overflow', 'hidden');
		$('#modal-window .modal-window__content').prepend(modalImg);
		$('#modal-window figure>img').attr('src', thisImgSrc);
		$("#modal-window .modal-window__content figcaption").html(title);
		$('#modal-window').css({
			display: 'block'
		});
    	
    });        

    function createModalWindow() {    	
    	var modalWindow = '<div id="modal-window" class="modal-window">\
    	<div class="modal-window__wrap"><div class="modal-window__content">\
    	</div></div></div>';    	

    	$('.page-holder').prepend(modalWindow);

    	$('#modal-window').on('click', function(event) {
    		event.preventDefault();
    		$(this).css('display', 'none');
    		$(this).remove();
    		$('body').css('overflow', 'auto');
    	});
    }

    /**
     * tabs
     */
    $('#tab-side-container').easytabs();
    /**
     * magnifying glass effect when hovering over an image on the product page
     */
   	(function(){

   		var boxWidth = $('.addon-product__image_large').width();
   		var boxHeight = $('.addon-product__image_large').height();

   		$('.addon-product__image_large img').attr({
   			width: boxWidth,
   			height: boxHeight,
   		});

   	})();    

    $('.loupe-in-img').css({
    	borderRadius : '50%',
    });
    
   
	/**
	 * 
	 */
   	$('.addon-product__images-item img').on('click', function () {
   		var imgSrc = $(this).attr('src');
   		
   		$('.addon-product__image_large img').attr({
   			src : imgSrc,
   		});

   		$('.loupe-in-img img').attr({
   			src : imgSrc,
   		});

   	});
});
