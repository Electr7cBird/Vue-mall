<template>
  <div>
      <swiper ref="swiper" v-if="banners.length">
      <swiper-item v-for="(item , index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper , SwiperItem} from 'components/common/swiper'

export default {
    name: 'HomeSwiper',
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
		  swiperImageLoad() {
        this.$emit('swiperImageLoad')
      }
    }
}
</script>

<style>

</style>