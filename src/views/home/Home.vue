<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      ref="scroll"
    >
      <home-swiper
        :banners="banners"
        @swiper-image-load="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 组件如果想监听点击(组件的原生事件)，必须加.native -->
    <back-top @click.native="goTop" v-show="isShowGoTop"></back-top>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
/* 首页独立组件 */
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

/* 公共组件 */
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import {debounce} from "common/utils";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

import {BACKTOP_DISTANCE} from "@/common/const";
import {backTopMixin} from "common/mixin";

/* 网络请求 */
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    MainTabBar
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemListener: null,
    };
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    /* 1.保存Y值 */
    this.saveY = this.$refs.scroll.scrollY

    /* 取消全局事件的监听 */
    this.$bus.$off('imageLoad', this.itemListener)
  },
  created() {
    // 1.请求多个数据
    this.homeMultidata();
    // 2.请求首页商品的数据
    this.homeGoods("pop");
    this.homeGoods("new");
    this.homeGoods("sell");

    /* 监听item中图片加载完成 */
    this.$bus.$on("imageLoad", () => {
      this.$refs.scroll.scroll.refresh();
    });
  },
  mounted() {
    /* this.$refs.scroll.refresh对函数进行防抖操作 */
    let newRefresh = debounce(this.$refs.scroll.refresh, 100)

    /* 对监听的事件进行保存 */
    this.itemListener = () => {newRefresh(20,30,'abc')}
    this.$bus.$on('imageLoad', this.itemListener)
  },
  methods: {
    /* 
      网络请求相关
     */
    homeMultidata() {
      getHomeMultidata().then((res) => {
        /* 这里的this就是当前components对象 */
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    homeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        /* 这种方法可以把所有获得的list列表全部push添加到data里的goods里的list中，和遍历方法添加效果一样，更简单 */
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishedPullUp();
      });
    },

    /* 
      事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    contentScroll(position) {
      /* 判断goTop是否显示 */
      this.isShowGoTop = -position.y > BACKTOP_DISTANCE;

      /* 决定tabControl是否有吸顶效果(position:fixed) */
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.homeGoods(this.currentType);

      /* 在页面加载完后刷新，消除无法滚动的bug */
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}

.scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>