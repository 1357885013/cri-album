<template>
  <div class="home">
    <div class="images" @resize="resize" ref="images"
         v-bind:style="{ 'grid-auto-rows': blockHeight+'px', 'grid-template-columns': 'repeat(auto-fill,'+blockWidth+'px)',}">
      <littleImg :blockHeight="blockHeight" :blockWidth="blockWidth"
                 :maxHeight=maxHeight
                 :src="pic.src" name="pic.name"
                 v-for="pic in pictures"></littleImg>
    </div>
  </div>
</template>

<script>
import littleImg from './components/littleImg.vue'

export default {
  props: {
    pictures: {
      type: Array,
      default: []
    },
    maxHeight: {
      type: Number,
      default: 499
    }
  },
  data: function () {
    return {
      width: 0,
      gridSize: 38,
      testMockVal: "test",
      picData: {},
      gridStyle: {},
      blockSize: 212,
      // private width
      PBlockWidth: 0,
      picturesIndex: {}
    }
  },
  components: {
    littleImg
  },

  computed: {
    blockWidth: function () {
      let result = Math.floor(this.width / Math.round(this.width / this.blockSize))
      console.log('block size:' + result)
      console.log('block size remain:' + this.width % result + '  grid size total remain: ')
      return result;
    },
    blockHeight: function () {
      return Math.round(this.blockWidth * 0.8);
    }
  },
  mounted() {
    let that = this;
    window.onresize = () => {
      return (() => {
        that.width = that.$refs.images.clientWidth;
      })()
    }
    setTimeout(function () {
      that.width = that.$refs.images.clientWidth;
    }, 200)
    this.$nextTick(() => {
      // BUG: 图片加载完成后出现了滚动条, 把宽度挤小了, 这个变化resize事件捕获不到.
      that.width = that.$refs.images.clientWidth;
    });
  },
  created() {
    for (let key in this.pictures) {
      this.pictures[key].height = '100px';
      this.pictures[key].oHeight = null;
      this.pictures[key].oWidth = null;
      this.pictures[key].resolved = false;
      this.pictures[key].index = parseInt(key);
      this.picturesIndex[this.pictures[key].name] = this.pictures[key];
    }
    console.log('params got')
    console.log(this.pictures);
  },
  methods: {
    resize: function (e) {
      console.log('resize')
      console.log(e)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.images
  display grid
  margin 10px
  grid-auto-flow row dense
  /*background-color black*/
  grid-gap 0
  /*overflow hidden*/
  justify-content space-between
</style>
