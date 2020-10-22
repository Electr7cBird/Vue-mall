<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="center"><slot name="center"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style scoped>
    .nav-bar {
        display: flex;
        line-height: 44px;  /* 有内容时，不需要设置高度，只要line-height就可以 */
        height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    }

    .left, .right {
        width: 60px;
    }

    /* flex为1，可以将剩余部分全部填满 */
    .center {
        flex: 1;
    }
</style>