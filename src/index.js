import { $$ } from './utils/utils';

let BASE_SPEED = 100;
let BASE_DIS = 100;
let BASE_DEPTH = 0;
let BASE_REVERSE = true;

let CLIENT_HEIGHT = document.documentElement.clientHeight;
let CLIENT_WIDTH = document.documentElement.clientWidth;

/**
 * 构造函数
 * @param {*} options 
 */
function AnyParallax(...options) {
  this.list = this.handelOptions(options);

  this.moveBinder = this.move.bind(this);

  this.bind();
}




/**
 * 绑定事件
 */
AnyParallax.prototype.bind = function() {
  window.addEventListener('mousemove', this.moveBinder);
}




/**
 * 事件处理程序
 * @param {*} e 
 */
AnyParallax.prototype.move = function(e) {
  const { clientX, clientY } = e;

  let wRate = (clientX / CLIENT_WIDTH) - 0.5;
  let hRate = (clientY / CLIENT_HEIGHT) - 0.5;

  for (let v1 of this.list.values()) {
    let { distance, spped, depth, el, reverse } = v1;
    for (let v2 of el.values()) {
      let thisWRate = wRate;
      let thisHRate = hRate;

      if (reverse) {
        thisWRate = -thisWRate;
        thisHRate = -thisHRate;
      }
      
      v2.style.transform = `translate3d(${ thisWRate * distance }px, ${ thisHRate * distance }px, 0) scale(${ 1 - depth }, ${ 1 - depth })`;
    }
  }
}



/**
 * 处理配置项
 * @param {*} options 
 */
AnyParallax.prototype.handelOptions = function(options) {
  let arr = [];
  console.log(options);
  if (Array.isArray(options[0])) options = options[0];

  // if (!Array.isArray(options)) options = [options];
  
  // 如果配置项是数组 则遍历
  for (let v of options.values()) {
    if ((v instanceof HTMLElement) || typeof v === 'string'){
      // 如果是字符串 或者dom元素
      arr.push(...this.parseOption({ el: v }));
    } else {
      // 如果不是 那就是对象
      arr.push(...this.parseOption(v))
    }
  }

  return arr;
}




/**
 * 生成最终配置项
 * @param {*} option 
 */
AnyParallax.prototype.parseOption = function(option) {
  let opts = [];

  if (Array.isArray(option.el)) {
    // 如果el是数组 则遍历生成每一个对应的配置项
    let normalizeOpt = Object.assign({}, this.normalizeOption(option));

    for (let v of option.el.values()) {
      normalizeOpt.el = v;
      opts.push(Object.assign({}, normalizeOpt));
    }

  } else {
    // 不是数组则直接push进去
    opts.push(this.normalizeOption(option));
  }

  // 对所有配置项处理 如果el是选择器 则转成真实dom
  let resArr = [];

  opts.forEach(opt => {

    // 如果是dom元素直接添加
    if (opt.el instanceof HTMLElement) {
      opt.el.style.transition = `transform ${ opt.speed / 1000 }s cubic-bezier(0.960, 1.005, 0.885, 1.035)${ opt.el.style.transition ? opt.el.style.transition : '' }`;
      opt.el.style.transform = `scale(${ 1 - opt.depth }, ${ 1 - opt.depth })`;
      resArr.push(Object.assign(opt, {el: [opt.el]}));
      return;
    }
    
    // 如果不是 则选择元素 每个元素对应配置项
    let els = $$(opt.el);

    if (els.length) {
      els.forEach(el => {
        el.style.transition = `transform ${ opt.speed / 1000 }s cubic-bezier(0.960, 1.005, 0.885, 1.035)${ el.style.transition ? el.style.transition : '' }`;
        el.style.transform = `scale(${ 1 - opt.depth }, ${ 1 - opt.depth })`;
      });
      resArr.push(Object.assign(opt, { el: els }));
    }
  });

  return resArr;
}




/**
 * 标准化配置项
 * @param {*} option 
 */
AnyParallax.prototype.normalizeOption = function(option) {
  if (!('depth' in option)) option.depth = BASE_DEPTH;
  if (!('speed' in option)) option.speed = BASE_SPEED;
  if (!('distance' in option)) option.distance = BASE_DIS;
  if (!('reverse' in option)) option.reverse = BASE_REVERSE;

  return option;
}

export default AnyParallax;
