'use strict'

var clas = require('clas')
var forEach = require('lodash.foreach')
var extend = require('extend')
var doc = global.document

var opts = {
  openElemID: 'responsive-navigation__open',
  wrapID: 'body__content',
  overlayID: 'body__overlay',
  menuClass: 'responsive-navigation',
  navClass: 'responsive-navigation__navigation',
  activeClass: 'responsive-navigation--active',
  closeClass: 'responsive-navigation__close',
  listClass: 'responsive-navigation__list',
  buttonClass: 'responsive-navigation__toggle-nested',
  closeText: '<div>Close</div>'
}

module.exports = function (elems, options) {
  if (options) extend(opts, options)

  /**
  * Site overlay
  */
  var elOverlay = doc.createElement('div')
  elOverlay.id = opts.overlayID
  elOverlay.className = opts.overlayID
  elOverlay.addEventListener('click', toggleMenu)

  /**
  * Open button
  */
  var elOpen = doc.getElementById(opts.openElemID)
  elOpen.addEventListener('click', toggleMenu)

  /**
  * Close button
  */
  var elClose = doc.createElement('div')
  elClose.id = opts.closeClass
  elClose.className = opts.closeClass
  elClose.innerHTML = opts.closeText
  elClose.addEventListener('click', toggleMenu)

  /**
  * Nav list
  */
  var elNavList = doc.createElement('ul')
  elNavList.id = opts.listClass
  elNavList.className = opts.listClass
  cloneItems(elems, elNavList)

  /**
  * Nav
  */
  var elNav = doc.createElement('nav')
  elNav.id = opts.navClass
  elNav.className = opts.navClass
  elNav.appendChild(elNavList)

  /**
  * Menu
  */
  var elMenu
  elMenu = doc.createElement('div')
  elMenu.id = opts.menuClass
  elMenu.className = opts.menuClass
  elMenu.appendChild(elClose)
  elMenu.appendChild(elNav)

  /**
  * Insert Menu into the DOM
  */
  doc.body.appendChild(elMenu)
  doc.getElementById(opts.wrapID).appendChild(elOverlay)
}

/**
* Helper Functions
*/
var toggleMenu = function () {
  clas.toggle(doc.documentElement, opts.activeClass)
}

var addSubMenu = function (el) {
  var elToggleButton = doc.createElement('div')
  elToggleButton.className = opts.buttonClass
  elToggleButton.addEventListener('click', function () {
    clas.toggle(el, 'nested-open')
  })

  el.insertBefore(elToggleButton, el.firstChild)
}

function cloneItems (lists, elNavList) {
  if (typeof lists === 'string') {
    lists = [lists]
  }

  forEach(lists, function (listSelector, index) {
    var list = doc.querySelector(listSelector).cloneNode(true)

    forEach(list.querySelectorAll('li'), function (el, index) {
      if (el.parentNode !== list ||
        el.getAttribute('data-offcanvasmenu') === 'false') return

      if (el.querySelectorAll('ul').length) addSubMenu(el)

      el.className = ''
      elNavList.appendChild(el)
    })
  })
}
