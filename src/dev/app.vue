<template>
  <div id="app">
    <div>
      <button @click="changeUrl">change url</button>
      <a-radio-group v-model="which" button-style="solid">
        <a-radio-button value="cri">
          cri-album
        </a-radio-button>
        <a-radio-button value="crimson">
          crimson-album
        </a-radio-button>
      </a-radio-group>
      <p class="title">图片<span>共21个</span></p>
      max height<a-slider v-model="maxHeight" :min="1" :max="2000"/>
      block size<a-slider v-model="blockSize" :min="1" :max="2000"/>
      block aspect ratio<a-slider v-model="blockAspectRatio" :step=0.1 :min="0.1" :max="5"/>
      <cri-album v-if="which==='cri'" :pictures="pictures" :max-height="maxHeight" :block-size="blockSize"
                 :block-aspect-ratio="blockAspectRatio">
        <template v-slot="{item,index}"><span class="img-title">{{ item.name }}</span></template>
      </cri-album>
      <crimson-album v-else :pictures="pictures" :max-height="maxHeight"/>
      <a-slider v-model="maxHeight" :min="1" :max="2000"/>
      <a-slider v-model="blockSize" :min="1" :max="2000"/>
    </div>
  </div>
</template>

<script>
import CrimsonAlbum from "../crimson-album";
import CriAlbum from "../cri-album";

export default {
  name: 'app',
  components: {CrimsonAlbum, CriAlbum},
  data: function () {
    return {
      pictures: [],
      maxHeight: 173,
      blockSize: 212,
      blockAspectRatio: 2,
      which: "cri"
    }
  },
  watch: {},
  computed: {},
  created() {
    this.pictures = [
      {src: "img/1994_1.gif", name: "1994_1"},
      {src: "img/1994_2.jpg", name: "1994_2"},
      {src: "img/1994_all.jpg", name: "1994_all", width: 1728, height: 1080},
      {src: "img/1994_close.jpg", name: "1994_close"},
      {src: "img/1994_love.jpg", name: "1994_love"},
      {src: "img/blackBorder.jpg", name: "blackBorder"},
      {src: "img/car.jpg", name: "car"},
      {src: "img/carInMountain.jpg", name: "carInMountain"},
      {src: "img/city.jpg", name: "city"},
      {src: "img/city_close.jpg", name: "city_close"},
      {src: "img/city_far.jpg", name: "city_far"},
      {src: "img/city_in_air.jpg", name: "city_in_air"},
      {src: "img/city_river.jpg", name: "city_river"},
      {src: "img/folder.svg", name: "folder"},
      {src: "img/game.jpg", name: "game"},
      {src: "img/girl.jpeg", name: "girl"},
      {src: "img/girlInBed.jpg", name: "girlInBed"},
      {src: "img/girlLayOnGround.jpg", name: "girlLayOnGround"},
      {src: "img/girl_small.jpg", name: "girl_small"},
      {src: "img/grablage.svg", name: "grablage"},
      {src: "img/jepan.jpg", name: "jepan"},
      {src: "img/logo.png", name: "logo"},
      {src: "img/road.jpg", name: "road"},
      {src: "img/warm.jpg", name: "warm"},
      {src: "img/镂空垃圾桶.svg", name: "镂空垃圾桶"}
    ]
    // 保存状态,方便调试
    let t = localStorage.getItem("which");
    if (t) this.which = t;
    let that = this;
    window.onbeforeunload = function () {
      localStorage.setItem("which", that.which);
    }
  },
  beforeDestroy() {
  },
  methods: {
    changeUrl: function () {
      let pics = this.pictures;
      window.pics = pics;
      let l = Math.round(Math.random() * (pics.length - 1));
      let r;
      do {
        r = Math.round(Math.random() * (pics.length - 1));
      } while (l === r && pics.length > 1)
      let temp = pics[l];
      this.$set(pics, l, pics[r]);
      this.$set(pics, r, temp);
      console.log(l + ' ' + r);
      for (let i = 0; i < pics.length; i++) {
        console.log(pics[i].src + '\n')
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.title
  font-family 'Microsoft Tai Le Bold', 'Microsoft Tai Le Regular', 'Microsoft Tai Le'
  font-weight 700
  font-style normal
  font-size 20px
  color rgba(0, 0, 0, 0.847058823529412)
  line-height 28px
  letter-spacing 2px
  margin-bottom 5px

  & > span
    margin-left 8px
    font-family 'Microsoft Tai Le'
    font-weight 400
    font-style normal
    font-size 14px
    color rgba(0, 0, 0, 0.447058823529412)
    line-height 22px

.img-title {
  color red;
}
</style>
