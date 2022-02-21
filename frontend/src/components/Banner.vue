<template>
  <div class="top container mt-5 mb-5">
    <swiper
      :effect="'fade'"
      :spaceBetween="30"
      :centeredSlides="true"
      :autoplay="{
        delay: 3500,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      class="mySwiper"
    >
      <swiper-slide>
        <img
          src="https://template.hasthemes.com/greek/greek/img/slider/h2/1.webp"
          alt=""
        />
        <div class="swiper-content">
          <h2 class="content-1">2022 collection</h2>
          <h2 class="content-2">Men's style</h2>
          <h2 class="content-1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            blanditiis!
          </h2>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img
          src="https://template.hasthemes.com/greek/greek/img/slider/h2/2.webp"
          alt=""
        />
        <div class="swiper-content2">
          <h2 class="content-1">2022 collection</h2>
          <h2 class="content-2">Men's style</h2>
          <h2 class="content-1">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
            blanditiis!
          </h2>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import SwiperCore, { EffectFade, Autoplay, Pagination } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/components/effect-fade";
import "swiper/components/pagination";

SwiperCore.use([Autoplay, EffectFade, Pagination]);

export default {
  name: "Banner",
  components: {
    Swiper,
    SwiperSlide,
  },
};

import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

$(document).ready(function () {
  $(".mySwiper").mouseover(function () {
    $(".swiper-pagination-bullet").css("display", "inline-block");
  });
  $(".mySwiper").mouseout(function () {
    $(".swiper-pagination-bullet").css("display", "none");
  });
});
</script>
<style scoped>
.top {
  margin-top: 80px !important;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-content {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  max-width: 0.5rem;
  transform: translate(-50%, -50%);
  animation: slow 3.5s ease forwards;
}
@keyframes slow {
  from {
    max-width: 0.5rem;
  }
  to {
    max-width: 30rem;
  }
}
.content-1,
.content-2 {
  font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #222;
  width: 300px;
}
.content-2 {
  padding: 7px 0;
  border: 5px solid #222;
  font-size: 30px;
}
.swiper-content2 {
  position: absolute;
  top: 60%;
  left: 80%;
  text-align: center;
  transform: translate(-60%, -80%);
  font-size: 15px;
}
</style>