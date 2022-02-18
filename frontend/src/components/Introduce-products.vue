<template>
  <div class="mt-5 mb-5">
    <div class="row">
      <div class="col-md-4">
        <div class="product-1 mb-4">
          <img
            src="https://andshop-vue.netlify.app/_nuxt/img/woman.3e56b7a.png"
            alt=""
          />
          <div class="content-1">
            <h4>outerwear</h4>
            <h2>new</h2>
            <h3>collection</h3>
            <button>shop now</button>
          </div>
        </div>
        <div class="product-2">
          <img
            src="https://andshop-vue.netlify.app/_nuxt/img/woman1.f456ab6.png"
            alt=""
          />
          <div class="content-2">
            <h4>summer</h4>
            <h2>hot</h2>
            <h3>collection</h3>
            <button>shop now</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="product">
          <img
            width="100%"
            src="https://andshop-vue.netlify.app/_nuxt/img/bag.7606d44.png"
            alt=""
          />
          <div class="content-middle">
            <h1>10% offer</h1>
            <h2>no selected</h2>
            <h3>models</h3>
            <button>shop now</button>
          </div>
        </div>
      </div>
      <div class="col-md-4 content-right">
        <div class="product-1 mb-4">
          <img
            src="https://andshop-vue.netlify.app/_nuxt/img/woman4.26b67d7.png"
            alt=""
          />
          <div class="content-1">
            <h2>new</h2>
            <h3>arrivals</h3>
            <button>shop now</button>
          </div>
        </div>
        <div class="product-2">
          <img
            src="https://andshop-vue.netlify.app/_nuxt/img/kids.5fb714a.png"
            alt=""
          />
          <div class="content-2">
            <h2>hot</h2>
            <h3>offer</h3>
            <button>shop now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Introduce-products",
};
</script>
<style scoped>
.col-md-4 img {
  width: 100%;
  transition: 0.6s ease-in-out;
}
.product-1,
.product,
.product-2 {
  position: relative;
  overflow: hidden;
}
.content-1,
.content-2 {
  position: absolute;
  top: 17%;
  left: 13%;
  text-transform: uppercase;
}
.content-middle {
  position: absolute;
  top: 50%;
  left: 13%;
  text-transform: uppercase;
}
h4,
h1 {
  color: #f79837;
}
.content-right h3 {
  color: #f79837;
}
button {
  padding: 10px 24px;
  background-color: #000;
  color: #fff;
  text-transform: uppercase;
  border: none;
  margin-top: 2px;
}
.product:hover img,
.product-1:hover img,
.product-2:hover img {
  transform: scale(1.1); 
}
</style>