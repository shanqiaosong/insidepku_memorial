<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@font-face {
  src: url("./assets/Manque-SemiBold-2.ttf");
  font-family: 'manque';
}
@font-face {
  src: url("./assets/BrogettaRegular-ZV5EK-2.ttf");
  font-family: 'brogetta';
}
@font-face {
  src: url("./assets/HFSpaceship-2.ttf");
  font-family: 'spaceship';
}
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "siyuan";
  font-weight: 400;
  src: url("//at.alicdn.com/wf/webfont/Kq5i7dmVsXTH/4qQhfe9LgxCm_0106tMTo.woff") format("woff2"),
    url("//at.alicdn.com/wf/webfont/Kq5i7dmVsXTH/x82QpZnfOJsp8B6Srcmsx.woff2") format("woff");
  font-display: swap;
}
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "siyuan";font-weight: 700;src: url("//at.alicdn.com/wf/webfont/Kq5i7dmVsXTH/I9A5xeV9nTAXHewmBnwBP.woff2") format("woff2"),
url("//at.alicdn.com/wf/webfont/Kq5i7dmVsXTH/VgqKxkIXYIahigeebCNSv.woff") format("woff");
  font-display: swap;
}
</style>
