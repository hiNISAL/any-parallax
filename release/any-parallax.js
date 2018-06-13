(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.AnyParallax = factory());
}(this, (function () { 'use strict';

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  function $$(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return [].concat(toConsumableArray(root.querySelectorAll(selector)));
  }

  var BASE_SPEED = 100;
  var BASE_DIS = 100;
  var BASE_DEPTH = 0;
  var BASE_REVERSE = true;

  var CLIENT_HEIGHT = document.documentElement.clientHeight;
  var CLIENT_WIDTH = document.documentElement.clientWidth;

  /**
   * 构造函数
   * @param {*} options 
   */
  function AnyParallax() {
    for (var _len = arguments.length, options = Array(_len), _key = 0; _key < _len; _key++) {
      options[_key] = arguments[_key];
    }

    this.list = this.handelOptions(options);

    this.moveBinder = this.move.bind(this);

    this.bind();
  }

  /**
   * 绑定事件
   */
  AnyParallax.prototype.bind = function () {
    window.addEventListener('mousemove', this.moveBinder);
  };

  /**
   * 事件处理程序
   * @param {*} e 
   */
  AnyParallax.prototype.move = function (e) {
    var clientX = e.clientX,
        clientY = e.clientY;


    var wRate = clientX / CLIENT_WIDTH - 0.5;
    var hRate = clientY / CLIENT_HEIGHT - 0.5;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.list.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v1 = _step.value;
        var distance = v1.distance,
            spped = v1.spped,
            depth = v1.depth,
            el = v1.el,
            reverse = v1.reverse;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = el.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var v2 = _step2.value;

            var thisWRate = wRate;
            var thisHRate = hRate;

            if (reverse) {
              thisWRate = -thisWRate;
              thisHRate = -thisHRate;
            }

            v2.style.transform = 'translate3d(' + thisWRate * distance + 'px, ' + thisHRate * distance + 'px, 0) scale(' + (1 - depth) + ', ' + (1 - depth) + ')';
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  /**
   * 处理配置项
   * @param {*} options 
   */
  AnyParallax.prototype.handelOptions = function (options) {
    var arr = [];
    console.log(options);
    if (Array.isArray(options[0])) options = options[0];

    // if (!Array.isArray(options)) options = [options];

    // 如果配置项是数组 则遍历
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = options.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var v = _step3.value;

        if (v instanceof HTMLElement || typeof v === 'string') {
          // 如果是字符串 或者dom元素
          arr.push.apply(arr, toConsumableArray(this.parseOption({ el: v })));
        } else {
          // 如果不是 那就是对象
          arr.push.apply(arr, toConsumableArray(this.parseOption(v)));
        }
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return arr;
  };

  /**
   * 生成最终配置项
   * @param {*} option 
   */
  AnyParallax.prototype.parseOption = function (option) {
    var opts = [];

    if (Array.isArray(option.el)) {
      // 如果el是数组 则遍历生成每一个对应的配置项
      var normalizeOpt = Object.assign({}, this.normalizeOption(option));

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = option.el.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var v = _step4.value;

          normalizeOpt.el = v;
          opts.push(Object.assign({}, normalizeOpt));
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    } else {
      // 不是数组则直接push进去
      opts.push(this.normalizeOption(option));
    }

    // 对所有配置项处理 如果el是选择器 则转成真实dom
    var resArr = [];

    opts.forEach(function (opt) {

      // 如果是dom元素直接添加
      if (opt.el instanceof HTMLElement) {
        opt.el.style.transition = 'transform ' + opt.speed / 1000 + 's cubic-bezier(0.960, 1.005, 0.885, 1.035)' + (opt.el.style.transition ? opt.el.style.transition : '');
        opt.el.style.transform = 'scale(' + (1 - opt.depth) + ', ' + (1 - opt.depth) + ')';
        resArr.push(Object.assign(opt, { el: [opt.el] }));
        return;
      }

      // 如果不是 则选择元素 每个元素对应配置项
      var els = $$(opt.el);

      if (els.length) {
        els.forEach(function (el) {
          el.style.transition = 'transform ' + opt.speed / 1000 + 's cubic-bezier(0.960, 1.005, 0.885, 1.035)' + (el.style.transition ? el.style.transition : '');
          el.style.transform = 'scale(' + (1 - opt.depth) + ', ' + (1 - opt.depth) + ')';
        });
        resArr.push(Object.assign(opt, { el: els }));
      }
    });

    return resArr;
  };

  /**
   * 标准化配置项
   * @param {*} option 
   */
  AnyParallax.prototype.normalizeOption = function (option) {
    if (!('depth' in option)) option.depth = BASE_DEPTH;
    if (!('speed' in option)) option.speed = BASE_SPEED;
    if (!('distance' in option)) option.distance = BASE_DIS;
    if (!('reverse' in option)) option.reverse = BASE_REVERSE;

    return option;
  };

  return AnyParallax;

})));
