<template>
  <div id="app" @mousewheel.prevent>
    <!-- Detail里的数据不需要保留，每次都需要获取新的页面的内容，所以要排除掉Detail -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
  @import "./assets/css/base.css";

  #app {
    position: relative;
  }
</style>
