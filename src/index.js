/*
 * @CreateTime: Jun 14, 2018 12:21 PM
 * @Author: NISAL
 * @Contact: 535964903@qq.com
 * @Last Modified By: NISAL
 */
import { $$, rmDup } from './utils/utils';

let BASE_SPEED = 100;
let BASE_DIS = 100;
let BASE_DEPTH = 0;
let BASE_REVERSE = true;

let CLIENT_HEIGHT = document.documentElement.clientHeight;
let CLIENT_WIDTH = document.documentElement.clientWidth;

window.addEventListener('resize', function() {
  CLIENT_HEIGHT = document.documentElement.clientHeight;
  CLIENT_WIDTH = document.documentElement.clientWidth;
});

let counter = 0;
/**
 * 构造函数
 * @param {*} options 
 */
function AnyParallax(...options) {
  this.els = [];

  this.list = this._handelOptions(options);

  this._moveBinder = this._move.bind(this);

  this._bind();
}




/**
 * 绑定事件
 */
AnyParallax.prototype._bind = function() {
  window.addEventListener('mousemove', this._moveBinder);
}




/**
 * 事件处理程序
 * @param {*} e 
 */
AnyParallax.prototype._move = function(e) {
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
AnyParallax.prototype._handelOptions = function(options) {
  let arr = [];
  
  if (Array.isArray(options[0])) options = options[0];
  
  // 如果配置项是数组 则遍历
  for (let v of options.values()) {
    if ((v instanceof HTMLElement) || typeof v === 'string'){
      // 如果是字符串 或者dom元素
      arr.push(...this._parseOption({ el: v }));
    } else {
      // 如果不是 那就是对象
      arr.push(...this._parseOption(v))
    }
  }

  return arr;
}




/**
 * 生成最终配置项
 * @param {*} option 
 */
AnyParallax.prototype._parseOption = function(option) {
  let opts = [];

  if (Array.isArray(option.el)) {
    // 如果el是数组 则遍历生成每一个对应的配置项
    let normalizeOpt = Object.assign({}, this._normalizeOption(option));

    for (let v of option.el.values()) {
      normalizeOpt.el = v;
      opts.push(Object.assign({}, normalizeOpt));
    }

  } else {
    // 不是数组则直接push进去
    opts.push(this._normalizeOption(option));
  }

  // 对所有配置项处理 如果el是选择器 则转成真实dom
  let resArr = [];

  opts.forEach(opt => {

    // 如果是dom元素直接添加
    if (opt.el instanceof HTMLElement && (!this.els.includes(opt.el))) {
      this.els.push(opt.el);
      opt.el.style.transition = `transform ${ opt.speed / 1000 }s cubic-bezier(0.960, 1.005, 0.885, 1.035)${ opt.el.style.transition ? opt.el.style.transition : '' }`;
      opt.el.style.transform = `scale(${ 1 - opt.depth }, ${ 1 - opt.depth })`;
      resArr.push(Object.assign(opt, {el: [opt.el]}));
      return;
    }
    
    // 如果不是 则选择元素 每个元素对应配置项
    let els = $$(opt.el);

    if (els.length) {
      els = els.filter(el => !this.els.includes(el));

      this.els.push(...els);

      if (els.length) {
        els.forEach(el => {
          el.style.transition = `transform ${ opt.speed / 1000 }s cubic-bezier(0.960, 1.005, 0.885, 1.035)${ el.style.transition ? el.style.transition : '' }`;
          el.style.transform = `scale(${ 1 - opt.depth }, ${ 1 - opt.depth })`;
        });
        resArr.push(Object.assign(opt, { el: els }));
      }
    }
  });
  
  return resArr;
}




/**
 * 标准化配置项
 * @param {*} option 
 */
AnyParallax.prototype._normalizeOption = function(option) {
  if (!('depth' in option)) option.depth = BASE_DEPTH;
  if (!('speed' in option)) option.speed = BASE_SPEED;
  if (!('distance' in option)) option.distance = BASE_DIS;
  if (!('reverse' in option)) option.reverse = BASE_REVERSE;
  option.id = counter ++;

  option.remove = this._remove.bind(this, option.id);

  return option;
}




/**
 * 通过id删除
 * @param {*} id 
 */
AnyParallax.prototype._remove = function(id) {
  if (!this.list.length) return;

  let index = this.list.findIndex(l => l.id === id);

  this.list[index].el.forEach(el => {
    el.style.transform = '';
    this.els.splice(this.els.indexOf(el), 1);
  });
  
  this.list.splice(index, 1);
}




/**
 * 添加
 * @param {*} options 
 */
AnyParallax.prototype.add = function(...options) {
  this.list = this._handelOptions(options).concat(this.list);
}




/**
 * 移除
 * @param {*} condition 
 */
AnyParallax.prototype.remove = function(...condition) {
  if (Array.isArray(condition[0])) condition = [condition[0]];

  let els = [];

  condition.forEach(c => {
    if (typeof c === 'string') {
      els.push(...$$(c));
    } else {
      els.push(c);
    }
  });

  els = rmDup(els);

  els.forEach(el => {
    this.list.forEach(l => {
      l.el.forEach(e => {
        if (e === el) {
          el.style.transform = '';
          l.el.splice(l.el.indexOf(e), 1);
          this.els.splice(this.els.indexOf(e) , 1)
        }
      });

      if (!l.el.length) {
        this.list.splice(this.list.indexOf(l), 1);
      }
    });
  });
}




export default AnyParallax;
