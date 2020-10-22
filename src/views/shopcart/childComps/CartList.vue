<template>
  <div class="cart-list">
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
      <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartListItem from "./CartListItem"
import CartBottomBar from "./CartBottomBar"

export default {
    name: 'CartList',
    components: {
        CartListItem,
        CartBottomBar
    },
    props: {
        cartList: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        
    }
}
</script>

<style scoped>

</style>