<template>
  <div class="home">
    <div class="images" @resize="resize" ref="images"
         :style="{ 'grid-auto-rows': `${blockHeight}px`, 'grid-template-columns': `repeat(${props.columnCount}, ${blockWidth}px)` }">
      <!--            :style="{ 'grid-auto-rows': `${blockHeight}px`, 'grid-auto-columns': `${blockWidth}px` }">-->
      <!--      这里要根据可视区域的宽度自动设置有几列，同时要根据block size 近似计算出每个block的宽度，把block size选项直接改为列数-->
      <littleImg
          v-for="(pic, index) in pictures"
          :key="index"
          :pic="pic"
          :index="index"
          :blockHeight="blockHeight"
          :blockWidth="blockWidth"
          :columnCount="props.columnCount"
          :maxHeight="maxHeight">
        <template v-slot="prop">
          <slot :index="prop.index" :item="prop.item"></slot>
        </template>
      </littleImg>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onMounted, computed, onUnmounted} from 'vue';
import littleImg from '../components/littleImg.vue';
import type {Picture} from "@/types";

const props = defineProps({
  pictures: {
    type: Array as () => Picture[],
    default: () => []
  },
  columnCount: {
    type: Number,
    default: 212
  },
  blockAspectRatio: {
    type: Number,
    default: 2
  },
  maxHeight: {
    type: Number,
    default: 499
  }
});

const width = ref(1);
const blockWidth = ref(0);
const blockHeight = computed(() => Math.round(blockWidth.value / props.blockAspectRatio));
const images = ref<HTMLElement | null>(null);

// Watch for width changes and adjust block dimensions accordingly
watch(() => width.value, () => {
  calculateBlockWidth();
});

watch(() => props.columnCount, () => {
  calculateBlockWidth();
});

// Function to calculate block width based on container width
function calculateBlockWidth() {
  if (!images.value) return;
  // let result = Math.floor((width.value - 10) / Math.round((width.value - 10) / props.columnCount));
  let result = Math.floor((width.value - 10) / props.columnCount);
  blockWidth.value = result;
  console.log(`Block size: ${result}`);
  console.log(`Block size remainder: ${width.value % result}  grid size total remainder: `);
}

onMounted(() => {
  // Handle window resizing
  const handleResize = () => {
    if (images.value) {
      width.value = images.value.clientWidth;
      console.log('Resize event', width.value)
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Initial setup

  // Periodically check for dimension changes not caught by resize events
  const intervalId = setInterval(() => {
    handleResize();
  }, 1000);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    clearInterval(intervalId);
  });
});

function resize(e: Event) {
  console.log('Resize event', e);
}

</script>

<style lang="css" scoped>
.images {
  display: grid;
 /* grid-auto-flow: row dense;  */
  grid-auto-flow: row;
  grid-gap: 0;
  gap: 0;
  justify-content: center;
}
</style>
