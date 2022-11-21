<template>
  <div class="container" @mousemove="handleMouseMove">
    <div v-if="animate" class="fallings">
      <div class="falling" :key="svg" :style="fallingStyle[idx]" v-for="(svg, idx) in fallingSvgs">
        <img :src="svg" alt="">
      </div>
    </div>
    <div ref="coverTiles" :style="coverTilesStyle" class="coverTiles">
      <div :style="coverContainerStyles[index]" class="coverContainer" :key="cover" v-for="(cover,index) in covers" >
        <!--      <img :style="coverStyles[index]" class="coverShadow" alt="cover" :src="cover">-->
        <img :style="coverStyles[index]" class="cover" alt="cover" :src="cover">
      </div>
      <!--    <img :style="coverBgStyles[index]" class="coverBg" alt="cover" :key="cover" v-for="(cover,index) in covers" :src="cover">-->
      <!--    <img class="coverBg" alt="cover" :src="covers[0]">-->
          <div v-for="(_, index) in decorationPositions" :key="index" :style="decorationStyles[index]" :class="`decoration decoration${index}`"/>
          <div class="titleContainer">
            <div :style="titleStyle" class="title">
              <div class="chinese">
                <div>此间</div>
                <div>纪念馆</div>
              </div>
              <div class="english">INSIDE PKU Memorial</div>
            </div>
          </div>
          <div :style="followerStyle" class="follower"/>
    </div>
    <div :key="section.title" class="section" v-for="section in timeline">
      <div class="title">
        <div class="star1">
          <img :src="Star" alt="">
        </div>
        <div class="star2">
          <img :src="StarLine" alt="">
        </div>
        {{section.title}}
        <div class="line"></div>
      </div>
      <div class="main">{{section.main}}</div>
      <img class="bg" :src="getPageUrl(section.books[0].key, 1)" alt="cover">
      <div v-if="section.quote" class="quote">{{section.quote}}</div>
      <div class="books">
        <div class="bookItem" style="position: relative" :class="{selected: book===openedBook&&book!==preCloseBook}" :key="book.key" v-for="book in section.books">
<!--          <img :src="getPageUrl(book.key, 1)" alt="cover">-->
          <div class="bookName">{{book.title}}</div>
          <div class="book">
            <flipbook :single-page="true" :flipDuration="300" :zooms="null" :gloss="0.5" :ambient="0.2" class="flipbook" :pages="[
              getPageUrl(book.key, 1), getPageUrl(book.key, 2), getPageUrl(book.key, 3)
          ]" v-slot="flipbook">
              <div @mouseleave="handleBookMouseOut(flipbook)" @mouseenter="handleBookMouseOver(flipbook)" class="mask" @click="openBook(book)"></div>
            </flipbook>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"> - 此间 - </div>
    <BooksDisplay :title="openedBook.title" @close="closeBook" v-if="openedBook" :pages="getAllPages(openedBook)"></BooksDisplay>
  </div>
</template>

<script>
import {shuffle} from "@/lib/algorithms";
import {timeline} from "@/text-contents/homepage";
import {getAllPages, getPageUrl} from "@/lib/resource";
import flipbook from 'flipbook-vue'
import BooksDisplay from "@/components/Books";
import Star from '@/assets/star.svg'
import StarLine from '@/assets/star-line.svg'
import svg1 from '@/assets/1.svg'
import svg2 from '@/assets/2.svg'
import svg3 from '@/assets/3.svg'
import svg4 from '@/assets/4.svg'
import svg5 from '@/assets/5.svg'
import svg6 from '@/assets/6.svg'
import svg7 from '@/assets/7.svg'
import svg8 from '@/assets/8.svg'

