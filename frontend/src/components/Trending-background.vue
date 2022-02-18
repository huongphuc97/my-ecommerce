<template>
  <div class="background mt-5">
    <div class="container">
      <div class="content text-center">
        <h5>Trending</h5>
        <h3>New fashion</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi beatae
        </p>
        <button>SHOP NOW</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Trending-background",
};
</script>
<style scoped>
.background {
  background-image: url(https://andshop-vue.netlify.app/_nuxt/img/offer-banner.b01027d.png);
  background-size: cover;
  background-position: 50%;
  padding: 120px 0;
}
button {
  padding: 10px 24px;
  background-color: #fff;
  color: #000;
  text-transform: uppercase;
  border: none;
  margin-top: 2px;
}
h5 {
  color: #f79837;
}
h3,
p {
  color: #fff;
}
</style>