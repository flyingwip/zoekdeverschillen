/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {


  var Hotspots = {

    counter:0,
    correct_counter:0,
    interval_id:0,

    onSpot: function() {
      console.log('juiste klik',Hotspots.correct_counter);
      Hotspots.correct_counter++;

      if(Hotspots.correct_counter==6){
         
        setTimeout(function(){ location.href = 'goed';  }, 1000);

      }
    },
    offSpot: function() {
      console.log('verkeerde klik');
      location.href = 'helaas';
    } , 
    initSlideShow: function() {
      


      $('#imagemapper1-wrapper').css('opacity',0);
      
      $('.brainwash img:gt(0)').hide();

       Hotspots.interval_id = setInterval(function(){
         
         Hotspots.counter++;
         console.log('counter', Hotspots.interval_id);

         if(Hotspots.counter==5){
            clearInterval(Hotspots.interval_id);
            $('.brainwash').remove();
            $('#imagemapper1-wrapper').css('opacity',1);
            Hotspots.initGame();
         }

         $('.brainwash :first-child').fadeOut()
            .next('img').fadeIn()
            .end().appendTo('.brainwash');}, 
          1400);

      
    } ,
    initGame: function() {

        $( ".imapper-pin-wrapper" ).click(function(event) {

            event.preventDefault();
            event.stopPropagation();
            $(this).css('opacity',1);
            Hotspots.onSpot();
           
        });

        $( ".imagemapper-wrapper" ).click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            Hotspots.offSpot();
        });

    }

  };


  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
        //alert('init');
        //console.log(  $('.entry-title').text()  );
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
        
        
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
        alert('about_us');
      }
    },
    'spel': {
      init: function() {
        // JavaScript to be fired on the about us page
        Hotspots.initSlideShow();

      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };




  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
