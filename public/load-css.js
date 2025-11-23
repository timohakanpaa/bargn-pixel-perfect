// Polyfill for CSS preload with onload for older browsers
(function() {
  var link = document.querySelector('link[rel="preload"][as="style"]');
  if (link && !link.rel.includes('stylesheet')) {
    link.addEventListener('load', function() {
      this.rel = 'stylesheet';
    });
  }
})();
