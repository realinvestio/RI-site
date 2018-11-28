'use strict';

$(window).on('load', function() {
  /*------------------
		Preloder
	--------------------*/
  $('.loader').fadeOut();
  $('#preloder')
    .delay(400)
    .fadeOut('slow');
});

(function($) {
  /*------------------
		hero
	--------------------*/
  $('#videobcg')
    .show()
    .trigger('stop')
    .bind('ended', function() {
      this.currentTime = 3;
    });
  /*------------------
		Navigation
	--------------------*/

  var nav = $('.main-menu');
  $(window).resize(function() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      nav.show();
    } else {
      /* the viewport is less than 400 pixels wide */
    }
  });

  $('.responsive-bar').on('click', function(event) {
    console.log('click');
    nav.slideToggle(200);
    event.preventDefault();
  });

  /*------------------
		Background set
	--------------------*/
  $('.set-bg').each(function() {
    var bg = $(this).data('setbg');
    $(this).css('background-image', 'url(' + bg + ')');
  });

  /*------------------
		Review
	--------------------*/
  var review_meta = $('.review-meta-slider');
  var review_text = $('.review-text-slider');

  review_text.on('changed.owl.carousel', function(event) {
    review_meta.trigger('next.owl.carousel');
  });

  review_meta.owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    items: 3,
    center: true,
    margin: 20,
    autoplay: true,
    mouseDrag: false
  });

  review_text.owlCarousel({
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    margin: 20,
    autoplay: true,
    navText: ['<i class="ti-angle-left"><i>', '<i class="ti-angle-right"><i>'],
    animateOut: 'fadeOutDown',
    animateIn: 'fadeInDown'
  });

  /*------------------
		Contact Form
	--------------------*/
  $('.check-form').focus(function() {
    $(this)
      .next('span')
      .addClass('active');
  });
  $('.check-form').blur(function() {
    if ($(this).val() === '') {
      $(this)
        .next('span')
        .removeClass('active');
    }
  });

  /*------------------
		roadmap
	--------------------*/

  var viewport = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );

  $('.goal_wrap').click(function() {
    var diff = $(this).parent()[0].offsetLeft;
    $('.date .goal_wrap').removeClass('active bounce');
    $(this).addClass('active bounce');
    TweenLite.to($('.date').parent(), 1, {
      x: viewport * 0.5 - diff,
      onComplete() {}
    });
  });

  $('.goal_set').click(function() {
    var bg = $(this).attr('data-bg-image');
    $('.roadmap')
      .fadeTo('ease', 0.3, function() {
        $(this).css('background-image', 'url(' + bg + ')');
      })
      .fadeTo('slow', 1);
  });

  $('.focus_yr').click(function() {
    var diff = $(this).parent()[0].offsetLeft;
    TweenLite.to($('.date').parent(), 1, {
      x: viewport * 0.5 - diff,
      onComplete() {}
    });
  });

  $('.team-members').flickity({
    // options
    cellAlign: 'center',
    contain: true,
    initialIndex: 0,
    wrapAround: true
  });
})(jQuery);
