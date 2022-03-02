<template>
  <div class="container mt-5 mb-5">
    <div class="text-center">
      <h1>Featured Products</h1>
      <div class="featured-dropdown">
        <ul>
          <li class="spantoggle activated" data-id="#items-men">Men</li>
          <li class="spantoggle mr-5 ml-5" data-id="#items-women">Women</li>
          <li class="spantoggle" data-id="#items-others">Others</li>
        </ul>
      </div>
    </div>
    <div id="items-men" class="row">
      <div
        v-for="m in men"
        :key="m.id"
        class="col-lg-3 col-md-6 col-xs-12 mt-5 clothes activated no-border"
      >
        <div class="card text-left">
          <img
            class="card-img-top"
            :src="`https://api-for-ecm-app.herokuapp.com/public/image/products/${m.image}`"
            alt=""
          />
          <div class="right-buttons d-flex">
            <button @click="addFavourite(m, 1)" class="button-right">
              <i class="icon far fa-heart"></i>
            </button>
            <router-link
              @click="this.scrollToTop()"
              :to="`/detail/${m.name}/${m.id}`"
            >
              <button class="button-right">
                <i class="icon fas fa-expand"></i>
              </button>
            </router-link>
          </div>
          <div class="add-cart-btn">
            <button @click="addCart(m, 1)" class="btn-detail">
              Add To Cart
            </button>
          </div>
          <div class="card-body text-center">
            <h4 class="card-title">{{ m.name }}</h4>
            <p class="card-text">$ {{ m.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="items-women" class="row">
      <div
        v-for="w in women"
        :key="w.id"
        class="col-lg-3 col-md-6 col-xs-12 mt-5 clothes"
      >
        <div class="card text-left">
          <img
            class="card-img-top"
            :src="`https://api-for-ecm-app.herokuapp.com/public/image/products/${w.image}`"
            alt=""
          />
          <div class="right-buttons d-flex">
            <button @click="addFavourite(w, 1)" class="button-right">
              <i class="icon far fa-heart"></i>
            </button>
            <router-link
              @click="this.scrollToTop()"
              :to="`/detail/${w.name}/${w.id}`"
            >
              <button class="button-right">
                <i class="icon fas fa-expand"></i>
              </button>
            </router-link>
          </div>
          <div class="add-cart-btn">
            <button @click="addCart(w, 1)" class="btn-detail">
              Add To Cart
            </button>
          </div>
          <div class="card-body text-center">
            <h4 class="card-title">{{ w.name }}</h4>
            <p class="card-text">$ {{ w.price }}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="items-others" class="row">
      <div
        v-for="o in others"
        :key="o.id"
        class="col-lg-3 col-md-6 col-xs-12 mt-5 clothes"
      >
        <div class="card text-left">
          <img
            class="card-img-top"
            :src="`https://api-for-ecm-app.herokuapp.com/public/image/products/${o.image}`"
            alt=""
          />
          <div class="right-buttons d-flex">
            <button @click="addFavourite(o, 1)" class="button-right">
              <i class="icon far fa-heart"></i>
            </button>
            <router-link
              @click="this.scrollToTop()"
              :to="`/detail/${o.name}/${o.id}`"
            >
              <button class="button-right">
                <i class="icon fas fa-expand"></i>
              </button>
            </router-link>
          </div>
          <div class="add-cart-btn">
            <button @click="addCart(o, 1)" class="btn-detail">
              Add To Cart
            </button>
          </div>
          <div class="card-body text-center">
            <h4 class="card-title">{{ o.name }}</h4>
            <p class="card-text">$ {{ o.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

import axios from "axios";

export default {
  name: "Divide-products",
  data() {
    return {
      men: [],
      women: [],
      others: [],
      products: [],
      cart: [],
      favourites: [],
    };
  },
  methods: {
    addCart(product, quantity1) {
      var foundItem = this.cart.find((item) => {
        return item.id == product.id;
      });
      if (foundItem) {
        axios.put(`https://api-for-ecm-app.herokuapp.com/cart/${foundItem.id}`, {
          quantity: (foundItem.quantity += quantity1) >= 2 ? 2 : quantity1,
        });
      } else {
        axios.post("https://api-for-ecm-app.herokuapp.com/cart", {
          id: product.id,
          name: product.name,
          price: product.price,
          sale_price: product.sale_price,
          image: product.image,
          category_id: product.category_id,
          status: product.status,
          description: product.description,
          created_at: product.created_at,
        });
      }
    },
    addFavourite(product) {
      var foundItem = this.favourites.find((item) => {
        return item.id == product.id;
      });
      if (foundItem) {
        alert("Item already exists in wishlist");
      } else {
        axios.post("https://api-for-ecm-app.herokuapp.com/favourites", {
          id: product.id,
          name: product.name,
          price: product.price,
          sale_price: product.sale_price,
          image: product.image,
          category_id: product.category_id,
          status: product.status,
          description: product.description,
          created_at: product.created_at,
        });
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      $(document).ready(function () {
        $(".spantoggle").click(function () {
          $(".clothes").hide();
          let data = $(this).data("id");
          $(data).find(".clothes").fadeIn();
          $(".spantoggle").removeClass("activated");
          $(this).addClass("activated");
        });
      });
    });
    this.menApi();
    this.womenApi();
    this.othersApi();
    this.cartApi();
  },
};
</script>
<style scoped>
.featured-dropdown ul li {
  display: inline-block;
}
.spantoggle {
  cursor: pointer;
}
.clothes {
  display: none;
}
.activated {
  display: inline-block;
  border-bottom: 3px solid #a3a3a3;
}
.no-border {
  border-bottom: none;
}
.right-buttons {
  position: absolute;
  right: 20px;
  top: 25px;
  flex-direction: column;
}
.button-right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #212121;
  border-radius: 50%;
  background-color: #fff;
  margin-top: 20px;
}
.add-cart-btn {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -70%);
  display: none;
}
.btn-detail {
  color: #000;
  background-color: #fff;
  padding: 10px 20px;
  width: 230px;
}
.button-right:hover {
  color: #fff;
  transition: 0.4s;
  background-color: #ff7704;
}
.btn-detail:hover {
  color: #ff7704;
  transition: 0.4s;
}
.add-cart-btn:hover {
  transition: 0.6s;
}
.clothes:hover .add-cart-btn {
  display: inline-block;
}
</style>
