<template>
  <div class="home">
    <div class="imgs" @resize="resize" ref="images"
         v-bind:style="{ display: 'grid', 'grid-template-rows': 'repeat(auto-fill,'+PGridSize+'px)', 'grid-template-columns': 'repeat(auto-fill,'+PGridSize+'px)',}">
      <littleImg :blockHeight="blockHeight" :blockWidth="blockWidth"
                 :gridSize="PGridSize"
                 :maxHeight=maxHeight
                 :src="pic.src" name="pic.name"
                 v-for="pic in pictures"></littleImg>
    </div>
  </div>
</template>

<script>
import littleImg from './components/littleImg.vue'

export default {
  name: 'home',
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
      width: 1000,
      gridSize: 38,
      PGridSize: 38,
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
      this.PGridSize = Math.floor(result / Math.round(result / this.gridSize))
      console.log('block size:' + result + '  grid size : ' + this.PGridSize)
      console.log('block size remain:' + this.width % result + '  grid size total remain: ' + this.width % this.PGridSize + '  grid size remain" ' + result % this.PGridSize)
      return result;
    },
    blockHeight: function () {
      return this.PGridSize * Math.round(this.blockWidth / this.PGridSize * 0.8);
    }
  },
  mounted() {
    let that = this;
    window.onresize = () => {
      return (() => {
        that.width = that.$refs.images.clientWidth;
      })()
    }
    that.width = that.$refs.images.clientWidth;
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

<style>
.folders {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  margin-bottom: 30px;

}

.imgs {
  margin: 10px;
  grid-auto-flow: row dense;
  background-color: black;
  grid-gap: 0px;
  /*overflow: hidden;*/
  justify-content: space-between;
}

.imgs > img {
  /*float: left;*/
  /*object-fit: cover;*/
}

.folders > div {
  float: left;
  margin: 10px;
}

.title {
  font-family: 'Microsoft Tai Le Bold', 'Microsoft Tai Le Regular', 'Microsoft Tai Le';
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.847058823529412);
  line-height: 28px;
  letter-spacing: 2px;

  margin-bottom: 5px;
}

.title > span {
  margin-left: 8px;
  font-family: 'Microsoft Tai Le';
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.447058823529412);
  line-height: 22px;
}
</style>
