<template>
  <div>
    <Upper-header />
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import UpperHeader from "./components/Upper-header.vue";

export default {
  components: {
    Header,
    Footer,
    UpperHeader,
  },
  data() {
    return {};
  },
};
</script>
<style src="@vueform/slider/themes/default.css"></style>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Rubik", "Source Sans Pro", "HelveticaNeue-Light",
    "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande",
    sans-serif;
    overflow: hidden;
}
.row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.container {
  max-width: 1340px !important;
}
h1 {
  color: #000000;
}
section .items-center .text-gray-400,
section .items-center .border-indigo-400,
section .items-center .font-medium {
  display: none !important;
}
.min-w-max {
  justify-content: center !important;
  display: flex !important;
  padding-top: 30px;
}
.min-w-max section {
  border: none !important;
}
section ul li a {
  color: #000 !important;
}
section ul li {
  padding-right: 4px !important;
}
section ul li a .rounded-md {
  border: none;
  border-radius: 0;
  box-shadow: none;
  text-decoration: none !important;
  width: 40px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  margin: 0;
  border-radius: 50%;
}
.slider-base {
  margin-top: 50px;
}
</style>