const covers = [
  '18autumn.jpeg',
  '18winter.jpeg',
  '19spring.jpeg',
  '19summer.jpeg',
  '19autumn.jpeg',
]
shuffle(covers)
// const positions = covers.map((_, index)=>{
//   return [1 / (covers.length + 1) * (index + 1) + 0.06, 1 / (covers.length + 1) * (index + 1) + 0.06]
// })
const positions = [
    [0.2, 0.2],
    [0.3, 0.8],
    [0.5, 0.4],
    [0.8, 0.8],
    [0.9, 0.2],
]
const decorationPositions = [
    [0.3, 0.2],
    [0.0, 1],
    [0.4, 0.5],
    [0.6, 0.1],
    [0.2, 0.7],
    [1, 0.5]
]
function minMax(num) {
  return Math.max(0, Math.min(1, 0.5 - num))
}
export default {
  name: "HomePage",
  // components: {Books},
  data(){
    return {
      covers,
      decorationPositions,
      mouseWidthRatio: 0.2,
      mouseHeightRatio: 0.2,
      mousePosition: {},
      originalOrientation: null, // beta - X, gamma - Y
      timeline,Star, StarLine,
      openedBook: null,
      preCloseBook: null,
      fallingSvgs: [
          svg1, svg2, svg3, svg4, svg5, svg6, svg7, svg8
      ],
      fallRounds: 0,
      animate: true
    }
  },
  components: {BooksDisplay, flipbook},
  mounted() {
    document.title='此间纪念馆'
    window.addEventListener('deviceorientation', (event) => {
      if (!this.originalOrientation) {
        this.originalOrientation = [event.beta, event.gamma]
      } else {
        this.mouseWidthRatio = minMax((event.gamma - this.originalOrientation[1]) / 50);
        this.mouseHeightRatio = minMax((event.beta - this.originalOrientation[0]) / 50);
      }
    }, false);
    setInterval(()=>{
      this.animate=false
      this.fallRounds+=1
      this.$nextTick(()=>{
        this.animate=true
      })
    },7000);
  },
  computed: {
    coverContainerStyles() {
      return covers.map((_, index)=>({
        left: positions[index][0] * 100 + 'vw',
        top: positions[index][1] * 100 + 'vh',
        animationDelay: 0.6 * index + 's',
        // zIndex: index * 10
      }))
    },
    coverStyles() {
      // const centerDistance = Math.pow(this.mouseHeightRatio - 0.5, 2) + Math.pow(this.mouseWidthRatio - 0.5, 2)
      return covers.map((_, index)=>({
        transform: `scale(${1 + 0.1 * this.adjustedWeights[index]}) `,
        filter: `blur(${70 * (1 - this.adjustedWeights[index])}px)`,
        opacity: 0.5 + 0.5 * this.adjustedWeights[index],
        willChange: 'transform filter opacity'
      }))
    },
    titleStyle() {
      const centerDistance = Math.pow(this.mouseHeightRatio - 0.5, 2) + Math.pow(this.mouseWidthRatio - 0.5, 2)
      return {
        transform: `translate(-50%, -70%) perspective(1000px) rotate3d( ${0.5 - this.mouseHeightRatio}, ${this.mouseWidthRatio - 0.5},0, ${centerDistance * 30}deg )`,
      }
    },
    coverBgStyles() {
      return covers.map((_, index)=>{
        let opacity = this.adjustedWeights[index]
        if (index === covers.length - 1) {
          opacity = 1
        }
        return {
          opacity,
          zIndex: -index - 1,
        }
      })
    },
    coverTilesStyle() {
      return covers.map((_, index)=>{
        return {
          animationDelay: 0.1 * index + 's'
        }
      })
    },
    weights() {
      return covers.map((_, index)=>{
        const distanceX = positions[index][0] - this.mouseWidthRatio;
        const distanceY = positions[index][1] - this.mouseHeightRatio;
        const distance = distanceX * distanceX + distanceY * distanceY;
        return Math.pow(Math.min(1, Math.max(1 - distance, 0)), 2);
      })
    },
    decorationWeights() {
      return decorationPositions.map((_, index)=>{
        const distanceX = decorationPositions[index][0] - this.mouseWidthRatio;
        const distanceY = decorationPositions[index][1] - this.mouseHeightRatio;
        const distance = distanceX * distanceX + distanceY * distanceY;
        return Math.pow(Math.min(1, Math.max(1 - distance, 0)), 4);
      })
    },
    decorationStyles() {
      return decorationPositions.map((position, index)=>{
        return {
          opacity: 0.2 * this.decorationWeights[index],
          left: position[0] * 100 + '%',
          top: position[1] * 100 + '%',
        }
      })
    },
    followerStyle() {
      return {
        transform: `translate(${this.mouseWidthRatio*this.$refs.coverTiles?.clientWidth}px,${this.mouseHeightRatio*this.$refs.coverTiles?.clientHeight}px)`
      }
    },
    adjustedWeights() {
      const sum = this.weights.reduce((a, b) => a + b, 0)
      const normalizedWeights = this.weights.map((w)=>Math.pow(w/sum, 1))
      const maxWeight = Math.max(...normalizedWeights)

      const withoutMaxWeight = [...normalizedWeights]
      withoutMaxWeight.splice(normalizedWeights.indexOf(maxWeight), 1)
      const secondMaxWeight = Math.max(...withoutMaxWeight)

      const differenceRatio = (maxWeight - secondMaxWeight) / 0.06
      const maxifiedWeights = normalizedWeights.map((w)=>w/maxWeight * (0.9 + 0.1 * (differenceRatio)))

      const maxMaxifiedWeights = Math.max(...maxifiedWeights, 1)

      const correctedWeights = maxifiedWeights.map((w)=>w/maxMaxifiedWeights * 0.9)

      return correctedWeights
    },
    fallingStyle() {
      return Array.from({length:8}).map((_,idx)=>{
        return {
          left: 100/8*((idx+this.fallRounds)%8)+100/16+'vw',
          animationDelay: Math.random()*5+'s',
          top: Math.random()*80+'vh',
        }
      })
    }
  },
  methods: {
    openBook(book) {
      console.log('opens')
      this.openedBook = book;
    },
    closeBook(){
      this.preCloseBook = this.openedBook;
      setTimeout(()=>{
        this.openedBook=null
        this.preCloseBook=null
      },300)
    },
    handleMouseMove(e) {
      if (this.originalOrientation) {
        return;
      }
      const screenWidth = this.$refs.coverTiles.clientWidth;
      const screenHeight = this.$refs.coverTiles.clientHeight;
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      this.mouseHeightRatio = mouseY / screenHeight;
      this.mouseWidthRatio = mouseX / screenWidth;
      this.mousePosition = {
        mouseX, mouseY
      }
    },
    getPageUrl,getAllPages,
    handleBookMouseOver(flipbook) {
      flipbook.flipRight();
    },
    handleBookMouseOut(flipbook) {
      flipbook.flipLeft();
    },
  }
}
</script>

