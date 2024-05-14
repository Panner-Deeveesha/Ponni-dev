var owl = $('.owl-carousel');
owl.owlCarousel({
    loop:false,
    nav:true,
	    dots: false,
    margin:10,
	
	navText: [
	    "<i class='fa fa-angle-left'></i>",
	    "<i class='fa fa-angle-right'></i>"
	],
    responsive:{
        0:{
            items:1,
			dots:true,
			   nav: false,
        },
		400:{
		items:1	,
		dots:true,
	   nav: false, 
		},
		500:{
			 items:2,
			nav: false, 
		},
		 650:{
            items:2
		
        },
        600:{
            items:3
		
        },            
        960:{
            items:3
        },
        1200:{
            items:4
        }
    }
});
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});