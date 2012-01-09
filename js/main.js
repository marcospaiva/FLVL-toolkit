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
	
	$("#global_search").bind('mouseover mouseout',function(){
	        $(this).children().children().toggleClass("submit_hover");
	    })
	
});
