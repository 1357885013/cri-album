<template>
  <div class="home">
    <div class="images" @resize="resize" ref="images"
         v-bind:style="{ 'grid-auto-rows': blockHeight+'px', 'grid-template-columns': 'repeat(auto-fill,'+blockWidth+'px)',}">
      <littleImg
          v-for="(pic,index) in pictures"
          :pic="pic"
          :index="index"
          :blockHeight="blockHeight"
          :blockWidth="blockWidth"
          :maxHeight=maxHeight>
        <template v-slot="prop">
          <slot :index="prop.index" :item="prop.item"></slot>
        </template>
      </littleImg>
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
      width: 1,
      gridSize: 38,
      testMockVal: "test",
      picData: {},
      gridStyle: {},
      blockSize: 212,
      // private width
      PBlockWidth: 0,
      picturesIndex: {},
      blockWidth: 0,
      blockHeight: 0,
    }
  },
  components: {
    littleImg
  },
  watch: {
    width: function (newV, oldV) {
      let result = Math.floor(this.width / Math.round(this.width / this.blockSize))
      this.blockWidth = result;
      console.log('block size:' + result)
      console.log('block size remain:' + this.width % result + '  grid size total remain: ')
      this.blockHeight = Math.round(this.blockWidth * 0.8);
    },
    blockSize: function (newV, oldV) {
      let result = Math.floor(this.width / Math.round(this.width / this.blockSize))
      this.blockWidth = result;
      console.log('block size:' + result)
      console.log('block size remain:' + this.width % result + '  grid size total remain: ')
      this.blockHeight = Math.round(this.blockWidth * 0.8);
    },
  },
  computed: {
  },
  mounted() {
    let that = this;
    window.onresize = () => {
      return (() => {
        that.width = that.$refs.images.clientWidth;
      })()
    }
    setInterval(function () {
      // BUG: 图片加载完成后出现了滚动条, 把宽度挤小了, 这个变化resize事件捕获不到.
      that.width = that.$refs.images.clientWidth;
    }, 1000)
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
  //margin 10px
  grid-auto-flow row dense
  /*background-color black*/
  grid-gap 0
  /*overflow hidden*/
  justify-content space-between

//transition 2s
</style>
