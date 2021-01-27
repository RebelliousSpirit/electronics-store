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
     * modal window
     */
    $('.gallery-item__thumb img').on('click', function(event) {
    	event.preventDefault();
		createModalWindow();

    	var thisImgSrc = $(this).attr('src');
    	var title = $(this).attr('alt');
    	var modalImg = '<figure><img><figcaption></figcaption></figure>\
    	<div class="addon-product__description"></div>';
		
		$('.page-holder').css('overflow', 'hidden');
		$('#modal-window .modal-window__content').prepend(modalImg);
		$('#modal-window figure>img').attr({
			src: thisImgSrc,
			alt: title
		});
		$("#modal-window .modal-window__content figcaption").html(title);
		$("#modal-window .addon-product__description").html('hello');
		$('#modal-window').css({
			display: 'block'
		});
    });

    $('.addon-product .addon-quick-view').on('click', function(event) {
    	event.preventDefault();
    	createModalWindow();

    	var productDescription = $(this).children('.addon-product__description').html();

    	var parent = $(this).closest('.addon-product');
    	var thisImg = $(parent).children('.addon-product__thumb-wrap').children('a').children('img');
    	var thisImgSrc = $(thisImg).attr('src');
    	var title = $(thisImg).attr('alt');
    	var modalImg = '<figure><img src="" alt="изображение" class="example-img">\
			<figcaption></figcaption></figure><div class="addon-product__description"></div>';
		
		$('.page-holder').css('overflow', 'hidden');
		$('#modal-window .modal-window__content').prepend(modalImg);

		$('#modal-window .addon-product__description').html(productDescription);

		$('#modal-window figure>img').attr({
			src: thisImgSrc,
			alt: title
		});
		$("#modal-window .modal-window__content figcaption").html(title);
		$('#modal-window').css({
			display: 'block'
		});

		$('.page-holder').css({
			position: 'fixed',
		});  	
    });        

    function createModalWindow() {    	
    	var modalWindow = '<div id="modal-window" class="modal-window">\
    	<div class="modal-window__wrap"><div class="modal-window__content">\
    	</div><span class="modal-window__close"><i class="icon-close"></i></span></div></div>';    	

    	$('.page-holder').prepend(modalWindow);

    	$('#modal-window').on('click', function(event) {
			event.preventDefault();

			$(this).css('display', 'none');
			$(this).remove();
			$('body').css('overflow', 'auto');

			$('.page-holder').css({
				position: 'static',
			});

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
	 * the slider on the page product.html 
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

