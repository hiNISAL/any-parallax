import { $$ } from './utils/utils';

let BASE_SPEED = 100;
let BASE_DIS = 10;

let CLIENT_HEIGHT = document.documentElement.clientHeight;
let CLIENT_WIDTH = document.documentElement.clientWidth;

let list = [];

/**
 * 入口函数
 * @param {*} options 
 */
function AnyParallax(options) {
  
  list = handelOptions(options);

  bind();

  return {
    instances: list,
  }
}




/**
 * 绑定事件
 */
function bind() {
  window.addEventListener('mousemove', move);
}




/**
 * 事件处理程序
 * @param {*} e 
 */
function move(e) {
  const { clientX, clientY } = e;

  let wRate = (clientX / CLIENT_WIDTH) - 0.5;
  let hRate = (clientY / CLIENT_HEIGHT) - 0.5;

  for (let v1 of list.values()) {
    for (let v2 of v1.el.values()) {
      // v2.style.transform = `scale(2, 2)`;
      v2.style.transform = `translate3d(${ -wRate * 200 }px, ${ -hRate * 400 }px, 0)`;
    }
  }
}



/**
 * 处理配置项
 * @param {*} options 
 */
function handelOptions(options) {
  let arr = [];

  if (!Array.isArray(options)) options = [options];
  
  // 如果配置项是数组 则遍历
  for (let v of options.values()) {
    if ((v instanceof HTMLElement) || typeof v === 'string'){
      // 如果是字符串 或者dom元素
      arr.push(...parseOption({ el: v }));
    } else {
      // 如果不是 那就是对象
      arr.push(...parseOption(v))
    }
  }

  return arr;
}




/**
 * 生成最终配置项
 * @param {*} option 
 */
function parseOption(option) {
  let opts = [];

  if (Array.isArray(option.el)) {
    // 如果el是数组 则遍历生成每一个对应的配置项
    let normalizeOpt = Object.assign({}, normalizeOption(option));

    for (let v of option.el.values()) {
      normalizeOpt.el = v;
      opts.push(Object.assign({}, normalizeOpt));
    }

  } else {
    // 不是数组则直接push进去
    opts.push(normalizeOption(option));
  }

  // 对所有配置项处理 如果el是选择器 则转成真实dom
  let resArr = [];

  opts.forEach(opt => {

    // 如果是dom元素直接添加
    if (opt.el instanceof HTMLElement) {
      opt.el.style.transition = `transform .3s cubic-bezier(0.960, 1.005, 0.885, 1.035)${ opt.el.style.transition ? opt.el.style.transition : '' }`;
      resArr.push(Object.assign(opt, {el: [opt.el]}));
      return;
    }
    
    // 如果不是 则选择元素 每个元素对应配置项
    let els = $$(opt.el);

    if (els.length) {
      els.forEach(el => (el.style.transition = `transform .3s cubic-bezier(0.960, 1.005, 0.885, 1.035)${ el.style.transition ? el.style.transition : '' }`));
      resArr.push(Object.assign(opt, { el: els }));
    }
  });

  return resArr;
}




/**
 * 标准化配置项
 * @param {*} option 
 */
function normalizeOption(option) {
  return option;
}

export default AnyParallax;
