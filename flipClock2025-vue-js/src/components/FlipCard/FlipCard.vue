<script setup>
import { ref } from 'vue'

const { initFrontText, initBackText, duration } = defineProps({
  // 初始前牌文字
  initFrontText: { type: [String, Number], default: '0' },
  // 初始后牌文字
  initBackText: { type: [String, Number], default: '1' },
  // 翻牌动画时间，与CSS中设置的animation-duration保持一致
  duration: { type: Number, default: 600 },
})
// 是否正在翻转中
const isFlipping = ref(false)
// 翻转类型，down=向下翻转，up=向上翻转
const flipType = ref('down')
// 前牌文字
const frontText = ref(initFrontText)
// 后牌文字
const backText = ref(initBackText)
// 翻转
const flip = ({
  type,
  newFrontText,
  newBackText,
}) => {
  if (isFlipping.value) {
    return false
  }
  frontText.value = newFrontText
  backText.value = newBackText
  flipType.value = type
  isFlipping.value = true

  setTimeout(() => {
    frontText.value = newBackText
    isFlipping.value = false
  }, duration)
}

defineExpose({
  // 下翻牌
  flipDown: (newFrontText, newBackText) => {
    flip({ type: 'down', newFrontText, newBackText })
  },
  // 上翻牌
  flipUp: (newFrontText, newBackText) => {
    flip({ type: 'up', newFrontText, newBackText })
  },
})
</script>

<template>
  <div
    class="M-FlipCard"
    :class="{ down: flipType === 'down', up: flipType === 'up', go: isFlipping }"
  >
    <div class="digital front" :class="'number' + frontText"></div>
    <div class="digital back" :class="'number' + backText"></div>
  </div>
</template>

<style scoped>
.M-FlipCard {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px #000;
  border-radius: 10px;
  background: #fff;
  font-size: 66px;
  color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: 'Helvetica Neue';
}

.M-FlipCard .digital:before,
.M-FlipCard .digital:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  background: #000;
  overflow: hidden;
  box-sizing: border-box;
}

.M-FlipCard .digital:before {
  top: 0;
  bottom: 50%;
  border-radius: 10px 10px 0 0;
  border-bottom: solid 1px #666;
}

.M-FlipCard .digital:after {
  top: 50%;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  line-height: 0;
}

/*向下翻*/
.M-FlipCard.down .front:before {
  z-index: 3;
}

.M-FlipCard.down .back:after {
  z-index: 2;
  transform-origin: 50% 0%;
  transform: perspective(160px) rotateX(180deg);
}

.M-FlipCard.down .front:after,
.M-FlipCard.down .back:before {
  z-index: 1;
}

.M-FlipCard.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown 0.6s ease-in-out both;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.M-FlipCard.down.go .back:after {
  animation: backFlipDown 0.6s ease-in-out both;
}

/*向上翻*/
.M-FlipCard.up .front:after {
  z-index: 3;
}

.M-FlipCard.up .back:before {
  z-index: 2;
  transform-origin: 50% 100%;
  transform: perspective(160px) rotateX(-180deg);
}

.M-FlipCard.up .front:before,
.M-FlipCard.up .back:after {
  z-index: 1;
}

.M-FlipCard.up.go .front:after {
  transform-origin: 50% 0;
  animation: frontFlipUp 0.6s ease-in-out both;
  box-shadow: 0 2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.M-FlipCard.up.go .back:before {
  animation: backFlipUp 0.6s ease-in-out both;
}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}

.M-FlipCard .number0:before,
.M-FlipCard .number0:after {
  content: '0';
}

.M-FlipCard .number1:before,
.M-FlipCard .number1:after {
  content: '1';
}

.M-FlipCard .number2:before,
.M-FlipCard .number2:after {
  content: '2';
}

.M-FlipCard .number3:before,
.M-FlipCard .number3:after {
  content: '3';
}

.M-FlipCard .number4:before,
.M-FlipCard .number4:after {
  content: '4';
}

.M-FlipCard .number5:before,
.M-FlipCard .number5:after {
  content: '5';
}

.M-FlipCard .number6:before,
.M-FlipCard .number6:after {
  content: '6';
}

.M-FlipCard .number7:before,
.M-FlipCard .number7:after {
  content: '7';
}

.M-FlipCard .number8:before,
.M-FlipCard .number8:after {
  content: '8';
}

.M-FlipCard .number9:before,
.M-FlipCard .number9:after {
  content: '9';
}
</style>
