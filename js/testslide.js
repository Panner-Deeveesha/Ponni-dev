var owl2 = $('.owl-carousel');
owl2.owlCarousel({
    loop:false,
    nav:true,
    margin:10,
	navText: [
	    "<i class='fa fa-angle-left'></i>",
	    "<i class='fa fa-angle-right'></i>"
	],
    responsive:{
        0:{
            items:2
        },
        730:{
            items:3
        },            
        1150:{
            items:3
        },
        1200:{
            items:4
        }
    }
});
