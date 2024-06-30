import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImgStore = defineStore('img', () => {
    const hidden = ref({});
    const scale = ref({});

    function pushHidden(k: string, v: number) {
        console.log(k, v);
        hidden.value[k] = v;  // Use the ref and access its value for reactivity
    }

    function pushScale(k: string, v: number) {
        console.log(k, v);
        scale.value[k] = v;  // Same as above
    }

    return { pushHidden, pushScale, hidden, scale }
})
