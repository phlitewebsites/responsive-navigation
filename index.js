var document = global.document;

var assign = require('lodash.assign');
var forEach = require('lodash.foreach');
var clas = require('clas');

var elButton;
var elClose;
var elMenu;
var elNav;
var elNavList;
var elOpen;
var elOverlay;
var opts;

module.exports = function (elems, options) {
  if (typeof elems === 'string') elems = [elems];
  options = options || {};

  opts = assign({
    openElemID: 'offcanvas-menu__open',
    wrapID: 'body__content',
    overlayID: 'body__overlay',
    menuClass: 'offcanvas-menu',
    navClass: 'offcanvas-menu__navigation',
    activeClass: 'offcanvas-menu--active',
    closeClass: 'offcanvas-menu__close',
    listClass: 'offcanvas-menu__list',
    buttonClass: 'offcanvas-menu__toggle-nested',
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
  elOpen = document.getElementById('offcanvas-menu__open');
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
  clas.toggle(document.documentElement, opts.activeClass);
};

var addSubMenu = function (el) {
  var elToggleButton = elButton.cloneNode(true);

  elToggleButton.addEventListener('click', function () {
    clas.toggle(el, 'nested-open');
  });

  el.insertBefore(elToggleButton, el.firstChild);
};

var cloneItems = function (lists) {
  var error = null;

  forEach(lists, function (listID, listNo) {
    var list = document.querySelector(listID);
    if (list === null) {
      error = true;
      return;
    }
    list = list.cloneNode(true);

    forEach(list.querySelectorAll('li'), function (el, idx) {
      if (el.parentNode !== list ||
        el.getAttribute('data-offcanvasmenu') === 'false') return;

      if (el.querySelectorAll('ul').length) addSubMenu(el);

      el.className = 'subnav' + listNo;
      elNavList.appendChild(el);
    });
  });

  return {error: error};
};
