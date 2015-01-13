var doc = document;
var support = false;

module.exports = (function() {
  var transform = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
  var element = doc.createElement('div');
  var ii = 0;

  while (ii++ < transform.length) {
    if (element.style[transform[ii]] !== undefined) support = true;
  }

  doc.documentElement.className += (support ? ' ' : ' no-') + 'csstransforms';

  return support;
})();
