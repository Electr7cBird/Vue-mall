<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu class="tab-menu" :category="category" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" :data="[categoryContent]" ref="scroll">
        <div>
          <category-content
            class="category-right"
            :subcategory="showSubcategory"
          ></category-content>
          <tab-control
            :titles="['综合', '新品', '销量']"
            @itemClick="tabClick"
          ></tab-control>
          <goods-list :goods="showCategoryDetail"></goods-list>
        </div>
      </scroll>
    </div>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import TabMenu from "./childComps/TabMenu";
import CategoryContent from "./childComps/CategoryContent";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

export default {
  name: "Category",
  components: {
    MainTabBar,
    NavBar,
    TabMenu,
    CategoryContent,
    Scroll,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      category: [],
      categoryContent: {},
      currentIndex: -1,
      currentType: "pop",
    };
  },
  created() {
    // 1.请求分类数据
    this.Category();

    // 2.监听图片加载完成
    this.$bus.$on("imgLoad", () => {
      this.$refs.scroll.refresh();
    });
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryContent[this.currentIndex].subcategory;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryContent[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  methods: {
    Category() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.category = res.data.category.list;

        for (let i = 0; i < this.category.length; i++) {
          this.categoryContent[i] = {
            subcategory: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        this.CategoryContent(0);
      });
    },
    CategoryContent(index) {
      this.currentIndex = index;
      console.log(this.currentIndex);
      const mailKey = this.category[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryContent[index].subcategory = res.data;
        console.log(res);
        this.categoryContent = { ...this.categoryContent };
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.category[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryContent[this.currentIndex].categoryDetail[type] = res;
        console.log(res);
        this.categoryContent = { ...this.categoryContent };
      });
    },
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
    selectItem(index) {
      this.CategoryContent(index);
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}

#tab-content {
  height: 100%;
  flex: 1;
}
</style>