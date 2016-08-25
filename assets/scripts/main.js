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


        var fb = Hotspots.inIosFacebookApp();
        if(fb){
          cor = 110;
        } 
        //pos = document.documentElement.clientHeight  - ($('.game_footer').height()*2)   -cor ;
        pos = document.documentElement.clientHeight  - $('.game_footer').height()+8 -cor;
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
    addGameFooterCorrectionClass: function() {



    }
  };


  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages

        //alert( document.documentElement.clientHeight );
        // pos = document.documentElement.clientHeight -   $('button').height()-130;
        // //pos = 0;
        // //$('button').css('top',pos + 'px');

        // //what is width of button?
        // var theDiv = $("button");
        // var totalWidth = theDiv.outerWidth();
        
        // totalWidth += parseInt(theDiv.css("padding-left"), 10) + parseInt(theDiv.css("padding-right"), 10); //Total Padding Width
        // totalWidth += parseInt(theDiv.css("borderLeftWidth"), 10) + parseInt(theDiv.css("borderRightWidth"), 10); //Total Border Width
        // //console.log( totalWidth );

        // var temp = Math.round(  (totalWidth/$(".text_container").width()*100)*0.5  );
        
       // $('button').css('left',50-temp+2 + '%');

        

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
        // JavaScript to be fired on the home page, after the init JS
        //position the button
        // pos = document.documentElement.clientHeight  -  $('button').height()  - 160;

        // $('button').css('top',pos + 'px');

        var theDiv = $("button");
        var totalWidth = theDiv.outerWidth();
        
        // totalWidth += parseInt(theDiv.css("padding-left"), 10) + parseInt(theDiv.css("padding-right"), 10); //Total Padding Width
        // totalWidth += parseInt(theDiv.css("borderLeftWidth"), 10) + parseInt(theDiv.css("borderRightWidth"), 10); //Total Border Width
        // // //console.log( totalWidth );

        // var temp = Math.round(  (totalWidth/ Math.round( $(".text_container").width() ) *100) *0.5  );
        // console.log( theDiv.outerWidth() );
        // console.log( Math.round( $(".content").width() ) );
        // console.log( temp );
        // $('button').css('left',50-temp + '%');


      }
    },
    'start': {
      init: function() {
        // JavaScript to be fired on the home page
        


      },
      finalize: function() {

        var fb = Hotspots.inIosFacebookApp();
        if(fb){
          cor = 110;
        } 
        pos = document.documentElement.clientHeight  - ($('.game_footer').height()*2)   -cor ;

        $('.game_footer').css('top',pos + 'px');    
        $('.game_footer').css('display','block');    

        // JavaScript to be fired on the home page, after the init JS

      }
    },
    'goed': {
      init: function() {
        //display none to demo_mode:on
        $( "p:contains('[demo_mode: on]')" ).css( "display", "none" );

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

        //set the nieuwsbrief op checked
        //$('input[name="aanbiedingen_ontvangen[]"]').prop('checked', true);


        //callback for redirecting naar juiste bedankt pagina
        $(".wpcf7").on('wpcf7:mailsent', function(event){
          //is aanbiedingen ontvangen gecheckt?
          if($('input[name="aanbiedingen_ontvangen[]"]').is(":checked")){
             location.href = 'bedankt-b';  
           } else {
             location.href = 'bedankt-a';
          }
        });

        //migrate this element
        $('span.acceptance').appendTo('span.voorwaarden');
        pos = document.documentElement.clientHeight  - $('.wpcf7-submit').height()-45;
        //$('.eighth').css('top',pos + 'px');

        var theDiv = $(".wpcf7-submit");
        var totalWidth = theDiv.outerWidth();
        totalWidth += parseInt(theDiv.css("padding-left"), 10) + parseInt(theDiv.css("padding-right"), 10); //Total Padding Width
        totalWidth += parseInt(theDiv.css("borderLeftWidth"), 10) + parseInt(theDiv.css("borderRightWidth"), 10); //Total Border Width
        var temp = Math.round(  (totalWidth/$(".text_container").width()*100)*0.5  );
        
        //$('.eighth').css('left',51-temp + '%');

      
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
        //$('input[type=checkbox],input[type=radio]').prettyCheckboxes();
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
        //what is the height of the imagewrapper?
        var h = $("#imagemapper1-wrapper").height() + $(".game_footer").height() +7;
        $("main.main").height( h  +'px' );
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
        //$('input[type=checkbox],input[type=radio]').prettyCheckboxes();



      }
    },
    'actievoorwaarden': {
      finalize: function() {
          var th = $(".text_container").height() + $(".text_container").position().top +120 ;
          //console.log('actievoorwaarden finalize', th); 
          $("main.main").height( th  +'px' );   
      } 
    },
    'bedankt_a': {
      finalize: function() {
        pos = document.documentElement.clientHeight  - $('ul.social_media').height()-30;
        $('ul.social_media').css('top',pos + 'px');    
        //$('.game_footer').css('display','block');    
        //console.log(pos);
      }
    },
    'bedankt_b': {
      finalize: function() {
        pos = document.documentElement.clientHeight  - $('ul.social_media').height()-30;
        $('ul.social_media').css('top',pos + 'px');    
        //$('.game_footer').css('display','block');    
        //console.log(pos);
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
