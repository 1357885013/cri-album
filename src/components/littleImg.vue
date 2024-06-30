<template>
  <div :style="style">
    <div class="img-wrapper-out">
      <div class="img-wrapper" ref="imageWrapper" @mouseenter="mouseEnter" @mouseleave="mouseLeave"
           @mousemove="mouseMove">
        <div class="loading-body" :style="{ display: loading }">
          <!--        <div class="loading-body">-->
        </div>
        <img :src="pic.src" :ref="pic.name" @load="getImgNaturalDimensions"
             :style="{width:styleImg.width,height:styleImg.height,transform:styleImg.transform}"
             class="img" alt="不支持的类型">
        <div class="img-slot">
          <slot :index="index" :item="pic"></slot>
        </div>
        <div class="img-slot">
          <span class="debug">{{ WBTH ? '--' : '|' }}</span>
          <span class="debug">{{ hiddenPercent }}%</span>
          <span class="debug">{{ scalePercent }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, watch, onMounted, nextTick, defineProps, toRefs} from 'vue';
import type {Picture} from "@/types";
import {useImgStore} from "@/stores/img";

const props = defineProps({
  pic: {
    type: Object as () => Picture,
    default: () => ({}),
    required: true
  },
  index: Number,
  blockWidth: Number,
  blockHeight: Number,
  maxHeight: Number,
});
const store = useImgStore();

const {pic, blockWidth, blockHeight, maxHeight} = toRefs(props);

const oW = ref(0);
const oH = ref(0);
const width = ref(null);
const height = ref(null);
const WBTH = ref(true);
const hiddenPercent = ref(0); // 图片被隐藏了百分之多少
const scalePercent = ref(0); // 图片被缩放了百分之多少
const coverLength = ref(null);
const style = reactive({
  gridRow: "span 1",
  gridColumn: "span 1"
});
const styleImg = reactive({
  width: "100%",
  height: "100%",
  transform: null,
  WBTH: 1
});
const loading = ref("block");
const imageWrapper = ref();

watch([maxHeight], () => {
  computeSize();
});

watch(pic, (newPic, oldPic) => {
  if (newPic.src !== oldPic.src) {
    loading.value = "block";
    getImgNaturalDimensions();
  }
}, {deep: true});

watch([blockWidth, blockHeight], () => {
  computeSize();
});

onMounted(() => {
  getImgNaturalDimensions();
  computeSize();
});

function mouseEnter() {
  computeCoverLength();
}

function mouseLeave() {
}

function mouseMove(e) {
  if (!width.value || !height.value) return;
  if (WBTH.value) {
    let rate = e.offsetX / width.value * -2;
    styleImg.transform = `translateX(${coverLength.value * rate}px)`
  } else {
    let rate = e.offsetY / height.value * -2;
    styleImg.transform = `translateY(${coverLength.value * rate}px)`;
  }
}

function getImgNaturalDimensions() {
  const imageElement = imageWrapper.value.querySelector(`img[src="${pic.value.src}"]`) as HTMLImageElement;
  if (imageElement.complete && imageElement.naturalWidth) {
    updateDimensions(imageElement.naturalWidth, imageElement.naturalHeight);
    loading.value = "none";
  } else {
    imageElement.onload = () => {
      updateDimensions(imageElement.naturalWidth, imageElement.naturalHeight);
      loading.value = "none";
    };
  }
}

function updateDimensions(naturalWidth: number, naturalHeight: number) {
  oW.value = naturalWidth;
  oH.value = naturalHeight;
  computeSize();
}

