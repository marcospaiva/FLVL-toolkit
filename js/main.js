<<<<<<< HEAD
// 
$(document).ready(function(){
    $("#global_search .submit").bind('mouseover mouseout',function(){
        $(this).prev().children().toggleClass("submit_hover");
    })
});
=======
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
  	  	direction: "vertical",
   	 	loop: true ,
   	 	dispItems: 3,
	} );
	
	$("#global_search").bind('mouseover mouseout',function(){
	        $(this).children().children().toggleClass("submit_hover");
	    })
	
});
>>>>>>> search
