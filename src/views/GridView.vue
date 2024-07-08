<template>
  <a-form layout="inline">
    <a-form-item label="最大高度">
      <a-input-number v-model:value="maxHeight" :min="20" :max="2000" :step="20"/>
    </a-form-item>
    <a-form-item label="Grid的列数量">
      <a-input-number v-model:value="columnCount" :min="1" :max="20"/>
    </a-form-item>
    <a-form-item label="小格子的宽高比">
      <a-input-number v-model:value="blockAspectRatio" :step="0.1" :min="0.1" :max="5"/>
    </a-form-item>
    <a-form-item>
      <a-button @click="changeUrl">随机交换两张图片</a-button>
      <a-button @click="showDebugInfo = !showDebugInfo">显示调试信息</a-button>
      <!--      <a-button @click="testBinarySearch()">测试折半查找</a-button>-->
    </a-form-item>
  </a-form>
  <template v-if="store.h?.count">
    <div style="display: flex; justify-content: flex-start;gap: 35px;">
      <p>图片总数: {{ store.h.count }}</p>
      <p @click="showStatisticsH">平均隐藏百分比: {{ store.h.avg }}</p>
      <p @click="showStatisticsS">平均缩放百分比: {{ store.s.avg }}</p>
    </div>
    <a-modal v-model:open="statistics.h.visible" @cancel="hideStatisticsH">
      <div>Good Good Good</div>
      <div>--------隐藏--------</div>
      <div style="display: grid;grid-template-columns:100px auto 50px;grid-auto-rows: auto;line-height: 15px;">
        <template :key="i" v-for=" (v,i) in store.allH">
          <span>{{ i }} %</span>
          <span>
            <template v-if="v">
            <template v-for="v1 in v">
              *
            </template>
            </template>
          </span>
          <span>{{ v }} </span>
        </template>
      </div>
    </a-modal>
    <a-modal v-model:open="statistics.s.visible" @cancel="hideStatisticsS">
      <div>Bad Bad Bad</div>
      <div>--------缩放--------</div>
      <div style="display: grid;grid-template-columns:100px auto 50px;grid-auto-rows: auto;line-height: 15px;">
        <template :key="i" v-for=" (v,i) in store.allS">
          <span>{{ i }} %</span>
          <span>
            <template v-if="v">
            <template v-for="v1 in v">
              *
            </template>
            </template>
          </span>
          <span>{{ v }} </span>
        </template>
      </div>
    </a-modal>
  </template>
  <div id="app">
    <div>
      <!--      <p class="title">图片<span>共{{ pictures.length }}个</span></p>-->

      <Grid :pictures="pictures" :max-height="maxHeight" :column-count="columnCount"
            :showDebugInfo="showDebugInfo"
            :block-aspect-ratio="blockAspectRatio">
        <template #default="{ item, index }">
          <div class="title-slot">
<!--            <span class="img-title">{{ item.name }}</span>-->
          </div>
        </template>
      </Grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onBeforeUnmount, onMounted, watch} from 'vue';
import Grid from "@/components/Grid.vue";
import type {Picture} from '@/types';
import {useImgStore} from "@/stores/imgStore";
import {testBinarySearch} from "@/lib/testBinarySearch";

const store = useImgStore();

const pictures = ref<Array<Picture>>([]);

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

const maxHeight = ref(327);
const columnCount = ref(4);
const blockAspectRatio = ref(1.5);
const showDebugInfo = ref(false);

// Watchers and lifecycle hooks
onMounted(() => {
  localStorage.getItem('maxHeight') && (maxHeight.value = parseInt(localStorage.getItem('maxHeight')!));
  localStorage.getItem('columnCount') && (columnCount.value = parseInt(localStorage.getItem('columnCount')!));
  localStorage.getItem('blockAspectRatio') && (blockAspectRatio.value = parseFloat(localStorage.getItem('blockAspectRatio')!));
  localStorage.getItem('showDebugInfo') && (showDebugInfo.value = localStorage.getItem('showDebugInfo') === 'true');
  for (let file of files) {
    pictures.value.push({src: `img/${file}`, name: file})
  }
});

watch([maxHeight, columnCount, blockAspectRatio, showDebugInfo], () => {
  localStorage.setItem('maxHeight', maxHeight.value.toString());
  localStorage.setItem('columnCount', columnCount.value.toString());
  localStorage.setItem('blockAspectRatio', blockAspectRatio.value.toString());
  localStorage.setItem('showDebugInfo', showDebugInfo.value.toString());
});

onBeforeUnmount(() => {
});

// Methods
function changeUrl() {
  let l = Math.floor(Math.random() * pictures.value.length);
  let r;
  do {
    r = Math.floor(Math.random() * pictures.value.length);
  } while (l === r);
  [pictures.value[l].src, pictures.value[r].src] = [pictures.value[r].src, pictures.value[l].src];
  console.log(`Swapped indices ${l} and ${r}`);
}

const statistics = ref({h: {visible: false}, s: {visible: false}});

function showStatisticsH() {
  statistics.value.h.visible = true;
}

function showStatisticsS() {
  statistics.value.s.visible = true;
}

function hideStatisticsH() {
  statistics.value.h.visible = false;
}

function hideStatisticsS() {
  statistics.value.s.visible = false;
}

</script>

<style scoped>
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

.title-slot {
  display: flex;
  justify-content: stretch;
  align-items: flex-end;
  height: 100%;
  width: 100%;
}

.img-title {
  padding: 0 3px;
  border-radius: 0 5px 2px 0;
  color: #ffffff;
  background-color: rgba(184, 184, 184, 0.5);
}

</style>
