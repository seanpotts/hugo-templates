// Remove URL ID hash if accordion button is closed
function hashUnset() {
  url = window.location.href.split('#')[0];
  window.history.replaceState('', '', url);
}