<template>
  <div class="parent">
    <div class="top"></div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "TestPage"
}
</script>

<style scoped>
.parent {
  position: relative;
}

.top {
  position: absolute;
  background: rgba(66, 185, 131, 0.37);
  /*opacity: 0.5;*/
  backdrop-filter: blur(5px);
  filter: blur(10px);
  width: 50px;
  height: 50px;
  left: 25px;
  top: 25px;
  z-index: 10;
}

.bottom {
  position: absolute;
  background: #7c0909;
  width: 50px;
  height: 50px;
}

</style>
