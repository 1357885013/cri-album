<template>
  <div style="width: 100%;display: flex;flex-direction: row;">
    <div style="display:flex;flex-direction:column;height: 100%;">
      <img :src="'img/'+files[0]" ref="first image" class="img" alt="不支持的类型">
      <img :src="'img/'+files[1]" ref="first image" class="img" alt="不支持的类型">
    </div>
    <div style="width: 100%;height: inherit;">
      <img :src="'img/'+files[2]" ref="first image" class="img" alt="不支持的类型">
    </div>
  </div>
  <div>
    <img :src="'img/'+files[3]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[4]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[5]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[6]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[7]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[8]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[9]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[10]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[11]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[12]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[13]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[14]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[15]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[16]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[17]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[18]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[19]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[20]" ref="first image" class="img" alt="不支持的类型">
    <img :src="'img/'+files[21]" ref="first image" class="img" alt="不支持的类型">

  </div>
</template>

<script setup lang="ts">
const files = [
  '1350413J8-2.jpg',
  '14215462I-0.jpg',
  '15303388f39ed04871773a21856cb8b6.jpg',
  '1567963777552.jpeg',
  '1616209956278.jpeg',
  '1651926316593.jpeg',
  '1666514480358.jpg',
  '1994_1.gif',
  '1994_close.jpg',
  '2022-08-31_22.13.03.png',
  '2022-08-31_22.13.24.png',
  '20220406_134314.jpg',
  '20230827_064815.jpg',
  '20231031_233309.jpg',
  '20240511_223159.jpg',
  '25fb1b1cac9b6eced99c242261cf43fe_r.jpg',
  '2aeda48.jpg',
  '36bcd7b7030b8a6687060324c272c156879b9ed2eb76a370fd6e7ef3b5cb4bd7.gif',
  '4722ec674bafa5a9.jpg',
  'blackBorder.jpg',
  'C656ADA7EB37D2BBA1EF8610856503EB.jpg',
  'car.jpg',
  'carInMountain.jpg',
  'cb0d0cc45c89315482b79ecfac4b6135ce41586a5a8382c6d75f175d1314795f.jpg',
  'city.jpg',
  'city_close.jpg',
  'city_far.jpg',
  'city_in_air.jpg',
  'city_river.jpg',
  'ee44508f1d2cd960c5fea41cd464f7a8168164c2ca28ed608a045897c09f7f0f.jpg',
  'Elektrichka-Niko.png',
  'game.jpg',
  'girl.jpeg',
  'girlInBed.jpg',
  'girlLayOnGround.jpg',
  'Image_1713052950135.jpg',
  'image_editor_1686284465169.jpg',
  'image_editor_1704415716535.jpg',
  'img-535f7d2c3ca030e334f3ff73ca0e9678.jpg',
  'img-612aa71a4f81210ec2acded94e3cdc4a.jpg',
  'IMG_0014.JPG',
  'IMG_0016.JPG',
  'IMG_0060.JPG',
  'IMG_0065.JPG',
  'IMG_0339.JPG',
  'IMG_0507.PNG',
  'IMG_0509.PNG',
  'IMG_0510.PNG',
  'IMG_0514.PNG',
  'IMG_20141010_231227.jpg',
  'IMG_20150604_171931_1.jpg',
  'IMG_20160822_100134.jpg',
  'jepan.jpg',
  'mmexport1592702823971.jpg',
  'mmexport1633618417297.jpg',
  'mmexport1633618445972.jpg',
  'mmexport1633618549256.jpg',
  'mmexport1689490482124.jpg',
  'mmexport1716871274329.jpg',
  'Screenshot_2020-03-30-15-56-06-277_com.quark.browser.jpg',
  'Screenshot_20220313-091531.jpg',
  'share_32b446696e374cfed8e2300900ba8d2a+1.png',
  // 'share_d6e2c0ab915360a3578ecd7f6e76c4f7.mp4',
  'Snapshot (21).png',
  'Snapshot (7).png',
  'TIM截图20181216235158.png',
  'treehouse_9.jpeg',
  'v2-1cb5914fe181de27a369a1742a495942.jpg',
  'warm.jpg',
  '下载 (2).jpg',
  '下载.jpg',
  '照片-0126.jpg',
  '照片j-0071.jpg',
]
</script>

<style scoped>
.image-container {
  display: flex;
  gap: 10px;
  width: 100%;
  min-height: 300px;
}

.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.right-column {
  flex: 1;
}

img {
  border: #2c3e50 1px solid;
  width: 100%;
  object-fit: contain;
}

/* 响应式调整 */

</style>
