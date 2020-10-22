<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name: 'Toast',
    data() {
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        /* ES6写法：time默认1500 */
        show(message='默认值', time=1500) {
            this.isShow = true;
            this.message = message

            setTimeout(() => {
                this.isShow = false;
                this.message = ''
            }, time)
        }
    }
    /* props: {
        message: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        }
    } */
}
</script>

<style>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50% , -50%);
        background: rgba(0, 0, 0, 0.75);
        border-radius: 5px;
        padding: 8px 10px;
        color: #FFF;
        z-index: 999;
    }
</style>