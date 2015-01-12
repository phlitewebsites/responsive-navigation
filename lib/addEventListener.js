module.exports = function addEventListener(el, event, cb) {
  if (el.addEventListener) {
    el.addEventListener(event, cb);
  } else {
    el.attachEvent('on' + event, cb);
  }
};
