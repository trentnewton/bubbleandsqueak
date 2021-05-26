// import IntersectionObserver from 'intersection-observer';
import AOS from 'aos';
import Widow from 'widow-js';
// import lazySizes from 'lazysizes';
import LazyLoad from 'vanilla-lazyload';
import './modernizr-custom';
// import $ from 'jquery';
// import 'what-input';

// Foundation JS relies on a global variable. In ES6, all imports are hoisted
// to the top of the file so if we used `import` to import Foundation,
// it would execute earlier than we have assigned the global variable.
// This is why we have to use CommonJS require() here since it doesn't
// have the hoisting behavior.
// window.jQuery = $;
// require('foundation-sites');

// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
// import './lib/foundation-explicit-pieces';

// $( document ).foundation();

// document.addEventListener('DOMContentLoaded', function(){

window.onload = function() {

  "use strict";

  document.getElementById('contact-form').addEventListener('submit', function(e){
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    const request = new XMLHttpRequest()

    request.onreadystatechange = function(){

      if (request.status >= 200 && request.status < 400) {
        // Success!
        const resp = request.responseText;
        document.getElementById('form-result').innerHTML = resp;
        form.reset();
      } else {
        // We reached our target server, but it returned an error
        // TODO
      }

    }

    request.open(form.method, form.action)
    request.send(data)
  });

  function bubbles() {

    const bubblesClass = document.querySelectorAll('.major.bubbles');

    const rnd = function(m, n) {
      m = parseInt(m);
      n = parseInt(n);
      return Math.floor(Math.random() * (n - m + 1)) + m;
    };

    const size = rnd(40, 80) / 10;

    bubblesClass.forEach(function (element) { // Add item to closure
      const bubbleCount = (parseFloat(getComputedStyle(element, null).width.replace('px', '')) / 50) * 10;
      for (var i = 0; i <= bubbleCount; i++) {
        element.insertAdjacentHTML('beforeend',
          '<span class="particle" style="top:' +
          rnd(20, 80) +
          "%; left:" +
          rnd(0, 95) +
          "%; width:" +
          size +
          "px; height:" +
          size +
          "px; animation-delay: " +
          rnd(0, 30) / 10 +
          's;"></span>'
        );
      }
    });
  }

  bubbles();

  // lazySizes.cfg.lazyClass = 'lazy';

  // document.addEventListener('lazybeforeunveil', function(e){
  //     var bg = e.target.getAttribute('data-bg');
  //     if(bg){
  //       e.target.style.backgroundImage = bg;
  //     }
  // });

}
// })

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

window.addEventListener('load', AOS.refresh);

const lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazy",
  load_delay: 300
});

lazyLoadInstance.update();

const headings = new Widow({words: 2, elements: 'h1, h2, h3', warnings: false});
// const prices = widow.removeWidowedElements('.prices');

if(window.innerHeight < window.innerWidth){
  const paragraphs = new Widow({words: 4, elements: '#maincontent p', warnings: false});
};

window.addEventListener('load', () => {
  if (!navigator.serviceWorker) { return }
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    }).catch((err) => {
      console.log('SW registration failed', err)
    })
})