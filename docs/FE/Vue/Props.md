# Vue Props通信

## 场景

### 父子组件通信
1. props
1. $parent / $children（避免使用）
1. provide / inject
1. ref（可以获取子实例）
1. $attrs / $listeners（灵活）

### 兄弟组件通信
1. eventBus
1. vuex

### 跨级通信
1. eventBus（使用主要、可以触发）
1. Vuex（体积大）
1. provide / inject（冗余、需要一级一级传递）
1. $attrs / $listeners（更灵活、轻便）

## props
概念：父组件通过props的方式向子组件传递数据，而通过`$emit`子组件可以向父组件通信。

## parent
概念： 通过$parent和$children就可以访问组件的实例。
使用 `this.$parent`查找当前组件的父组件。
使用 `this.$children`查找当前组件的直接子组件，可以遍历全部子组件， 需要注意`$children`并不保证顺序，也不是响应式的。

## provide / inject
概念：provide/ inject 是vue2.2.0新增的api, 简单来说就是父组件中通过provide来提供变量, 然后再子组件中通过inject来注入变量。

```js
provide(){
  return{
    test:this
  }
},

// 子集
inject:['test'],
mounted(){
  console.log('---')
  console.log(this.test)
},
computed:{
  myzz(){ //使用计算属性动态监听上(n)级组件的某个属性变化
    return this.test.zz
  }
},
methods:{  //更改属性，同时我们的计算属性也会得到更新
  changeProvide(){
    this.test.zz = 'changed'
  }
},
```
## ref
概念：ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据

## attrs
概念：是vue2.4.0引入的该方法，为了解决跨多级的组件
使用props绑定来进行一级一级的信息传递, 如果D组件中状态改变需要传递数据给A, 使用事件系统一级级往上传递
使用eventBus,这种情况下还是比较适合使用, 但是碰到多人合作开发时, 代码维护性较低, 可读性也低
使用Vuex来进行数据管理, 但是如果仅仅是传递数据, 而不做中间处理,使用Vuex处理感觉有点大材小用了.

1. 多级传递props，
1. 
1. 

```vue
// father组件
<template>
  <div id="father">
    <Child :temp="tempdata" @tempFn="fatherFn" prop="$attrs 不会传递child 组件中定义的props值"></Child>
  </div>
</template>
<script>
  import Child from './child.vue'
  export default {
    components: { Child },
    data() {
      return {
        tempdata: 'i am father'
      }
    },
    methods: {
      fatherFn () {
        console.log('father function!')
      }
    }
  }
</script>

// child组件
<template>
  <div id="child">
    <Son v-bind="$attrs" v-on="$listener"></Son>
  </div>
</template>
<script>
import Son from './son.vue'
export default {
  components: { Son },
  props: {
    prop: String
  },
  data() {
    return {}
  },
  mounted() {
    // 结果显示为$attrs.temp，不包含prop
    console.log(this.$attrs)
    this.$emit('tempFn')
  },
  methods: {}
}
</script>

// son组件
<template>
  <div id="son">
    {{ $attrs.temp }}
  </div>
</template>
<script>
export default {
  prop: {},
  data() {
    return {}
  },
  mounted() {
    console.log(this.$attrs)
    this.$emit('tempFn')
  },
  methods: {}
}
</script>
```

## eventBus发布/订阅
概念：eventBus 又称为事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件， 所以组件都可以通知其他组件。

### 初始化

> 引用方式

```js
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
```

> 全局事件总线

它的工作原理是发布/订阅方法，通常称为 Pub/Sub 。

```js
// main.js
Vue.prototype.$bus = new Vue()

var EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
```

### 发送接收事件

```js
import { EventBus } from '../event-bus.js'
EventBus.$emit('aMsg', '来自A页面的消息')

EventBus.$on("aMsg", (msg) => {
  // A发送来的消息
  this.msg = msg
});
```

### 灾难
如果使用不善，EventBus会是一种灾难，到底是什么样的“灾难”了？大家都知道vue是单页应用，如果你在某一个页面刷新了之后，与之相关的EventBus会被移除，这样就导致业务走不下去。还要就是如果业务有反复操作的页面，EventBus在监听的时候就会触发很多次，也是一个非常大的隐患。这时候我们就需要好好处理EventBus在项目中的关系。通常会用到，在vue页面销毁时，同时移除EventBus事件监听。

1. 在多次建立接收，会触发多次。

> 移除事件

```js
// 移除应用内所有对此某个事件的监听
EventBus.$off('aMsg', {})
// 移除所有事件
EventBus.$off()
```

## Vuex状态机
[Vuex](https://vuex.vuejs.org/zh/)是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化. Vuex 解决了多个视图依赖于同一状态和来自不同视图的行为需要变更同一状态的问题，将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上。

### 特点

> 单向数据流

![](https://vuex.vuejs.org/flow.png)

![](https://vuex.vuejs.org/vuex.png)

### 属性
State , Getter , Mutation , Action , Module
```js
```