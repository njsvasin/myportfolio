(function ($) {
  /* ---------------------------------------------- /*
   * Preloader
  /* ---------------------------------------------- */

  let $window = $(window);

  $window.load(() => {
    $('#status').fadeOut();
    $('#preloader').delay(300).fadeOut('slow');
  });

  $(document).ready(() => {
    /* ---------------------------------------------- /*
     * Smooth scroll / Scroll To Top
    /* ---------------------------------------------- */

    $('a[href*=#]').bind('click', function (e) {
      const anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top,
      }, 1000);
      e.preventDefault();
    });

    $window.scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
      } else {
        $('.scroll-up').fadeOut();
      }
    });

    /* ---------------------------------------------- /*
     * Navbar
    /* ---------------------------------------------- */

    const $header = $('.header');

    $header.sticky({
      topSpacing: 0,
    });

    $('body').scrollspy({
      target: '.navbar-custom',
      offset: 70,
    });

    // Hide Header on on scroll down
    let didScroll;
    let lastScrollTop = 0;
    const delta = 51;
    const navbarHeight = $header.outerHeight();
    let timer;

    function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $header.removeClass('nav-down').addClass('nav-up');
      } else if (st + $window.height() < $(document).height()) {
        // Scroll Up
        $header.removeClass('nav-up').addClass('nav-down');
      }

      lastScrollTop = st;
    }

    const scrollHandler = () => {
      console.log('has event');

      didScroll = true;
    };

    $header
      .on('sticky-start', () => {
        $window.bind('scroll', scrollHandler);

        timer = setInterval(() => {
          if (didScroll) {
            hasScrolled();
            didScroll = false;
          }
        }, 250);
      })
      .on('sticky-end', () => {
        $window.unbind('scroll', scrollHandler);

        $header.removeClass('nav-up', 'nav-down');

        clearInterval(timer);
      });

    /* ---------------------------------------------- /*
 * Skills
    /* ---------------------------------------------- */
    // var color = $('#home').css('backgroundColor');

    $('.skills').waypoint(() => {
      $('.chart').each(function () {
        $(this).easyPieChart({
          size: 140,
          animate: 2000,
          lineCap: 'butt',
          scaleColor: false,
          barColor: '#F0DB4F',
          trackColor: 'transparent',
          lineWidth: 10,
        });
      });
    }, { offset: '80%' });


    /* ---------------------------------------------- /*
 * Quote Rotator
/* ---------------------------------------------- */

    $(() => {
      /*
      - how to call the plugin:
      $( selector ).cbpQTRotator( [options] );
      - options:
      {
        // default transition speed (ms)
        speed : 700,
        // default transition easing
        easing : 'ease',
        // rotator interval (ms)
        interval : 8000
      }
      - destroy:
      $( selector ).cbpQTRotator( 'destroy' );
      */

      $('#cbp-qtrotator').cbpQTRotator();
    });


    /* ---------------------------------------------- /*
     * Home BG
    /* ---------------------------------------------- */

    $('.screen-height').height($window.height());

    $window.resize(() => {
      $('.screen-height').height($window.height());
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      $('#home').css({ 'background-attachment': 'scroll' });
    } else {
      $('#home').parallax('50%', 0.1);
    }


    /* ---------------------------------------------- /*
     * WOW Animation When You Scroll
    /* ---------------------------------------------- */

    wow = new WOW({
      mobile: false,
    });
    wow.init();


    /* ---------------------------------------------- /*
     * E-mail validation
    /* ---------------------------------------------- */

    function isValidEmailAddress(emailAddress) {
      const pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
      return pattern.test(emailAddress);
    }

    /* ---------------------------------------------- /*
     * Contact form ajax
    /* ---------------------------------------------- */

    $('#contact-form').submit((e) => {
      e.preventDefault();

      const c_name = $('#c_name').val();
      const c_email = $('#c_email').val();
      const c_message = $('#c_message ').val();
      const response = $('#contact-form .ajax-response');

      const formData = {
        name: c_name,
        email: c_email,
        message: c_message,
      };

      if ((c_name == '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email))) {
        response.fadeIn(500);
        response.html('<i class="fa fa-warning"></i> Please fix the errors and try again.');
      } else {
        $.ajax({
          type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
          url: 'assets/php/contact.php', // the url where we want to POST
          data: formData, // our data object
          dataType: 'json', // what type of data do we expect back from the server
          encode: true,
          success(res) {
            const ret = $.parseJSON(JSON.stringify(res));
            response.html(ret.message).fadeIn(500);
          },
        });
      }
      return false;
    });
  });
}(jQuery));
