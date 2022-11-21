<template>
<div @scroll.stop class="singleBook" :class="{preCloseBook: preCloseBook}">
  <flipbook :zooms="null" :gloss="0.1" :ambient="0.8" class="flipbook" :pages="pages" v-slot="flipbook">
    <div @click="closeBook" class="bookTitle">
      <img :src="back_android_light" alt="">
      {{title}}
    </div>
    <div class="controls">
      <div class="btn" @click="flipbook.flipLeft">
        <img :src="ChevronLeft" alt="">
        <span class="text">
        上一页
        </span>
      </div>
      <div class="btn" @click="flipbook.flipRight">
        <span class="text">
        下一页
        </span>
        <img :src="ChevronRight" alt="">
      </div>
    </div>
  </flipbook>
</div>

</template>

<script>
import flipbook from 'flipbook-vue'
import ChevronLeft from '../assets/chevron-left.svg'
import ChevronRight from '../assets/chevron-right.svg'
import back_android_light from '../assets/back_android_light.svg'
export default {
  name: "BooksDisplay",
  props:{
    pages: Array,
    title: String
  },
  data(){
    return {
      ChevronLeft,
      ChevronRight,
      preCloseBook: false,
      back_android_light
    }
  },
  methods: {
    closeBook() {
      this.preCloseBook=true
      this.$emit('close')
    }
  },
  components: {
    flipbook,
  }
}
</script>

<style>
.singleBook {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  background: rgba(245, 245, 245, 0.5);
  backdrop-filter: blur(20px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s cubic-bezier(0, 0, 0, 0.99);
}
.preCloseBook.singleBook {
  animation: fadeOut 0.3s cubic-bezier(0, 0, 0, 0.99);
}

.singleBook .flipbook-container {
  animation: zoomIn 0.3s cubic-bezier(0, 0, 0, 0.99);
}
.preCloseBook.singleBook .flipbook-container {
  animation: zoomOut 0.3s cubic-bezier(0, 0, 0, 0.99);
}

@keyframes zoomIn {
  from {
    transform: scale(0.7);
    transform-origin: center;
  }
  to {
    transform: scale(1);
    transform-origin: center;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes zoomOut {
  from {
    transform: scale(1);
    transform-origin: center;
  }
  to {
    transform: scale(0.7);
    transform-origin: center;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.controls {
  display: flex;
  gap: 24px;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
}
.btn {
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  padding: 5px 8px;
  cursor: pointer;
  vertical-align: center;
}
.btn:hover {
  background-color: rgba(0, 0, 0, 0.15);
}
.btn:active {
  background-color: rgba(0, 0, 0, 0.3);
}
.btn img {
  width: 12px;
  height: 12px;
}
.btn .text {
  height: 14px;
  line-height: 14px;
}
.bookTitle {
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
  display: flex;
  align-items: center; gap: 4px;
  border-radius: 4px;
  padding: 5px 8px;
  float: left;
  cursor: pointer;
}
.bookTitle img {
  width: 24px;
  height: 24px;
}
.bookTitle:hover {
  background-color: rgba(0, 0, 0, 0.15);
}
.bookTitle:active {
  background-color: rgba(0, 0, 0, 0.3);
}
.singleBook .flipbook .viewport {
  width: 90vw !important;
  height: calc(100vh - 50px - 162px) !important;
  margin: 0 auto;
}
img.page:first-of-type {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
img.page:last-of-type {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
