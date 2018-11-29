'use strict';

(function($) {
  var cfg = {
    scrollDuration: 800 // smoothscroll duration
  };
  clSmoothScroll();
  $('a').click(function(e) {
    e.preventDefault();
  });
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
    mouseDrag: false,
    autoplayHoverPause: true
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
    autoplayHoverPause: true,
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

  // Subscription form submit

  $('#mc-form').validate({
    /* submit via ajax */
    submitHandler(form) {
      // var sLoader = $('.submit-loader');
      var data = $('#mc-form')
        .serializeArray()
        .reduce(function(obj, item) {
          if (item.name != 'submit') {
            obj[item.name] = item.value;
          }
          return obj;
        }, {});
      var nm = data.fname.split(' ');
      var fname = nm[0];
      var lname = '';
      if (nm.length > 1) {
        var l = nm.length;
        for (var i = 1; i < l; i++) {
          if (nm[i] == '') {
            continue;
          }
          lname += ' ' + nm[i].trim();
        }
      }
      // Submit form
      $.ajax({
        url: '/sub/new/add/',
        type: 'POST',
        data: {
          subscriber_fname: fname,
          subscriber_lname: lname,
          email: data.email
        },
        beforeSend(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader('X-CSRFToken', data.csrfmiddlewaretoken);
          }
        },
        success(req) {
          // Client side response
          // console.log(req);
          $('#mc-form_server_err').fadeIn(800);
          if (req.response == 'Success') {
            $('#mc-form_server_err').css('color', 'white');
            $('#mc-form_server_err').text(
              'Thanks for subscribing. We will contact you shortly!'
            );
            $('#mc-form_server_err')
              .delay(5000)
              .fadeOut(1000);
            return true;
          }
          if (req.response == 'Error') {
            $('#mc-form_server_err').css('color', 'red');
            if (typeof req.reason.email[0]) {
              $('#mc-form_server_err').text(req.reason.email[0]);
            } else {
              $('#mc-form_server_err').text('Something went wrong!');
            }
            $('#mc-form_server_err')
              .delay(5000)
              .fadeOut(1000);
            return false;
          }
        },
        error(XMLHttpRequest, textStatus, errorThrown) {
          if (XMLHttpRequest.status == 0) {
            console.log('Network Error.');
          } else if (XMLHttpRequest.status == 404) {
            console.log('Requested URL not found.');
          } else if (XMLHttpRequest.status == 500) {
            console.log('Internel Server Error.');
          } else {
            alert('Unknown Error : ' + XMLHttpRequest.responseText);
          }
          $('#mc-form_server_err').fadeIn(800);
          $('#mc-form_server_err').css('color', 'white');
          $('#mc-form_server_err').text(
            'Some serious server error happened! Please try after sometime'
          );
          $('#mc-form_server_err')
            .delay(5000)
            .fadeOut(1000);
        }
      });
    }
  });

  $('#mc-form_footer').validate({
    /* submit via ajax */
    submitHandler(form) {
      // var sLoader = $('.submit-loader');
      var data = $('#mc-form_footer')
        .serializeArray()
        .reduce(function(obj, item) {
          if (item.name != 'submit') {
            obj[item.name] = item.value;
          }
          return obj;
        }, {});
      var nm = data.fname.split(' ');
      var fname = nm[0];
      var lname = '';
      if (nm.length > 1) {
        var l = nm.length;
        for (var i = 1; i < l; i++) {
          if (nm[i] == '') {
            continue;
          }
          lname += ' ' + nm[i].trim();
        }
      }
      // Submit form
      $.ajax({
        url: '/sub/new/add/',
        type: 'POST',
        data: {
          subscriber_fname: fname,
          subscriber_lname: lname,
          email: data.email
        },
        beforeSend(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader('X-CSRFToken', data.csrfmiddlewaretoken);
          }
        },
        success(req) {
          // Client side response
          // console.log(req);
          $('#mc-form_footer_server_err').fadeIn(800);
          if (req.response == 'Success') {
            $('#mc-form_footer_server_err').css('color', '#1f3b42');
            $('#mc-form_footer_server_err').text(
              'Thanks for subscribing. We will contact you shortly!'
            );
            $('#mc-form_footer_server_err')
              .delay(5000)
              .fadeOut(1000);
            return true;
          }
          if (req.response == 'Error') {
            $('#mc-form_footer_server_err').css('color', 'red');
            if (typeof req.reason.email[0]) {
              $('#mc-form_footer_server_err').text(req.reason.email[0]);
            } else {
              $('#mc-form_footer_server_err').text('Something went wrong!');
            }
            $('#mc-form_footer_server_err')
              .delay(5000)
              .fadeOut(1000);
            return false;
          }
        },
        error(XMLHttpRequest, textStatus, errorThrown) {
          if (XMLHttpRequest.status == 0) {
            console.log('Network Error.');
          } else if (XMLHttpRequest.status == 404) {
            console.log('Requested URL not found.');
          } else if (XMLHttpRequest.status == 500) {
            console.log('Internel Server Error.');
          } else {
            alert('Unknown Error : ' + XMLHttpRequest.responseText);
          }
          $('#mc-form_footer_server_err').fadeIn(800);
          $('#mc-form_footer_server_err').css('color', '#1f3b42');
          $('#mc-form_footer_server_err').text(
            'Some serious server error happened! Please try after sometime'
          );
          $('#mc-form_footer_server_err')
            .delay(5000)
            .fadeOut(1000);
        }
      });
    }
  });

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  function clSmoothScroll() {
    $('.smoothscroll').click(function(e) {
      console.log('smooth');
      var target = this.hash,
        $target = $(target);

      e.preventDefault();
      e.stopPropagation();

      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top
          },
          cfg.scrollDuration,
          'swing'
        )
        .promise()
        .done(function() {
          // check if menu is open
          if ($('body').hasClass('menu-is-open')) {
            $('.header-menu-toggle').trigger('click');
          }

          window.location.hash = target;
        });
    });
  }
})(jQuery);
