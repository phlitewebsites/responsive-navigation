require('./transforms');

var addEventListener = require('./addEvent');
var doc = document;
var offcanvasmenu, opts, elOverlay, elMenu, elClose, elMenuList, elButton;

module.exports = offcanvasmenu = function(elems) {

  if (typeof elems == 'string') elems = [elems];

  opts = {
    openElemID  : 'menu__open',
    wrapID      : 'body__wrap',
    overlayID   : 'body__overlay',
    menuClass   : 'offcanvas-menu',
    activeClass : 'offcanvas-menu--active',
    closeClass  : 'offcanvas-menu__close',
    listClass   : 'offcanvas-menu__list',
    buttonClass : 'offcanvas-menu__toggle-nested',
    closeText   : '&times;',
  };

  elOverlay = doc.createElement("div");
  elOverlay.id = opts.overlayID;
  elOverlay.className = opts.overlayID;

  elMenu = doc.createElement("nav");
  elMenu.id = opts.menuClass;
  elMenu.className = opts.menuClass;

  elClose = doc.createElement("div");
  elClose.className = opts.closeClass;
  elClose.innerHTML = opts.closeText;

  elMenuList = doc.createElement("ul");
  elMenuList.id = opts.listClass;
  elMenuList.className = opts.listClass;

  elButton = doc.createElement("div");
  elButton.className = opts.buttonClass;

  cloneItems(elems);

  /*****************************************************************************
  * Append content to menu
  */
  elMenu.appendChild(elClose);
  elMenu.appendChild(elMenuList);

  /*****************************************************************************
  * Event Listeners
  */
  addEventListener(elOverlay, 'click', toggleMenu);
  addEventListener(doc.getElementById(opts.openElemID), 'click', toggleMenu);
  addEventListener(elClose, 'click', toggleMenu);


  /*****************************************************************************
  * Insert elements into the DOM
  */
  doc.body.appendChild(elMenu);
  doc.getElementById(opts.wrapID).appendChild(elOverlay);

};

/*******************************************************************************
* Helper Functions
*/
var toggleMenu = function() {
  doc.documentElement.classList.toggle(opts.activeClass);
};

var addSubMenu = function(el) {
  var elToggleButton = elButton.cloneNode(true);

  addEventListener(elToggleButton, "click", function() {
    el.classList.toggle("nested-open");
  });

  el.insertBefore(elToggleButton, el.firstChild);
};

var cloneItems = function(lists) {

  lists.forEach(function(listID, idx) {

    var list = doc.getElementById(listID).cloneNode(true);

    [].forEach.call(list.querySelectorAll('li'), function(el, idx) {

      if (el.parentNode !== list ||
          el.getAttribute("data-offcanvasmenu") === "false") return;

      if (el.querySelectorAll("ul").length) addSubMenu(el);

      el.className = "";
      elMenuList.appendChild(el);
    });

  });

};


////////////////////////////////////////////////////////////////////////////////

offcanvasmenu(['pre-nav', 'main-nav', 'post-nav']);
