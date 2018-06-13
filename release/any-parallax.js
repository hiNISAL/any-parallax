(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AnyParallax = factory());
}(this, (function () { 'use strict';

  function AnyParallax(options) {
    if (!this instanceof AnyParallax) {
      return new AnyParallax(options);
    }
    this._init(options);
  }

  AnyParallax.prototype._init = function(options) {
    
  };

  return AnyParallax;

})));
