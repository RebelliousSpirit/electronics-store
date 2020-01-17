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
	
	//*dropdown menu in the header
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

	//*dropdown list in the header
	$('.nav .nav__item').hover(function() {
		if($(window).width() > 992){
			$(this).children('.nav__sub-nav').stop(true, true).fadeIn(600);
		}		
	}, function() {
		if($(window).width() > 992){
			$(this).children('.nav__sub-nav').stop(true, true).fadeOut(600);
		}
	});
	
	//*star rating appears when hovering over the product image
	$('.addon-product__thumb-wrap img').hover(function() {
		let parent = $(this).closest('.addon-product');
		$(parent).children('.star-rating').css({
			opacity: '1',
			top: '5px'
		});
	}, function() {
		let parent = $(this).closest('.addon-product');
		$(parent).children('.star-rating').css({
			opacity: '0',
			top: '0'
		});
	});

	//remove the typical click behavior of an item
	$('.tooltip-inner').on('click',function(event) {
		event.preventDefault();
		event.stopPropagation();
		/* Act on the event */
	});
	
	//* fixed menu in site header
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
   
    //* modal window
    $('.gallery-item__thumb img').on('click', function(event) {
    	event.preventDefault();
		createModalWindow();

    	let thisImgSrc = $(this).attr('src');
    	let title = $(this).attr('alt');
    	let modalImg = '<figure><img src="" alt="изображение">\
			<figcaption></figcaption></figure>';
		
		$('body').css('overflow', 'hidden');
		$('#modal-window .modal-window__content').prepend(modalImg);
		$('#modal-window figure>img').attr('src', thisImgSrc);
		$("#modal-window .modal-window__content figcaption").html(title);
		$('#modal-window').css({
			display: 'block'
		});
    });    

    function createModalWindow() {    	
    	let modalWindow = '<div id="modal-window" class="modal-window">\
    	<div class="modal-window__wrap"><div class="modal-window__content">\
    	</div></div></div>';    	

    	$('body').prepend(modalWindow);

    	$('#modal-window').on('click', function(event) {
    		event.preventDefault();
    		$(this).css('display', 'none');
    		$(this).remove();
    		$('body').css('overflow', 'auto');
    	});
    }

    //* tabs    
    $('#tab-side-container').easytabs();


});