function computeSize() {
  if (oW.value === 0) return;
  let origin = {w: oW.value, h: oH.value}
  let realRate = origin.w / origin.h;
  let rw = (origin.w / blockWidth.value);
  let rh = (origin.h / blockHeight.value);
  let ratio;
  if (rw >= rh) {
    // 宽图片
    WBTH.value = true;
    // 让分子为1
    ratio = Math.round(rw / rh);
  } else {
    // 高图片
    WBTH.value = false;
    // 让分子为1
    ratio = Math.round(rh / rw);
  }


  let blockH, blockW;
  ratio = origin.h / origin.w;
  if (WBTH.value) {
    blockH = Math.round(Math.min(maxHeight?.value, origin.h) / blockHeight.value);
    let w = blockH * blockHeight.value / ratio / blockWidth.value;
    blockW = Math.round(w);
  } else {
    blockW = Math.round(Math.min(maxHeight?.value, origin.h) / blockWidth.value);
    let h = blockW * blockWidth.value * ratio / blockHeight.value;
    blockH = Math.round(h);
  }

  height.value = blockHeight.value * blockH;
  width.value = blockWidth.value * blockW;
  style.gridColumn = "span " + parseInt(blockW);
  style.gridRow = "span " + parseInt(blockH);
  nextTick(() => {
    computeCoverLength();
  });
  return;

  // 通过放大让分母约等于整数
  let ds = [1, 2, 3, 4, 5]
  let minD = Number.MAX_VALUE;
  let min = Number.MAX_VALUE;
  for (let i = 0; i < ds.length; i++) {
    let temp = ratio * ds[i];
    temp = Math.abs(Math.round(temp) - temp);
    if (temp < min) {
      min = temp;
      minD = ds[i];
    }
  }
  ratio = Math.round(ratio * minD);
  let nowRateO;
  // 算出宽高比例
  if (WBTH.value) {
    nowRateO = {rate: ratio / minD, x: ratio, y: minD};
  } else {
    nowRateO = {rate: minD / ratio, x: minD, y: ratio}
  }
  // 算出 显示高度 , !!!!!!!!! grid 会自适应宽高
  height.value = blockHeight.value * nowRateO.y;
  width.value = blockWidth.value * nowRateO.x;
  // 放大
  let rate = !WBTH.value ? width.value / origin.w : height.value / origin.h;
  while (rate < 0.4 && rate !== 0) {
    if (WBTH.value) {
      if (height.value > maxHeight.value)
        break;
    } else {
      if (width.value > maxHeight.value)
        break;
    }
    height.value *= 2;
    width.value *= 2;
    rate *= 2;
  }
  style.gridColumn = "span " + parseInt(width.value / blockWidth.value);
  style.gridRow = "span " + parseInt(height.value / blockHeight.value);
  nextTick(() => {
    computeCoverLength();
  });
}

function computeCoverLength() {
  if (!imageWrapper.value) return;
  const imgRect = imageWrapper.value.getBoundingClientRect();
  width.value = imgRect.width;
  height.value = imgRect.height;

  if (oW.value / width.value > oH.value / height.value) {
    WBTH.value = true;
    // (图片宽度（带着隐藏的部分） - 显示的宽度) / 2
    coverLength.value = ((oW.value * height.value / oH.value) - width.value) / 2;
    styleImg.width = "auto"; // 这里设置完auto之后要 等等元素的宽度才能获取到
    styleImg.height = "100%";
    // if (styleImg.transform === null)
    styleImg.transform = "translateX(-" + coverLength.value / 2 + "px)";
    // 算一下隐藏的百分比
    scalePercent.value = Math.round(height.value / oH.value * 100);
    hiddenPercent.value = Math.round(coverLength.value * 2 / (width.value + coverLength.value * 2) * 100);
  } else {
    WBTH.value = false;
    coverLength.value = ((oH.value * width.value / oW.value) - height.value) / 2;
    styleImg.width = "100%";
    styleImg.height = "auto";
    // if (styleImg.transform === null)
    styleImg.transform = "translateY(-" + coverLength.value / 2 + "px)";
    // 算一下隐藏的百分比
    scalePercent.value = Math.round(width.value / oW.value * 100);
    hiddenPercent.value = Math.round(coverLength.value * 2 / (height.value + coverLength.value * 2) * 100);
  }
  store.pushScale(props.pic.name, scalePercent.value);
  // if(hiddenPercent.value==100)
  //   debugger
  store.pushHidden(props.pic.name, hiddenPercent.value);
}
</script>

<style scoped>
.img-wrapper-out {
  width: 100%;
  height: 100%;
  position: relative;
}

.img-wrapper-out > .img-wrapper {
  position: absolute;
  right: 4px;
  left: 4px;
  bottom: 4px;
  top: 4px;
  border-radius: 5px;
  /*  box-shadow: 0 6px 13px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22); */
  overflow: hidden;
}

.img-wrapper-out > .img-wrapper > .img {
  transition: transform 0.15s linear;
  will-change: transform;
  position: absolute;
}

.img-wrapper-out > .img-wrapper > .img-slot {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
}

@keyframes ldio-6qlrjbwah5c {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-body {
  background: aliceblue;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
}

.debug {
  color: red;
  font-size: 20px;
  font-weight: bold;
  font-family: "Microsoft Tai Le";
  font-style: normal;
  line-height: 28px;
  letter-spacing: 2px;
  background: rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
