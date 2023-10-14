// Mobile navigation
// ----------------------------------------------------------------
const navigationMobileTrigger = document.getElementsByClassName('js-navigationMobileTrigger');

if (navigationMobileTrigger.length) {
  navigationMobileTrigger[0].onclick = function () {
    if (this.hasAttribute('data-navigation-state')) {
      this.setAttribute('aria-expanded', false);
      this.removeAttribute('data-navigation-state');
      document.body.removeAttribute('data-navigation-state');

    } else {
      this.setAttribute('aria-expanded', true);
      this.setAttribute('data-navigation-state', 'active');
      document.body.setAttribute('data-navigation-state', 'active');

    }
  };
}


// Handle resize events to reset navigation state if user goes above
// MD breakpoint (when navigation shifts).
// https://www.geeksforgeeks.org/how-to-wait-resize-end-event-and-then-perform-an-action-using-javascript/
// ----------------------------------------------------------------
var timeOutFunctionId;
var windowWidth = document.documentElement.clientWidth;

function resetNavigation() {
  if (document.body.hasAttribute('data-navigation-state')) {
    document.body.removeAttribute('data-navigation-state');
    navigationMobileTrigger[0].removeAttribute('data-navigation-state');
    document.activeElement.blur();
  }
}

window.addEventListener('resize', function() {
  var windowWidthResized = document.documentElement.clientWidth;
  if (windowWidthResized >= 768) {
    windowWidth = windowWidthResized;
    clearTimeout(timeOutFunctionId);
    timeOutFunctionId = setTimeout(resetNavigation, 200);
  }
});