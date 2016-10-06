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
      
      Hotspots.correct_counter++;

      if(Hotspots.correct_counter==6){
         
        setTimeout(function(){ location.href = 'goed';  }, 1000);

      }
    },
    offSpot: function() {
      
      $('#imagemapper1-wrapper').css('pointer-events','none');
      location.href = 'helaas';
    } , 
    initSlideShow: function() {
      

      $('#imagemapper1-wrapper').css('opacity',0);
        
      $('.brainwash img:gt(0)').hide();

       Hotspots.interval_id = setInterval(function(){
         Hotspots.counter++;
         if(Hotspots.counter==6){
            clearInterval(Hotspots.interval_id);
            $('.brainwash').remove();
            $('#imagemapper1-wrapper').css('opacity',1);
            Hotspots.initGame();
         }
         $('.brainwash :first-child').fadeOut()
            .next('img').fadeIn()
            .end().appendTo('.brainwash');}, 
          1000);
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


        var fb = Hotspots.inIosFacebookApp();
        var corr = 0;
        if(fb){
          corr = 110;
        } 
        //pos = document.documentElement.clientHeight  - ($('.game_footer').height()*2)   -cor ;
        pos = document.documentElement.clientHeight  - $('.game_footer').height()*2-2 -corr;
        $('.game_footer').css('top',pos + 'px');    
        $('.game_footer').css('display','block');    
        
        
    }, 

    inIosFacebookApp: function() {

      //useragent iosfb contains 'FBAN'
      //console.log(  );
      
      if (navigator.userAgent.indexOf("FBAN") > -1){
          return true;
      } else {
          //You are not in Facebook App.
          return false ;
      }

    },
    meerOverLandal: function() {
        console.log('testje',window.location.hostname);
        $(".green_relative").click( function(event){
            event.preventDefault();
            if(window.location.hostname=='www.landalmomentenvanger.nl' || window.location.hostname=='landalmomentenvanger.nl'){
              location.href= 'http://www.landal.nl/aanbiedingen/najaarsaanbod/najaarsinspiratie?utm_source=landalmomentenvanger&utm_medium=social&utm_campaign=lgp_nl&utm_content=landalmomentenvanger|||';
            } else {
              location.href= 'http://www.landal.be/aanbiedingen/najaarsaanbod/najaarsinspiratie?utm_source=landalmomentenvanger&utm_medium=social&utm_campaign=lgp_be&utm_content=landalmomentenvanger|||';
            }
            
        } );
    },
    shareOnFB: function() {
      $("#fbshare").click( function(event){
            event.preventDefault();
            if(window.location.hostname=='www.landalmomentenvanger.nl' || window.location.hostname=='landalmomentenvanger.nl'){
              location.href= 'https://www.facebook.com/sharer/sharer.php?u=https://facebook.com/Landalnl/posts/1286555834701633';
            } else {
              location.href= 'https://www.facebook.com/sharer/sharer.php?u=https://facebook.com/Landalbe/posts/1277593228919063';
            }
        });

    }
  };


  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        
     },
      finalize: function() {
        // // JavaScript to be fired on all pages, after page specific JS is fired
        
      }
    },
    // Home page
    'home': {
      init: function() {
        
        
      },
      finalize: function() {



      }
    },
    'start': {
      init: function() {
        // JavaScript to be fired on the home page
        


      },
      finalize: function() {

        //facebook adjustments specially for InApp iphone 5 and 6
        var fb = Hotspots.inIosFacebookApp();
        var cor = 0;
        if(fb){
          cor = 105;
        } 
        pos = document.documentElement.clientHeight  - ($('.game_footer').height()*2) - cor ;
        
        $('.game_footer').css('top',pos + 'px');    
        $('.game_footer').css('display','block');    

        // JavaScript to be fired on the home page, after the init JS

      }
    },
    'goed': {
      init: function() {
        //display none to demo_mode:on
        $( "p:contains('[demo_mode: on]')" ).css( "display", "none" );

        //add tabindex 
        $(".sex").attr('tabindex', 1);
        $(".land").attr('tabindex', 6);
        $("p.seventh .wpcf7-list-item-label").attr('tabindex', 6);
        
        //zet landen radio default op domein
        //what is de extensie?
        var extension=location.hostname.split(".");
        extension=extension[extension.length-1];
        if (extension=="nl") {
          $('input[name="land"][value="België"]').prop('checked', false);
          $('input[name="land"][value="Nederland"]').prop('checked', true);
        } else {
          $('input[name="land"][value="België"]').prop('checked', true);
          $('input[name="land"][value="Nederland"]').prop('checked', false);
        }


        //callback for redirecting naar juiste bedankt pagina
        $(".wpcf7").on('wpcf7:mailsent', function(event){
          //is aanbiedingen ontvangen gecheckt?
          if($('input[name="aanbiedingen_ontvangen[]"]').is(":checked")){
             location.href = 'bedank';  
           } else {
             location.href = 'bedankt';
          }
        });

        //migrate this element
        $('span.acceptance').appendTo('span.voorwaarden');
        pos = document.documentElement.clientHeight  - $('.wpcf7-submit').height()-45;
        //$('.eighth').css('top',pos + 'px');


      
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }

    },
    'helaas': {
      init: function() {
        // JavaScript to be fired on the about us page
        //manipulate browser back button
        if (window.history && window.history.pushState) {
          window.history.pushState('start', null, '.start');
          $(window).on('popstate', function() {
            window.location.href = 'start';
          });
        }
      }
    },
    'spel': {
      init: function() {
        // JavaScript to be fired on the about us page
        Hotspots.initSlideShow();
        //what is the height of the imagewrapper? WHY WHY WHY??????
        //var h = $("#imagemapper1-wrapper").height() + $(".game_footer").height() +7;
        //$("main.main").height( h  +'px' );
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      
      }
    },
    'actievoorwaarden': {
      finalize: function() {
          var th = $(".text_container").height() + $(".text_container").position().top +120 ;
          //console.log('actievoorwaarden finalize', th); 
          $("main.main").height( th  +'px' );   
      } 
    },
    'bedankt': {
      finalize: function() {

          Hotspots.shareOnFB();
          Hotspots.meerOverLandal();   

      }
    },
    'bedank': {
      finalize: function() {
        Hotspots.shareOnFB();
        Hotspots.meerOverLandal();
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
