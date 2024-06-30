<template>
  <div class="home">
    <div class="images" ref="images">
      <img :src="pic.src" :ref="pic.name" @load="() => loadOnePic(pic.name)" :height="pic.height" :id="pic.name"
           v-for="pic in pictures" :key="pic.name"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, watch, onMounted} from 'vue';
import type {Picture} from "@/types";


const props = defineProps({
  pictures: {
    type: Array as () => Picture[],
    default: () => []
  },
  maxHeight: {
    type: Number,
    default: 499
  }
});

const imagesRef = ref<HTMLElement | null>(null);
const loadedImageCount = ref(0);
const pictures = reactive(props.pictures);
const rows = ref<Picture[][]>([]);
const exchanged = reactive<{ [key: string]: boolean }>({});

watch(loadedImageCount, (newVal, oldVal) => {
  if (newVal === pictures.length) {
    locationImages();
  }
});

onMounted(() => {
  console.log('params got', pictures);
});

const loadOnePic = (name: string) => {
  const image = imagesRef.value?.querySelector(`#${name}`) as HTMLImageElement;
  const pic = pictures.find(p => p.name === name);
  if (pic && image) {
    pic.oWidth = image.naturalWidth;
    pic.oHeight = image.naturalHeight;
    loadedImageCount.value++;
  }
};

const locationImages = () => {
  // Implement image placement logic here
  console.log('locationImages called');
  // Add more implementation details based on your specific needs
};

</script>

<style scoped>
.images {
  margin: 10px;
  grid-auto-flow: row dense;
  background-color: black;
  grid-gap: 3px;
}

.images > img {
  object-fit: cover;
}
</style>
