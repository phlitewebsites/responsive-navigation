(function(doc, proto) {

  try {
    doc.querySelector(':scope body');
  } catch (err) {
    ['querySelector', 'querySelectorAll'].forEach(function(method) {
      var native = proto[method];
      proto[method] = function(selectors) {
        if (/(^|,)\s*:scope/.test(selectors)) {
          var id = this.id;
          this.id = 'ID_' + Date.now();
          selectors = selectors.replace(/((^|,)\s*):scope/g, '$1#' + this.id);
          var result = doc[method](selectors);
          this.id = id;
          return result;
        } else {
          return native.call(this, selectors);
        }
      };
    });
  }

})(window.document, Element.prototype);
