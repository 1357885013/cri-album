<template>
  <div :style="style">
    <div class="img-wrapper-out">
      <div class="img-wrapper">
        <div @mouseenter="mouseEnter" @mouseleave="mouseLeave" @mousemove="mouseMove"
             :style="{backgroundPosition:backgroundPosition,backgroundSize: objectFit,backgroundImage:'url('+src+')' }"
             class="img" ref="image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "littleImg",
  props: {
    name: String,
    src: String,
    blockWidth: [Number, String],
    blockHeight: [Number, String],
    maxHeight: [Number, String],
    // 图片被遮住的长度, 负的是高,正的是宽
    coverLength: null
  },
  data: function () {
    return {
      oW: 0,
      oH: 0,
      objectFit: 'cover',
      style: {
        gridRow: "span 1",
        gridColumn: "span 1"
      }
    }
  },
  watch: {
    maxHeight: function (now, old) {
      this.getImgNaturalDimensions();
      this.computeSize();
    },
    blockWidth: function (now, old) {
      this.computeSize();
    },
    blockHeight: function (now, old) {
      this.computeSize();
    }
  },
  computed: {
    standRate: function () {
      return this.blockWidth / this.blockHeight;
    },
    backgroundPosition: function () {
      return 'center';
    }
  },
  mounted() {
    this.getImgNaturalDimensions();
    this.computeSize();
  },
  methods: {
    mouseEnter: function () {
      this.objectFit = 'contain';
      console.log(this.coverLength);
    },
    mouseLeave: function () {
      this.objectFit = 'cover';
    },
    mouseMove: function () {
      this.objectFit = 'cover';
    },
    getImgNaturalDimensions: function () {
      // console.log(oImg)
      let oImg = this.$refs.image;
      if (oImg.naturalWidth) { // 现代浏览器
        this.oW = oImg.naturalWidth;
        this.oH = oImg.naturalHeight;
      } else { // IE6/7/8
        var nImg = new Image();
        let that = this;
        nImg.onload = function () {
          that.oW = nImg.width;
          that.oH = nImg.height;
          that.computeSize();
        };
        nImg.src = this.src;
      }
    },
    computeSize: function () {
      let that = this;
      let origin = {w: that.oW, h: that.oH}
      let realRate = origin.w / origin.h;
      let rw = (origin.w / that.blockWidth);
      let rh = (origin.h / that.blockHeight);
      // is width big then height
      let WBTH;
      let ratio;
      if (rw >= rh) {
        // 宽图片
        WBTH = true;
        // 让分子为1
        ratio = Math.round(rw / rh);
      } else {
        // 高图片
        WBTH = false;
        // 让分子为1
        ratio = Math.round(rh / rw);
      }
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
      if (WBTH) {
        nowRateO = {rate: ratio / minD, x: ratio, y: minD};
      } else {
        nowRateO = {rate: minD / ratio, x: minD, y: ratio}
      }
      // console.log(nowRateO)
      // 算出 显示高度
      let showHeight = that.blockHeight * nowRateO.y;
      let showWidth = that.blockWidth * nowRateO.x;
      // 放大
      if (realRate < nowRateO.rate) {
        if (showWidth / origin.w < 0.4) {
          showHeight *= 2;
          showWidth *= 2;
        }
      } else {
        if (showHeight / origin.h < 0.4) {
          showHeight *= 2;
          showWidth *= 2;
        }
      }
      // 算出被遮盖的宽/高度
      if (WBTH)
        this.coverLength = (origin.w - (origin.h / showHeight * showWidth)) / 2;
      else
        this.coverLength = -(origin.w - (origin.h / showHeight * showWidth)) / 2;

      that.style.gridColumn = "span " + parseInt(showWidth / that.blockWidth);
      that.style.gridRow = "span " + parseInt(showHeight / that.blockHeight);
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
padding = 4px
.img-wrapper-out
  width 100%
  height 100%
  position relative

  & > .img-wrapper
    position absolute
    right padding
    left padding
    bottom padding
    top padding
    border-radius 2px
    //border 1px solid #0000009c
    //box-shadow 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
    box-shadow 0 6px 13px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)

    & > .img
      width 100%
      height 100%
      background-repeat no-repeat
</style>
