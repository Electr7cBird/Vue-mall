<template>
  <div class="bottom-menu">
    <check-button
      class="select-all"
      :is-checked="isSelectAll"
      @click.native="checkClick"
    ></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product">去付款({{ checkLength }})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 1.使用filter
      /* return !(this.$store.state.cartList.filter(item => !item.checked).length) */
      /* 数字取反为false，0取反为true，这里通过长度来判断是否有checked为false(即不选中状态的)，如果有则不是全选状态 */

      // 2.使用find
      /* if(this.$store.state.cartList.length === 0) return false
          return !this.$store.state.cartList.find(item => !item.checked) */
      /* 同理，使用find查找是否有checked为false，如果有则返回取反后的值，值为false */

      // 3.使用遍历
      let isChecked = false;
      if (this.$store.state.cartList.length == 0) {
        return false;
      }
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          isChecked = false;
          return isChecked;
        }
      }
      return true;
    },
  },
  methods: {
    checkClick() {
        if(this.isSelectAll) {
            this.$store.state.cartList.forEach(item => item.checked = false)
        }else {
            this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
  },
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 49px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
  z-index: 999;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>