import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useImgStore = defineStore('img', () => {
    const hidden = ref({});
    const scale = ref({});
    const h = ref({count: 0, avg: 0, total: 0})
    const s = ref({count: 0, avg: 0, total: 0})
    // 代表从0%到100%的数组，如果该数组的值为几，则代表有几个元素的值为该值
    const allH = ref(new Array(101))
    const allS = ref(new Array(101))

    function pushHidden(k: string, v: number) {
        // console.log('pushHidden', k, v)
        // 检测v是不是数字
        if (isNaN(v)) {
            return;
        }

        let old = hidden.value[k]
        let around = Math.round(v)
        let oldAround = Math.round(old)
        if (old === undefined) {
            // 算排序后的数
            allH.value[around] = (allH.value[around] || 0) + 1
            // 算平均数
            hidden.value[k] = v;
            h.value.total += v;
            h.value.count += 1;
            h.value.avg = (h.value.total / h.value.count);
        } else {
            // 算排序后的数
            allH.value[around] = (allH.value[around] || 0) + 1
            allH.value[oldAround] = (allH.value[oldAround] || 0) - 1
            // 算平均数
            h.value.total = h.value.total - old + v;
            h.value.avg = (h.value.total / h.value.count);
            hidden.value[k] = v;
        }
    }

    function pushScale(k: string, v: number) {
        // console.log('pushScale', k, v)
        // 检测v是不是数字
        if (isNaN(v) || v === Infinity) {
            return;
        }
        let old = scale.value[k]
        let around = Math.round(v)
        let oldAround = Math.round(old)
        if (old === undefined) {
            // 算排序后的数
            allS.value[around] = (allS.value[around] || 0) + 1
            // 算平均数
            scale.value[k] = v;
            s.value.total += v;
            s.value.count += 1;
            s.value.avg = (s.value.total / s.value.count);
            if (isNaN(s.value.avg)) {
                debugger
            }
        } else {
            // 算排序后的数
            allS.value[around] = (allS.value[around] || 0) + 1
            allS.value[oldAround] = (allS.value[oldAround] || 0) - 1
            // 算平均数
            s.value.total = s.value.total - old + v;
            s.value.avg = (s.value.total / s.value.count);
            if (isNaN(s.value.avg)) {
                debugger
            }
            scale.value[k] = v;
        }
    }

    return {pushHidden, pushScale, hidden, scale, h, s, allH, allS}
})
