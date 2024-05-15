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
owl2.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl2.trigger('next.owl');
    } else {
        owl2.trigger('prev.owl');
    }
    e.preventDefault();
});