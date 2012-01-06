// 
$(document).ready(function(){
    $("#global_search .submit").bind('mouseover mouseout',function(){
        $(this).prev().children().toggleClass("submit_hover");
    })
});