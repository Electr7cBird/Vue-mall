<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    props: {
        link: String,
        activeColor: {
            type: String,
            default: 'deeppink'
        }
    },
    data() {
        return {}
    },
    computed: {
        isActive() {
            /* 
                /home -> item1(/home) = true
                /home -> item1(/category) = false
                /home -> item1(/shopcart) = true
                /home -> item1(/profile) = true
            */
            /* 如果在route的path中找到了this.link，那么=1，否则=-1，这里判断如果处于活跃状态的path和link不相等，则不是活跃的 */
            return this.$route.path.indexOf(this.link) !== -1
        },
        activeStyle() {
            /* 
                三目运算符：
                    如果a(this.isActive)为真，则返回?后面的b({color: this.activeColor})，否则返回c({}空值)
             */
            return this.isActive ? {color: this.activeColor}: {}
        }
    },
    methods: {
        itemClick() {
            this.$router.push(this.link)
        }
    }
}
</script>

<style scoped>

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

</style>