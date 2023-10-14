// Accordion toggle
// ----------------------------------------------------------------
const accordionTrigger = document.getElementsByClassName('js-accordionTrigger');
if (accordionTrigger.length) {
  for (i = 0; i < accordionTrigger.length; i++) {
    accordionTrigger[i].onclick = function () {
      if (this.parentNode.hasAttribute('data-accordion-state')) {
        this.parentNode.removeAttribute('data-accordion-state');
        this.setAttribute('aria-expanded', false);
        hashUnset();

      } else {
        this.parentNode.setAttribute('data-accordion-state', 'active');
        this.setAttribute('aria-expanded', true);

        var hash = '';
        if (this.hasAttribute('data-id')) {
          hash = decodeURI(this.getAttribute('data-id'));
        } else {
          hash = decodeURI(this.getAttribute('id'));
        }
        hashSet(hash);
      }
    };
  }
}

// Scrolls user to proper area when link with associated hash
// is clicked. If it goes to an accordion then accordion
// becomes activated after scrolling.
// ----------------------------------------------------------------
var sidebarAccordionTrigger = document.querySelectorAll('.js-hashSet');
if (sidebarAccordionTrigger.length) {
  for (i = 0; i < sidebarAccordionTrigger.length; i++) {
    sidebarAccordionTrigger[i].onclick = function(e) {
      e.preventDefault();

      var hash = decodeURI(this.getAttribute('href').substr(1));
      hashSet(hash);
      document.getElementById(hash).scrollIntoView(true);
      document.getElementById(hash).focus();
    };
  }
}