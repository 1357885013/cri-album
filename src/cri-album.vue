<template>
  <div class="home">
    <div class="imgs" @resize="resize"
         v-bind:style="{ display: 'grid', 'grid-template-rows': 'repeat(auto-fill,16px)', 'grid-template-columns': 'repeat(auto-fill,16px)',}">
      <littleImg :blockHeight="blockHeight" :blockWidth="blockWidth"
                 :gridSize="gridSize"
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
      gridSize: 38,
      testMockVal: "test",
      picData: {},
      gridStyle: {},
      blockSize: 312,
      picturesIndex: {}
    }
  },
  components: {
    littleImg
  },
  computed: {
    blockWidth: function () {
      let remainder = this.blockSize % this.gridSize;
      let widthGridCount = parseInt(this.blockSize / this.gridSize);
      // let remainderEach = remainder / widthGridCount
      // return blockSize + parseInt(remainderEach);
      // 让 单位长宽正好是gridSize的整数倍
      if (remainder > this.gridSize / 2) {
        this.blockSize = this.blockSize + this.gridSize - remainder;
        // widthGridCount++;
      } else {
        this.blockSize -= remainder;
        // widthGridCount--;
      }
      return this.blockSize
    },
    blockHeight: function () {
      return this.gridSize * Math.round(this.blockWidth / this.gridSize * 0.8);
    },
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
  grid-gap: 3px;
  /*overflow: hidden;*/
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