<style scoped>
.fallings {
  width: 100%;
  overflow: hidden;
  position: absolute;
  height: 100vh;
  pointer-events: none;
}

.falling {
  width: 50px;
  height: 50px;
  position: absolute;
  animation: fall cubic-bezier(0.09, 0.52, 0.25, 0.87) 2.0s;
  opacity: 0;
}

.falling img {
  transform: scale(0.4);
}

@keyframes fall {
  0%{
    transform: translate(0, 0);
    opacity: 0;
    filter: blur(10px);
  }
  40% {
    opacity: 0.4;
  }
  50% {
    filter: blur(6px);
  }
  60% {
    opacity: 0.4;
  }
  100% {
    transform: translate(0, 160px);
    opacity: 0;
    filter: blur(10px);
  }
}

:global(body), :global(#app) {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;
  letter-spacing: 0.02em;
  font-family: 'siyuan', serif;
}

.container {
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
}

::-webkit-scrollbar{
  background-color: transparent;
  width: 6px;
  z-index: 200;
}
::-webkit-scrollbar-thumb{
  background-color: rgba(0,0,0,.2);
  border-radius: 3px;
  background-clip: content-box;
  border: 1px solid transparent;
  z-index: 200;
}

.coverTiles img {
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

.coverTiles {
  width: 100%;
  height: 100vh;
  position: relative;
  scroll-snap-align: start;
  overflow: visible;
  will-change: opacity;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.coverContainer {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
  height: 0;
  animation-name: float;
  animation-duration: 2s;
  animation-timing-function: cubic-bezier(0.74, 0.31, 0.23, 0.69);
  animation-iteration-count: infinite;
  will-change: filter;
  opacity: 0.3;
}

.cover {
  border-radius: 48px;
  /*box-shadow: rgba(255,255,255, 0.19) 9px 9px 20px 0;*/
  transform-origin: center;
  max-width: 80vw;
  max-height: 80vh;
  will-change: filter;
}

.coverShadow {
  border-radius: 48px;
  /*box-shadow: rgba(255,255,255, 0.19) 9px 9px 20px 0;*/
  transform-origin: center;
  position: absolute;
  filter: blur(100px) !important;
}

.coverBg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  filter: blur(100px) brightness(1.2) saturate(1.3);
  transform: scale(1.5);
}

.decoration {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: overlay;
}

.decoration0 {
  width: 400px;
  height: 400px;
  background: #f6832a;
  z-index: 51;
  filter: blur(80px);
}
.decoration1 {
  width: 300px;
  height: 300px;
  background: #ff6102;
  z-index: 50;
  filter: blur(100px);
}
.decoration2 {
  width: 300px;
  height: 300px;
  background: white;
  z-index: 35;
  filter: blur(60px);
  mix-blend-mode: overlay;
}
.decoration3 {
  width: 300px;
  height: 300px;
  background: #7c0909;
  z-index: 50;
  filter: blur(60px);
}
.decoration4 {
  width: 300px;
  height: 300px;
  background: rgba(112, 154, 89, 0.62);
  filter: blur(60px);
  z-index: 50;
}
.decoration5 {
  width: 600px;
  height: 600px;
  background: rgb(255, 191, 96);
  filter: blur(200px);
  z-index: 50;
}

.titleContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 50;
  min-width: 230px;
  opacity: 0.8;
  user-select: none;
}

