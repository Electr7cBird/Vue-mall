<template>
  <div>
      <nav-bar>
          <div slot="left" class="back">
              <img src="~assets/img/common/back.svg" alt="" @click="backClick">
          </div>
          <div slot="center" class="title">
              <div v-for="(item , index) in titles" 
              class="title-item" 
              :class="{active: index == currentIndex}"
              @click="titleClick(index)">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    props: {
		  titleInfos: {
		    type: Array,
        default: () => {
          return ['商品', '参数', '评论', '推荐']
        }
      },
      currentIndex: {
		    type: Number,
            default: 0
      }
    },
    data() {
        return {
            titles: ['商品','参数','评论','推荐'],
        }
    },
    methods: {
        titleClick(index) {
            this.$emit('titleClick', index)
        },
        backClick() {
            this.$router.back()
        }
    }
}
</script>

<style>

    .title {
        display: flex;
        font-size: 12px;
    }

    .title-item {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);
    }

    .back {
        display: table;
        margin-left: 19px;
    }

    .back img {
        vertical-align: middle;
        
    }

</style>