import AOS from 'aos';
// import widowtamer from 'widowtamer-npm';
import Widow from 'widow-js';
import LazyLoad from 'vanilla-lazyload';
import $ from 'jquery';
// import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
window.jQuery = $;
// require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

jQuery( document ).ready( function ( $ ) {

    $( document ).foundation();

    var sendIcon = '<svg class="icon icon-paper-airplane"><use xlink:href="#icon-paper-airplane"></use></svg>&nbsp;';
    $('form .button').prepend(sendIcon);

    var form = $('#contact-form');
    form.submit(function(e) {
        // prevent form submission
        e.preventDefault();

        // submit the form via Ajax
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            dataType: 'html',
            data: form.serialize(),
            success: function(result) {
                // Inject the result in the HTML
                $('#form-result').html(result);
                $('#contact-form')[0].reset();
            }
        });

    });

    function initparticles() {
        bubbles();
    }

    function bubbles() {

        $.each($('.major.bubbles'), function() {
            var bubblecount = ($(this).width() / 50) * 10;
            for (var i = 0; i <= bubblecount; i++) {
                var size = $.rnd(40, 80) / 10;
                $(this).append(
                    '<span class="particle" style="top:' +
                    $.rnd(20, 80) +
                    "%; left:" +
                    $.rnd(0, 95) +
                    "%;width:" +
                    size +
                    "px; height:" +
                    size +
                    "px;animation-delay: " +
                    $.rnd(0, 30) / 10 +
                    's;"></span>'
                );
            }
        });

        $.each($('.major.bubbles.aos-animate'), function() {
            $(this).find('.particle').addClass('tree');
        });

    }

    jQuery.rnd = function(m, n) {
        m = parseInt(m);
        n = parseInt(n);
        return Math.floor(Math.random() * (n - m + 1)) + m;
    };

    initparticles();

} );

AOS.init({
  // Global settings:
  // disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  // startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  // initClassName: 'aos-init', // class applied after initialization
  // animatedClassName: 'aos-animate', // class applied on animation
  // useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  // disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  // debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  // throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  // offset: 120, // offset (in px) from the original trigger point
  // delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1000, // values from 0 to 3000, with step 50ms
  easing: 'ease-in-out-quad', // default easing for AOS animations
  once: true, // whether animation should happen only once - while scrolling down
  // mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

const paragraphs = new Widow({words: 4, elements: '#maincontent p', warnings: false});
const headings = new Widow({words: 2, elements: 'h1, h2, h3', warnings: false});
// const prices = widow.removeWidowedElements('.prices');

var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
    // ... more custom settings?
});

lazyLoadInstance.update();