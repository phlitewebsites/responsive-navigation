(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){require(3)},{}],2:[function(require,module,exports){module.exports=function addEventListener(el,event,cb){if(el.addEventListener){el.addEventListener(event,cb)}else{el.attachEvent("on"+event,cb)}}},{}],3:[function(require,module,exports){require(4);var addEventListener=require(2);var clas=require(5);var doc=document;var offcanvasmenu,opts,elOverlay,elMenu,elClose,elMenuList,elButton;module.exports=offcanvasmenu=function(elems){if(typeof elems=="string")elems=[elems];opts={openElemID:"menu__open",wrapID:"body__wrap",overlayID:"body__overlay",menuClass:"offcanvas-menu",activeClass:"offcanvas-menu--active",closeClass:"offcanvas-menu__close",listClass:"offcanvas-menu__list",buttonClass:"offcanvas-menu__toggle-nested",closeText:"&times;"};elOverlay=doc.createElement("div");elOverlay.id=opts.overlayID;elOverlay.className=opts.overlayID;elMenu=doc.createElement("nav");elMenu.id=opts.menuClass;elMenu.className=opts.menuClass;elClose=doc.createElement("div");elClose.className=opts.closeClass;elClose.innerHTML=opts.closeText;elMenuList=doc.createElement("ul");elMenuList.id=opts.listClass;elMenuList.className=opts.listClass;elButton=doc.createElement("div");elButton.className=opts.buttonClass;cloneItems(elems);elMenu.appendChild(elClose);elMenu.appendChild(elMenuList);addEventListener(elOverlay,"click",toggleMenu);addEventListener(doc.getElementById(opts.openElemID),"click",toggleMenu);addEventListener(elClose,"click",toggleMenu);doc.body.appendChild(elMenu);doc.getElementById(opts.wrapID).appendChild(elOverlay)};var toggleMenu=function(){clas.toggle(doc.documentElement,opts.activeClass)};var addSubMenu=function(el){var elToggleButton=elButton.cloneNode(true);addEventListener(elToggleButton,"click",function(){clas.toggle(el,"nested-open")});el.insertBefore(elToggleButton,el.firstChild)};var cloneItems=function(lists){lists.forEach(function(listID,idx){var list=doc.getElementById(listID).cloneNode(true);[].forEach.call(list.querySelectorAll("li"),function(el,idx){if(el.parentNode!==list||el.getAttribute("data-offcanvasmenu")==="false")return;if(el.querySelectorAll("ul").length)addSubMenu(el);el.className="";elMenuList.appendChild(el)})})};offcanvasmenu(["pre-nav","main-nav","post-nav"])},{}],4:[function(require,module,exports){var doc=document;var support=false;module.exports=function(){var transform="transform WebkitTransform MozTransform OTransform msTransform".split(" ");var element=doc.createElement("div");var ii=0;while(ii++<transform.length){if(element.style[transform[ii]]!==undefined)support=true}doc.documentElement.className+=(support?" ":" no-")+"csstransforms";return support}()},{}],5:[function(require,module,exports){function indexOf(arr,item){return Array.prototype.indexOf.call(arr,item)}function get(element){return element.classList?element.classList:element.className.split(/\s+/)}function has(element,name){return element.classList?element.classList.contains(name):!!~indexOf(get(element),name)}function makeClassName(classes){return classes.join(" ").replace(/^\s+|\s+$/g,"")}function add(element,name){if(element.classList){element.classList.add(name)}else{var classes=get(element);var index=indexOf(classes,name);if(!~index){classes.push(name);element.className=makeClassName(classes)}}return element}function remove(element,name){if(element.classList){element.classList.remove(name)}else{var classes=get(element);var index=indexOf(classes,name);if(~index){classes.splice(index,1);element.className=makeClassName(classes)}}return element}function toggle(element,name){if(element.classList){element.classList.toggle(name);return element}else{return has(element,name)?remove(element,name):add(element,name)}}module.exports={get:get,has:has,add:add,remove:remove,toggle:toggle}},{}]},{},[1]);