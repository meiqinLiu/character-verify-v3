<!-- 字符验证码 -->
<template>
  <div class="plugin-anti-brush-verify-content">
    <div class="content">
      <div class="img-row" :style="{ height: vHeight }">
        <div :style="{ width: vWidth }" class="img-box">
          <img
            v-if="verifyImgUrl"
            :src="verifyImgUrl"
            id="verifyImg"
            alt=""
            class="verify-img"
          />
        </div>
        <!-- 刷新图标 -->
        <div :style="{ height: vHeight }" @click="onReset">
          <slot
            v-if="$slots.reloadBtn"
            name="reloadBtn"
            :disabled="loding"
          ></slot>
          <van-button
            v-else
            type="primary"
            size="small"
            class="reload-btn"
            :disabled="loding"
            color="#dcdee0"
            :style="{ width: vHeight }"
          >
            <img src="./images/reload.png" alt="" />
          </van-button>
        </div>
      </div>
      <div class="input-row" :style="{ lineHeight: inputHeight }">
        <van-field
          class="my-input"
          v-model="value"
          placeholder="请输入验证码"
          :style="{ 'box-sizing': 'border-box', width: vWidth }"
        />
        <van-button
          type="primary"
          size="small"
          @click="check"
          :color="btnColor"
          :style="{ minWidth: '42px', width: vHeight }"
          >{{ btnContent }}</van-button
        >
      </div>
      <div>
        <div class="privacy">
          <div
            v-if="verifyContentShow"
            :style="{ width: vWidth, height: vHeight }"
          >
            <ul
              class="verify-content"
              id="verifyContent"
              :style="verifyContentStyle"
            >
              <li v-for="item in verifyList" :key="item.id" :style="item.style">
                {{ item.value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

const bgColorMap = ['#C4F791', '#B576F3', '#F791C4', '#9191F7', '#91C4F7', '#9191F7', '#F7F791', '#F7C491']
const fontColorMap = ['#BB6610', '#BBBB10', '#1010BB', '#BB6610', '#A61111', '#A611A6', '#0E8080', '#800E0E', '#0E8047', '#470E80',]
const alignSelfMap = ['baseline', 'center', 'flex-start', 'flex-end']

import domtoimage from 'dom-to-image';
// import { Popup, Loading, Toast, Button } from 'vant'
import { Toast, Button, Field } from 'vant'
export default {
  name: 'CharacterVerify',
  props: {
    vWidth: {  // 校验区块宽度
      type: String,
      default: '180px',
    },
    vHeight: {  // 校验区块高度
      type: String,
      default: '40px',
    },
    vLength: { // 字符长度
      type: Number,
      default: 4,
    },
    vFontSize: { // 默认字体大小
      type: String,
      default: '30px',
    },
    bgPngUrlList: {
      type: Array,
      default: () => {
        let arr = [
          require("./images/bowen1.png"),
          require("./images/bowen2.png"),
          require("./images/bowen3.png"),
          require("./images/bowen4.png"),
          require("./images/bowen5.png"),
          require("./images/bowen6.png"),
          require("./images/bowen7.png"),
          require("./images/bowen8.png"),
          require("./images/bowen9.png"),
          require("./images/bowen10.png"),
          require("./images/bowen11.png"),
          require("./images/bowen12.png"),
          require("./images/bowen13.png"),
          require("./images/bowen14.png"),
          require("./images/bowen15.png"),
          require("./images/bowen16.png"),
          require("./images/bowen17.png"),
        ]
        return arr
      }
    },
    inputHeight: { // 输入区域高度
      type: String,
      default: '35px',
    },
    btnContent: { // 校验按钮文本内容
      type: String,
      default: '校验',
    },
    btnColor: { // 校验按钮颜色
      type: String,
      default: '#1989fa',
    },
    sText: { // 校验成功的提示
      type: String,
      default: '验证通过',
    },
    eText: { // 校验失败的提示
      type: String,
      default: '验证失败',
    },

  },
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
  },
  data() {
    return {
      verifyContentStyle: {
        color: '#000',
        background: '',
        backgroundSize: 'contain',
      }, // 容器的配置
      verifyList: [],
      valueStr: '',
      value: undefined,
      verifyImgUrl: undefined,
      verifyContentShow: false,
      loding: false,
    }
  },
  mounted() {
    this.onReset()
  },
  methods: {
    onReset() {
      //重置图片验证组件
      // 初始字符串设置
      this.loding = true
      this.valueStr = this.randomRange(this.vLength)
      this.value = undefined
      let arr = this.valueStr.split('')
      let list = []
      arr.map((i, index) => {
        let obj = {
          id: index + 1,
          value: i,
          style: {
            color: fontColorMap[this.getRandomArbitrary(0, fontColorMap.length)],
            fontSize: this.getRandomArbitrary(0, 2) % 2 === 0 ? undefined : '',
            transform: this.getRandomArbitrary(0, 2) % 2 === 0 ? 'rotate(20deg)' : '',
            alignSelf: alignSelfMap[this.getRandomArbitrary(0, alignSelfMap.length)],
          }
        }
        list.push(obj)
        // 背景图片设置
        const bgColor = bgColorMap[this.getRandomArbitrary(0, bgColorMap.length)]
        const bgImgIndex = this.getRandomArbitrary(0, this.bgPngUrlList.length)
        this.verifyContentStyle.background = `url(${this.bgPngUrlList[bgImgIndex]})repeat ${bgColor}`
        this.verifyContentStyle.fontSize = this.vFontSize

      })
      this.verifyList = list
      this.verifyContentShow = true
      this.$nextTick(() => {
        var node = document.getElementById('verifyContent');

        domtoimage.toPng(node)
          .then((dataUrl) => {
            this.verifyImgUrl = dataUrl
            this.verifyContentShow = false
            this.loding = false
          })
          .catch(function (error) {
            this.loding = false
          });
      })
      this.$emit('reload')
    },
    onSuccess() {
      //往父级传递验证通过的函数
      this.sText && Toast(this.sText)
      this.$emit('success')
    },
    onFail() {
      this.eText && Toast(this.eText)
      this.$emit('fail')
      this.onReset()
    },
    check() {
      if (!this.value) {
        return Toast('请输入验证码！')
      }
      if (this.valueStr.toLowerCase() === this.value.toLowerCase()) {
        this.onSuccess()
      } else {
        this.onFail()
      }
    },
    randomRange(min, max) {
      var returnStr = "",
        range = (max ? Math.round(Math.random() * (max - min)) + min : min),
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

      for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (arr.length - 1));
        returnStr += arr[index];
      }
      return returnStr;
    },
    getRandomArbitrary(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      let val = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 不包含最大值，包含最小值
      return val
    },
  },
}
</script>
<style lang="less" scoped>
.plugin-anti-brush-verify-content {
  text-align: center;
  .content {
    display: inline-block;
  }
  .img-row {
    display: flex;
    .img-box {
      height: 100%;
    }
    .verify-img {
      width: 100%;
      height: 100%;
    }
    .reload-btn {
      margin-left: 5px;
      box-sizing: border-box;
      height: 100%;
    }
  }

  .input-row {
    margin-top: 10px;
    display: flex;
    .my-input {
      width: 126px;
      border: 1px solid #ebedf0;
      padding: 2.5px 10px;
    }

    button {
      margin-left: 5px;
      line-height: inherit;
      height: 100%;
      // margin-top: 10px;
    }
    /deep/ .van-cell::after {
      border: none;
    }
    /deep/ .van-field {
      line-height: inherit;
    }
    /deep/ .van-button__content {
      line-height: inherit;
    }
  }
  .verify-content {
    display: flex;
    justify-content: space-between;
    padding: 5px 12px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  .privacy {
    overflow: hidden;
    width: 0;
    height: 0;
  }
}
</style>
