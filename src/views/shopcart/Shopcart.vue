<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartCount }})</div>
    </nav-bar>
    <cart-list :cart-list="cartList"></cart-list>
    <main-tab-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import MainTabBar from "components/content/mainTabbar/MainTabBar";
import CartList from "./childComps/CartList"

export default {
  name: "Shopcart",
  components: {
    NavBar,
    MainTabBar,
    CartList
  },
  computed: {
    cartList() {
      return this.$store.getters.cartList;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>