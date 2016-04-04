(function ( $ ){

	'use strict';

	// Nice Scroll
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	$(window).load(function(){
		$('body').niceScroll({ autohidemode : false,cursorwidth: 9, cursorborder: "1px solid #fff", scrollspeed:100, cursorcolor: '#919191'});
	})


	// Animate Name on nav bar
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	if ( $('#home').length > 0 ){
		var flag = false;
		$(window).scroll(function() {
			var $myName = $('#home .my-name');
			var myNamePos = $myName.offset().top;
			var topOfWindow = $(window).scrollTop();

			if ( myNamePos > 245 ) {
				$myName.removeClass('fadeOutLeft').addClass('animated fadeInLeft show');
				flag = true;

			}
			if ( myNamePos < 245 && flag  ) {
				$myName.removeClass('fadeInLeft').addClass('fadeOutLeft');

			}
		});
	}


	// Menu navigation scroll animation
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	var lastId,
		topMenu = $('.navbar-default'),
		topMenuHeight = topMenu.outerHeight() + 0,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
		  offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	  $('html, body').stop().animate({
		  scrollTop: offsetTop
	  }, 300);
	  //When screen is less than 767
	  if ($(window).width()<767){
	  	$('.navbar-toggle').click();
	  }

	  e.preventDefault();
	});

	// Resize
	$(window).resize(function(){
		topMenu = $('.navbar-default');
		topMenuHeight = topMenu.outerHeight() + 0;

		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function(){
		  var item = $($(this).attr("href"));
		  if (item.length) { return item; }
		});
	})


	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;

	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
		 if ($(this).offset().top < fromTop)
		   return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";

	   if (lastId !== id) {
		   lastId = id;
		   // Set/remove active class
		   menuItems
			 .parent().removeClass("active")
			 .end().filter("[href=#"+id+"]").parent().addClass("active");
	   }
	});


	// Get internet explorer version
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	function getInternetExplorerVersion()
	// Returns the version of Internet Explorer or a -1
	// (indicating the use of another browser).
	{
	  var rv = -1; // Return value assumes failure.
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		  rv = parseFloat( RegExp.$1 );
	  }
	  return rv;
	}


	// Initialize isotope
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	 var $container = $('#container');

     $container.isotope({
        itemSelector: '.col-md-4'
     });

	 // filter items when filter link is clicked
	 $('#filters li a').click(function(){
		$('#filters').find('.active').removeClass('active');
		$(this).parent().addClass('active');

		var selector = $(this).attr('data-filter');
		$container.isotope({ filter: selector }, function(){
			$('body').scrollspy('refresh');
		});

		return false;
	  });



	// Easy Pie chart
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	var initPieChart = function() {
		$('.percentage').easyPieChart({
			barColor: barChangeColor,
			trackColor: trackChangeColor,
			scaleColor: false,
			lineCap: 'butt',
			lineWidth: 10,
			animate: 1000,
			size:90
		});
	}


	// Show smoth navigation for charts, progressbars and mapcanvas
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	$('.chart').on('inview', function(event, isInView, visiblePartY) {
		if (isInView) {
			initPieChart();
		}
	});

	$('.progress').on('inview', function(event, isInView, visiblePartY) {
		if (isInView) {
			$(this).addClass('inview');
		}
	});

	$('#map_canvas').one('inview', function(event, isInView, visiblePartY) {
		if ( typeof(lat) !== "undefined" || typeof(lng) !== "undefined"){
			initialize(lat, lng);
		}
	});





	// Flexslider
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	$('.flexslider').fitVids().flexslider({
		animation: "fade",
		smoothHeight: true,
		useCSS: true,
		pauseOnHover: false,
		touch: true,
		video: true,
		slideshow: false

	});



	// Placeholder for IE
	//*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*
	$('input, textarea').placeholder();


})( jQuery );
