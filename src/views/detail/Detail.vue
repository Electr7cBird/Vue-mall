<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      :current-index="currentIndex"
    />
    <scroll class="scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" />
      <detail-params-info ref="params" :param-info="paramsInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="goTop" v-show="isShowGoTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
/* import Toast from "components/common/toast/Toast" */

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import RecommendViewVue from "../home/childComps/RecommendView.vue";
import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";
import {BACKTOP_DISTANCE} from "common/const"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    GoodsList,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    /* Toast */
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      currentIndex: 0,
      message: '',
      show: false
    };
  },
  created() {
    /* 保存传入的iid */
    const iid = this.$route.params.iid;
    this.iid = iid;

    /* 根据iid请求详情数据 */
    getDetail(iid).then((res) => {
      const data = res.result;
      // 1.获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    }),
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
  },
  updated() {
    // 获取需要的四个offsetTop
    this._getOffsetTops();
  },
  methods: {
    _getOffsetTops() {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100);
    },
    contentScroll(position) {
      // 1.backTop是否显示
      this.isShowGoTop = -position.y > BACKTOP_DISTANCE;

      // 2.监听滚动到哪一个主题
      this._listenScrollTheme(-position.y);
    },
    _listenScrollTheme(position) {
      let length = this.themeTopY.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.themeTopY[i];
        /**
         * 判断的方案:
         *  方案一:
         *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
         *    优点: 不需要引入其他的内容, 通过逻辑解决
         *    缺点: 判断条件过长, 并且不容易理解
         *  方案二:
         *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
         *    优点: 简洁明了, 便于理解
         *    缺点: 需要引入一个较大的int数字
         * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
         * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
         */
        if (position >= iPos && position < this.themeTopY[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
          }
          break;
        }
      }
    },
    addToCart() {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        this.$store.commit('addCart', product)

        /* this.show = true;
        this.message = "加入购物车成功";
        setTimeout((res) => {
          this.show = false;
          this.message = ''
        }, 1500) */

        console.log(this.$toast)
        this.$toast.show("加入购物车成功")
    }
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  background-color: #fff;
  position: relative;
  z-index: 9;
}

.scroll {
  height: calc(100% - 44px);
}
</style>