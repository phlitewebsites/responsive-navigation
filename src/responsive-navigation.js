const assign = require('object-assign');

var elButton;
var elClose;
var elMenu;
var elNav;
var elNavList;
var elOpen;
var elOverlay;
var opts;

module.exports = function (elems, options = {}) {
  if (typeof elems === 'string') elems = [elems];

  opts = assign({
    wrapID: 'body__content',
    overlayID: 'body__overlay',
    menuClass: 'responsive-navigation',
    activeClass: 'responsive-navigation--active',
    buttonClass: 'responsive-navigation__toggle-nested',
    closeClass: 'responsive-navigation__close',
    listClass: 'responsive-navigation__list',
    navClass: 'responsive-navigation__navigation',
    openElemID: 'responsive-navigation__open',
    closeText: '<div>&times; Close</div>'
  }, options);

  elOverlay = document.createElement('div');
  elOverlay.id = opts.overlayID;
  elOverlay.className = opts.overlayID;
  elOverlay.addEventListener('click', toggleMenu);

  elNavList = document.createElement('ul');
  elNavList.id = opts.listClass;
  elNavList.className = opts.listClass;

  elClose = document.createElement('div');
  elClose.id = opts.closeClass;
  elClose.className = opts.closeClass;
  elClose.innerHTML = opts.closeText;

  elNav = document.createElement('nav');
  elNav.id = opts.navClass;
  elNav.className = opts.navClass;
  elNav.appendChild(elNavList);
  elNav.appendChild(elClose);

  elMenu = document.createElement('div');
  elMenu.id = opts.menuClass;
  elMenu.className = opts.menuClass;
  elMenu.appendChild(elNav);
  elMenu.appendChild(elClose);

  elButton = document.createElement('div');
  elButton.className = opts.buttonClass;

  if (cloneItems(elems).error !== null) return;

  /**
   * Event Listeners
   */
  elOpen = document.getElementById('responsive-navigation__open');
  elOpen.addEventListener('click', toggleMenu);
  elClose.addEventListener('click', toggleMenu);

  /**
   * Insert elements into the DOM
   */
  document.body.appendChild(elMenu);
  document.getElementById(opts.wrapID).appendChild(elOverlay);
};

/**
 * Helper Functions
 */
var toggleMenu = function (event) {
  event.preventDefault();
  document.documentElement.classList.toggle(opts.activeClass);
};

var addSubMenu = function (el) {
  var elToggleButton = elButton.cloneNode(true);

  elToggleButton.addEventListener('click', function () {
    el.classList.toggle('nested-open');
  });

  el.insertBefore(elToggleButton, el.firstChild);
};

var cloneItems = function (lists) {
  var error = null;

  lists.forEach(function (listID, listNo) {
    var list = document.querySelector(listID);
    if (list === null) {
      error = true;
      return;
    }
    list = list.cloneNode(true);

    Array.prototype.forEach.call(list.querySelectorAll('li'), function (el, idx) {
      if (el.parentNode !== list ||
        el.getAttribute('data-responsive-navigation') === 'false') return;

      if (el.querySelectorAll('ul').length) addSubMenu(el);

      el.className = 'subnav' + listNo;
      elNavList.appendChild(el);
    });
  });

  return {error: error};
};
