let clipboard = new ClipboardJS('.js-copyButton', {
  target: function(trigger) {
    if (trigger.previousSibling.classList.contains('highlight')) {
      // trigger.innerText = "Copied to clipboard!";
      return trigger.previousSibling;
    }
  }
});