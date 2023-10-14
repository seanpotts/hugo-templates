// Hash matching
function hashSet(hash) {
  if (hash) {
    // Only hashes if useful to hash. Otherwise resets page hashing.
    if (hash !== 'start-of-page' && hash !== 'start-of-content' && hash !== 'table-of-contents') {
      window.history.replaceState('', '', window.location.pathname + '#' + hash);
    } else {
      window.history.replaceState('', '', window.location.pathname);
    }


    // If element clicked is a button then focus it, otherwise focus the above element,
    // which should always be an anchor.

    // Typical buttons
    if (document.getElementById('id-' + hash)) {
      document.getElementById('id-' + hash).parentNode.setAttribute('data-accordion-state', 'active');

      // Make better sometime. Vocabulary and verbs pages have hidden buttons at :md so
      // can't focus them. Fix below will check for md:hidden class and focus button or
      // link based on that.
      if (document.getElementById('id-' + hash).classList.contains('md:hidden')) {
        document.getElementById(hash).parentNode.focus();
      } else {
        document.getElementById('id-' + hash).focus();
      }

    // Link
    } else {
      document.getElementById(hash).parentNode.focus();
    }
  }
}
hashSet();