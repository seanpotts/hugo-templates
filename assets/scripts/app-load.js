// Onload checks if there is a hash in the link, and if there
// is tries to match it with an accordion to activate it.
// ----------------------------------------------------------------
if (window.location.hash) {
  const hash = decodeURI(window.location.hash.substr(1));
  const findHashLocation = document.querySelector('.js-accordionTrigger[data-id="' + hash + '"]');
  if (findHashLocation) {
    document.querySelectorAll('[data-id="' + hash + '"]')[0].setAttribute('aria-expanded', true);
    document.querySelectorAll('[data-id="' + hash + '"]')[0].parentNode.setAttribute('data-accordion-state', 'active');
  }
}