.titleContainer .title {
  transform: translate(-50%, -70%);
  text-shadow: rgb(255 255 255 / 22%) 6px 6px 40px;
}

.chinese {
  color: #1c1c1c;
  font-weight: 700;
  font-size: 68px;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
  font-family: 'siyuan bold', serif;
}

.chinese > div {
  display: inline-block;
  line-height: 80px;
}

.english {
  color: #1c1c1c;
  font-weight: bold;
  font-size: 20px;
  font-family: "manque", "DIN Alternate", sans-serif;
  letter-spacing: 0.05em;
}

.follower {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: white;
  mix-blend-mode: overlay;
  position: absolute;
  top: -75px;
  left: -75px;
  filter: blur(80px);
  z-index: 60;
}
.section {
  scroll-snap-align: start;
  color: #1c1c1c;
  padding: 80px 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  position: relative;
}
.section .title{
  font-size: 48px;
  color: #2d2d2d;
  opacity: 0.9;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 24px;
  font-family: "manque", "DIN Alternate", sans-serif;
  position: relative;
  letter-spacing: 0.01em;
}
.title .line {
  width: 100px;
  height: 38px;
  transform: rotate(30deg);
  position: absolute;
  transform-origin: center;
  opacity: 0.3;
  left: -5px;
  top: 10px;
  border: 1px solid #2d2d2d;
  border-radius: 50%;
}
.title .star1 {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -36px;
  bottom: -19px;
}
.title .star2 {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: -34px;
  top: -20px;
}
.star1 img, .star2 img {
  width: 100%;
  height: 100%;
}
.main {
  font-size: 14px;
  max-width: calc(min(100vw - 70px, 800px));
  line-height: 1.5em;
}
img.bg {
  width: 80%;
  height: 60%;
  position: absolute;
  filter: blur(50px);
  z-index: -1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
  will-change: opacity;
}
.quote {
  font-size: 14px;
  opacity: 0.8;
  max-width: calc(min(100vw - 150px, 800px));
  position: relative;
  white-space: pre-wrap;
  text-align: justify;
  line-height: 1.5em;
}
.quote::before{
  content: '“';
  font-size: 80px;
  position: absolute;
  left: -60px;
  top: 10px;
  opacity: 0.2;
  height: 80px;
  font-family: manque, serif;
}
.quote::after{
  content: '”';
  font-size: 80px;
  position: absolute;
  right: -46px;
  bottom: -100px;
  opacity: 0.2;
  height: 80px;
  font-family: manque, serif;
}
.books {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}
.books .book {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 162px;
  width: 120px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: #73737345 5px 2px 20px;
  transition: all 0.3s;
}
.books .book .flipbook {
  height: 180px;
  width: 150px;
  cursor: pointer;
  position: relative;
  transition: all 0.5s;
}
.books .book .flipbook.opened {
  height: 70vh;
  width: 70vw;
}
.books .bookItem:hover {
  transform: scale(1.15);
  opacity: 0.8;
}
.books .bookItem:hover .book{
  box-shadow: rgba(115, 115, 115, 0.47) 10px 10px 40px;
}
.books .bookItem:active .book{
  box-shadow: rgba(115, 115, 115, 0.4) 10px 10px 30px;
}
.books .bookItem.selected .book{
  box-shadow: rgba(115, 115, 115, 0.4) 10px 10px 80px;
}
.books .bookItem:active {
  transform: scale(1.10);
  opacity: 0.6;
}
.books .selected {
  transform: scale(1.5);
  opacity: 0.3;
}
.bookItem {
  transition: all .4s ease-out;
  will-change: opacity;
  margin-top: 24px;
}
.bookName {
  position: absolute;
  bottom: -24px;
  padding-top: 1px;
  width: 80%;
  left: 10%;
  text-align: center;
  font-size: 12px;
  opacity: 0.6;
  border-top: 0.5px solid #1c1c1c;
  color: #1c1c1c;
  transition: all 0.3s;
  pointer-events: none;
}
.books .bookItem:hover .bookName,
.books .bookItem:active .bookName {
  opacity: 0;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
}
.footer {
  text-align: center;
  font-size: 14px;
  opacity: 0.3;
  margin: 24px;
}
</style>
