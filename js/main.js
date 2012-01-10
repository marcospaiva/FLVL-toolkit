//init app
$(function(){
	// Carousel div
	$("#side_loja .slider-navigation").carousel( {
		pagination: true,
		autoSlide: true,
   	 	autoSlideInterval: 5000,
  	  	direction: "horizontal",
   	 	loop: true ,
   	 	dispItems: 1,
	} );
	$(".slider-simple").carousel( { 
		pagination: false,
		autoSlide: false,
   	 	autoSlideInterval: 4500,
  	  	direction: "vertical",
   	 	loop: false ,
   	 	dispItems: 3,
		effect: "fade",
	} );
	$("#global_search").bind('mouseover mouseout',function(){
	        $(this).children().children().toggleClass("submit_hover");
	    })
});
