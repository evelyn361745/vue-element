<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
body, div, span, header, footer, nav, section, 
aside, article, ul, dl, dt, dd, li, a, p, h1, h2,
 h3, h4,h5, h6, i, b, textarea, button, input, select, 
 figure, figcaption {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  border: none;
  font-weight: normal;
  font-family: "Microsoft Yahei";
  box-sizing: border-box;
  -webkit-tap-highlight-color:transparent;
  -webkit-font-smoothing: antialiased;
  &:hover{
    outline: none;
  }
}
html, body {
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
</style>