<template>
  <div id="app">
    <div>
      <p class="title">图片<span>共21个</span></p>
      <a-slider v-model="maxHeight" :min="1" :max="2000"/>
      <!--      <crimson-album :pictures="pictures" :max-height="maxHeight"/>-->
      <cri-album :pictures="pictures" :max-height="maxHeight"/>
      <a-slider v-model="maxHeight" :min="1" :max="2000" @change="locationImages"/>
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
      maxHeight: 499
    }
  },
  watch: {},
  computed: {},
  created() {
    this.pictures = [
      {src: "img/1994_1.gif", name: "1994_1"},
      {src: "img/1994_2.jpg", name: "1994_2"},
      {src: "img/1994_all.jpg", name: "1994_all"},
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
  },
  methods: {}
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
