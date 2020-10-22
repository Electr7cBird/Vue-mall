<template>
  <div class="goods-item" @click="goodsDetail">
      <img :src="showImage" alt="" @load="imageLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'GoodsListItem',
    props: {
        goodsItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        showImage() {
            return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods: {
        imageLoad() {
            this.$bus.$emit('imageLoad')
        },
        goodsDetail() {
            this.$router.push('/detail/' + this.goodsItem.iid)
        }
    }
}
</script>

<style scoped>

    .goods-item {
        width: 47%;
        position: relative;
        padding-bottom: 40px;
    }
    
    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-item:nth-of-type(odd) {
        margin-left: 1%;
    }

    .goods-item:nth-of-type(even) {
        margin-right: 1%;
    }

    .goods-info {
        font-size: 14px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 5px;
        text-align: center;
        overflow: hidden;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .goods-info span {
        text-align: center;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") no-repeat;
        background-size: 14px;
    }

</style>