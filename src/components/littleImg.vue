<template>
  <div :style="style">
    <div class="img-wrapper-out">
      <div class="img-wrapper" ref="imageWrapper" @mouseenter="mouseEnter" @mouseleave="mouseLeave"
           @mousemove="mouseMove">
        <div :style="{display:loading}" style="position: absolute;top: 0;left:0;z-index: 10;">
          <div class="loadingio-spinner-dual-ring-mjzqrvbysi">
            <div class="ldio-6qlrjbwah5c">
              <div></div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <img :key="pic.src" :src="pic.src" ref="image" loading="lazy"
             :style="{width:styleImg.width,height:styleImg.height,transform:styleImg.transform}"
             class="img" alt="不支持的类型">
        <div class="img-slot">
          <slot :index="index" :item="pic"></slot>
        </div>
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
      $img: null,
      loading: "none",
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
      let that = this;
      this.$refs.image.onload = function () {
        that.getImgNaturalDimensions()
      }
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
      this.loading = "block";
      // 这一种的onload事件不管用. 切换src后 这个oImg是不会清空的还是前一个的东西,加了key也不行.
      // let oImg = this.$refs.image;
      // if (oImg.naturalWidth) { // 现代浏览器
      //   if (hasSize && this.oW === oImg.width && this.oH === oImg.height)
      //     return;
      //   this.oW = oImg.naturalWidth;
      //   this.oH = oImg.naturalHeight;
      //   console.log("loading end!");
      //   this.computeSize();
      //   this.loading = "none";
      // } else { // IE6/7/8
      let nImg = new Image();
      let that = this;
      nImg.onload = function () {
        if (hasSize && that.oW === nImg.width && that.oH === nImg.height)
          return;
        that.oW = nImg.width;
        that.oH = nImg.height;
        that.computeSize();
        that.loading = "none";
      };
      nImg.src = this.pic.src;
      // }
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


      let blockH, blockW;
      ratio = origin.h / origin.w;
      if (this.WBTH) {
        blockH = Math.round(Math.min(this.maxHeight, origin.h) / this.blockHeight);
        let w = blockH * this.blockHeight / ratio / this.blockWidth;
        blockW = Math.round(w);
      } else {
        blockW = Math.round(Math.min(this.maxHeight, origin.h) / this.blockWidth);
        let h = blockW * this.blockWidth * ratio / this.blockHeight;
        blockH = Math.round(h);
      }

      this.height = that.blockHeight * blockH;
      this.width = that.blockWidth * blockW;
      that.style.gridColumn = "span " + parseInt(blockW);
      that.style.gridRow = "span " + parseInt(blockH);
      that.$nextTick(function () {
        that.computeCoverLength();
      })
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
      if (this.WBTH) {
        nowRateO = {rate: ratio / minD, x: ratio, y: minD};
      } else {
        nowRateO = {rate: minD / ratio, x: minD, y: ratio}
      }
      // 算出 显示高度 , !!!!!!!!! grid 会自适应宽高
      this.height = that.blockHeight * nowRateO.y;
      this.width = that.blockWidth * nowRateO.x;
      // 放大
      let rate = !this.WBTH ? this.width / origin.w : this.height / origin.h;
      while (rate < 0.4 && rate !== 0) {
        if (this.WBTH) {
          if (this.height > this.maxHeight)
            break;
        } else {
          if (this.width > this.maxHeight)
            break;
        }
        this.height *= 2;
        this.width *= 2;
        rate *= 2;
      }
      that.style.gridColumn = "span " + parseInt(this.width / that.blockWidth);
      that.style.gridRow = "span " + parseInt(this.height / that.blockHeight);
      that.$nextTick(function () {
        that.computeCoverLength();
      })
    },
    // 算出被遮盖的宽/高度
    computeCoverLength: function () {
      let img = this.$refs.imageWrapper;
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

    & > .img-slot
      position absolute
      right 0
      left 0
      bottom 0
      top 0


@keyframes ldio-6qlrjbwah5c {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
}

.ldio-6qlrjbwah5c div {
  box-sizing: border-box !important
}

.ldio-6qlrjbwah5c > div {
  position: absolute;
  width: 72px;
  height: 72px;
  top: 14px;
  left: 14px;
  border-radius: 50%;
  border: 8px solid #000;
  border-color: #fe718d transparent #fe718d transparent;
  animation: ldio-6qlrjbwah5c 1s linear infinite;
}

.ldio-6qlrjbwah5c > div:nth-child(2) {
  border-color: transparent
}

.ldio-6qlrjbwah5c > div:nth-child(2) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}

.ldio-6qlrjbwah5c > div:nth-child(2) div:before, .ldio-6qlrjbwah5c > div:nth-child(2) div:after {
  content: "";
  display: block;
  position: absolute;
  width: 8px;
  height: 8px;
  top: -8px;
  left: 24px;
  background: #fe718d;
  border-radius: 50%;
  box-shadow: 0 64px 0 0 #fe718d;
}

.ldio-6qlrjbwah5c > div:nth-child(2) div:after {
  left: -8px;
  top: 24px;
  box-shadow: 64px 0 0 0 #fe718d;
}

.loadingio-spinner-dual-ring-8z8bzq6j683 {
  width: 50px;
  height: 50px;
  display: inline-block;
  overflow: hidden;
  background: none;
}

.ldio-6qlrjbwah5c {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.5);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}

.ldio-6qlrjbwah5c div {
  box-sizing: content-box;
}

/* generated by https://loading.io/ */
</style>
