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
import {ref, reactive, watch, onMounted, nextTick, defineProps, toRefs, computed} from 'vue';
import type {Picture, RadioState} from "@/types";
import {useImgStore} from "@/stores/imgStore";
import {binarySearch} from "@/lib/binarySearch";

const props = defineProps({
  pic: {
    type: Object as () => Picture,
    default: () => ({}),
    required: true
  },
  index: Number,
  blockWidth: Number,
  blockHeight: Number,
  columnCount: Number,
  maxHeight: Number,
  radio: Object as () => RadioState
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
const maxCountOfShortEdgeH = computed(() => Math.max(Math.floor((maxHeight.value / blockHeight.value)), 1));
const maxCountOfShortEdgeW = computed(() => Math.max(Math.floor((maxHeight.value / blockWidth.value)), 1));
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

function findNearRadio(array: any[], currentIndex: number): number {
  const length = array.length;
  let distance = 1;

  while (true) {
    // 向左搜索
    for (let i = 1; currentIndex - i >= 0; i++) {
      if (checkRadio(props.radio?.map[currentIndex - i])) {
        return currentIndex - i;
      }
    }

    // 向右搜索
    for (let i = 1; currentIndex + i < length; i++) {
      if (checkRadio(props.radio?.map[currentIndex + i])) {
        return currentIndex + i;
      }
    }

    // 如果左右都没有找到合适的索引，增加搜索距离
    distance++;

    // 如果超出数组边界，返回 -1
    if (currentIndex - distance < 0 && currentIndex + distance >= length) {
      return -1;
    }
  }
}

function checkRadio(wh: [number, number] | undefined) {
  if (!wh) return false;
  if (wh[0] > props.columnCount) {
    return false
  }
  if (WBTH.value) {
    if (wh[1] > maxCountOfShortEdgeH.value) {
      return false
    }
  } else {
    if (wh[0] > maxCountOfShortEdgeW.value) {
      return false
    }
  }
  return true
}

function computeSize() {
  if (oW.value === 0) return;
  let origin = {w: oW.value, h: oH.value}
  WBTH.value = origin.w > origin.h; // 宽比高大
  let imageRadio = origin.w / origin.h;
  if (!props.radio?.list.length) {
    console.error('radio.list is empty')
    return;
  }
  let index = binarySearch(props.radio?.list, imageRadio)
  let wh = [1, 1];
  if (index === -1) {
    console.error('can not find radio' + imageRadio)
  } else {
    wh = props.radio?.map[props.radio?.list[index]];
    if (!checkRadio(wh)) {
      index = findNearRadio(props.radio?.list, index)
      if (index === -1) {
        console.error('can not find near radio' + imageRadio)
        wh = [1, 1];
      } else {
        wh = props.radio?.map[props.radio?.list[index]];
      }
    }
  }

  let blockCountOfW = wh[0]
  let blockCountOfH = wh[1]

  WBTH.value = wh[0] > wh[1]; // 宽比高大
  height.value = blockHeight.value * blockCountOfH;
  width.value = blockWidth.value * blockCountOfW;
  style.gridColumn = "span " + blockCountOfW;
  style.gridRow = "span " + blockCountOfH;
  nextTick(() => {
    computeCoverLength();
  });
  return;
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
  if (hiddenPercent.value == 100)
    console.error('图片没显示出来')
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
