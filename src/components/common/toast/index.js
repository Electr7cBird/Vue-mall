import Toast from "./Toast.vue"

const obj = {}

/* 默认会有一个参数，Vue */
// 给Vue添加一个原型对象
obj.install = function (Vue) {
    // 1.创建组件构造器
    const toastConstrustor = Vue.extend(Toast)

    // 2.new的方式，根据组件构造器，可以创建出一个组件对象
    const toast = new toastConstrustor()

    // 3.将组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是上面的div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}

export default obj