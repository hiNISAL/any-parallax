# any-parallax

> 简单轻量的视差插件

> simple and light parallax plugin

# 安装 Install

`npm i any-parallax -S`

# 使用 Usage

- `browser`
```
<div id="i1"></div>
<div id="i2"></div>
<script src="any-parallax.js"></script>

new AnyParallax('#i1', '#i2');
```

- `commonjs`
```
const AP = require('any-parallax');

new AP(args);
```

- `ES Module`
```
import AP from 'any-parallax';

new AP(args)
```

# 参数 Args

可以传入一组选择器字符串，可以是数组，也可以不是，同时也可以传入dom元素。

A group of selector string, or an array, also can pass the real dom element.
```
<div class="a"><div>
<div class="a"><div>
<div id="b"><div>
<img src="exp" id="d">

let img = document.querySelector('img');
new AnyParallax(['.a', '#b', img]);

// or not an array
new AnyParallax('.a', '#b', img);
```

可以提供一些配置项，同时在配置项传递参数的时候提供的元素可以是数组，里面可以是选择器，也可以是dom元素。

Can provide options, you can set the option `el`. This option receive an array( selectors and real dom ).

不传递数组可以接收选择器或者dom元素。

If you not receive an array, also can receive the selector or real dom.

```
<div class="a"><div>
<div class="a"><div>
<div id="b"><div>
<div id="e"></div>
<div id="f"></div>
<img src="exp" id="d">

new AnyParallax([
  {
    el: '.a',
  },
  {
    el: '#b,
    speed: 300,
    distance: 100
  },
  {
    el: document.querySelector('#d'),
    depth: 0.05
  },
  {
    el: ['#e', '#f'],
    distance: 400
  }
]);

// or not an array
new AnyParallax(
  {
    el: '.a',
  },
  {
    el: '#b,
    speed: 300,
    distance: 100
  },
  {
    el: document.querySelector('#d'),
    depth: 0.05
  },
  {
    el: ['#e', '#f'],
    distance: 400
  }
);
```

## 配置项 Options

- distance
  - 偏移距离 (The distance of offset)
  - 类型 (type) : number
  - 默认值 (default) : 100

- depth
  - 深度 实际上是用scale模拟的(Depth, In fact use scaling simulation)
  - 类型 (type) : number
  - 默认值 (default) : 0

- speed
  - 移动速度 (the speed of move)
  - 类型 (type) : number
  - 默认值 (default) : 100

- reverse
  - 偏移方向与鼠标反向 (Reverse offset direction with the mouse)
  - 类型 (type) : boolean
  - 默认值 (default) : true

## 方法 Methods

- add
  - 动态添加 (Dynamically add)
  - 参数 (arguments)
    - options (same to constructor)

```
let ap = new AnyParallax(['.a', '#b']);

ap.add('#c');

ap.add({
  el: '#d',
  distance: 100
});
```

- remove
  - 删除 (remove)

```
let ap = new AnyParallax(['.a', '#b', '#c', '#d']);

ap.remove('.a');

ap.remove(['.a', '#b'])

ap.remove({ el: '#b' }, '#a');

ap.remove([{ el: '#b' }, '#a']);

ap.list[0].remove();
```
