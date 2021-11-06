<template>
  <div :style="style">
    <div class="img-wrapper-out">
      <div class="img-wrapper" ref="image" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @mousemove="mouseMove">
        <img :src="pic.src" :style="{width:styleImg.width,height:styleImg.height,transform:styleImg.transform}"
             class="img" alt="不支持的类型">
        <slot :index="index" :item="pic"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "littleImg",
  props: {
    pic: Object,
    index: Number,
    blockWidth: [Number, String],
    blockHeight: [Number, String],
    maxHeight: [Number, String]
  },
  data: function () {
    return {
      oW: 0,
      oH: 0,
      // 显示的宽高,需要调用computeCoverLength() 刷新
      width: null,
      height: null,
      // 图片被遮住的长度, 负的是高,正的是宽
      coverLength: null,
      style: {
        gridRow: "span 1",
        gridColumn: "span 1"
      },
      styleImg: {
        width: "100%",
        height: "100%",
        transform: null
      },
      backgroundPosition: 'center',
      // is width big then height
      WBTH: null,
      $img: null
    }
  },
  watch: {
    maxHeight: function (now, old) {
      this.getImgNaturalDimensions();
      this.computeSize();
    },
    'pic.src': function (now, old) {
      console.log('src changed');
      this.styleImg.transform = null;
      this.getImgNaturalDimensions()
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
    }
  },
  mounted() {
    this.getImgNaturalDimensions();
    this.computeSize();
  },
  methods: {
    mouseEnter: function () {
      this.computeCoverLength();
    },
    mouseLeave: function () {
    },
    mouseMove: function (e) {
      // the movement is not smooth when the debug is turn on in browser;
      if (this.WBTH) {
        let rate = e.offsetX / this.width * -2;
        this.styleImg.transform = "translateX(" + this.coverLength * rate + "px)";
      } else {
        let rate = e.offsetY / this.height * -2;
        this.styleImg.transform = "translateY(" + this.coverLength * rate + "px)";
      }
    },
    getImgNaturalDimensions: function () {
      let hasSize = false;
      if (this.pic.width && this.pic.height) {
        this.oW = this.pic.width;
        this.oH = this.pic.height;
        this.computeSize();
        hasSize = true;
      }
      let oImg = this.$refs.image;
      if (oImg.naturalWidth) { // 现代浏览器
        this.oW = oImg.naturalWidth;
        this.oH = oImg.naturalHeight;
      } else { // IE6/7/8
        let nImg = new Image();
        let that = this;
        nImg.onload = function () {
          if (hasSize && that.oW === nImg.width && that.oH === nImg.height)
            return;
          that.oW = nImg.width;
          that.oH = nImg.height;
          that.computeSize();
        };
        nImg.src = this.pic.src;
      }
    },
    computeSize: function () {
      let that = this;
      let origin = {w: that.oW, h: that.oH}
      let realRate = origin.w / origin.h;
      let rw = (origin.w / that.blockWidth);
      let rh = (origin.h / that.blockHeight);
      let ratio;
      if (rw >= rh) {
        // 宽图片
        this.WBTH = true;
        // 让分子为1
        ratio = Math.round(rw / rh);
      } else {
        // 高图片
        this.WBTH = false;
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
      if (this.WBTH) {
        nowRateO = {rate: ratio / minD, x: ratio, y: minD};
      } else {
        nowRateO = {rate: minD / ratio, x: minD, y: ratio}
      }
      // 算出 显示高度 , !!!!!!!!! grid 会自适应宽高
      this.height = that.blockHeight * nowRateO.y;
      this.width = that.blockWidth * nowRateO.x;
      // 放大
      if (realRate < nowRateO.rate) {
        if (this.width / origin.w < 0.4) {
          this.height *= 2;
          this.width *= 2;
        }
      } else {
        if (this.height / origin.h < 0.4) {
          this.height *= 2;
          this.width *= 2;
        }
      }
      that.style.gridColumn = "span " + parseInt(this.width / that.blockWidth);
      that.style.gridRow = "span " + parseInt(this.height / that.blockHeight);
      that.$nextTick(function () {
        that.computeCoverLength();
      })
    },
    // 算出被遮盖的宽/高度
    computeCoverLength: function () {
      let img = this.$refs.image;
      this.width = img.clientWidth;
      this.height = img.clientHeight;
      if (this.oW / this.width > this.oH / this.height) {
        this.WBTH = true;
        this.coverLength = ((this.oW * this.height / this.oH) - this.width) / 2;
        this.styleImg.width = "auto";
        this.styleImg.height = "100%";
        if (this.styleImg.transform === null)
          this.styleImg.transform = "translateX(-" + this.coverLength / 2 + "px)";
      } else {
        this.WBTH = false;
        this.coverLength = ((this.oH * this.width / this.oW) - this.height) / 2;
        this.styleImg.width = "100%";
        this.styleImg.height = "auto";
        if (this.styleImg.transform === null)
          this.styleImg.transform = "translateY(-" + this.coverLength / 2 + "px)";
      }
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
    box-shadow 0 6px 13px rgba(0, 0, 0, 0.25), 0 5px 5px rgba(0, 0, 0, 0.22)
    overflow hidden

    & > .img
      transition: transform 0.15s linear;
      will-change transform
      position absolute
      z-index -1
</style>
