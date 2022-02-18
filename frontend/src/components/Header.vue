<template>
  <div>
    <div class="nav-menu">
      <div
        style=""
        class="container d-flex justify-content-between align-items-center"
      >
        <div class="logo-brand">
          <img
            src="https://andshop-vue.netlify.app/_nuxt/img/logo.f486653.png"
            alt=""
          />
        </div>
        <nav class="nav-left">
          <ul>
            <li>
              <router-link @click="scrollToTop()" class="nav-link active" to="/"
                >Home</router-link
              >
            </li>
            <li>
              <router-link @click="scrollToTop()" class="nav-link" to="/about"
                >About</router-link
              >
            </li>
            <li>
              <router-link @click="scrollToTop()" class="nav-link" to="/products"
                >Products</router-link
              >
            </li>
            <li>
              <router-link
                @click="scrollToTop()"
                class="nav-link"
                to="/favourite"
                >Wishlist</router-link
              >
            </li>
            <li>
              <router-link @click="scrollToTop()" class="nav-link" to="/cart"
                >Cart</router-link
              >
            </li>
          </ul>
        </nav>
        <nav class="nav-right">
          <ul class="">
            <li
              style="padding-right: 14px; cursor: pointer"
              class="wish-list-btn-slide"
            >
              <i style="font-size: 20px" class="icon fas fa-heart"></i>
              <span class="number number-wish-list">{{
                favourites.length
              }}</span>
            </li>
            <li style="cursor: pointer" class="btn-slide">
              <i style="font-size: 20px" class="icon fas fa-shopping-cart"></i>
              <span class="number number-cart">{{ totalQuantityCart }}</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="slide-down-wishlist">
      <div class="close-btn">
        <button class="wish-list-cls">
          <i class="fas fa-times"></i>
          <span style="margin-left: 5px">Close</span>
        </button>
      </div>
      <div class="d-flex justify-content-between title">
        <h5>wishlist :</h5>
        <span v-if="favourites.length" style="cursor:pointer" @click="clearWishlist()">
          <i class="fas fa-trash-alt"></i>
          Clear Wishlist
        </span>
      </div>
      <div v-if="!favourites.length" class="no-item">
        <p>No items in wishlist</p>
      </div>
      <div v-else class="has-item">
        <ul class="mini-product-list">
          <li v-for="f in favourites" :key="f.id">
            <div class="product-image">
              <img
                :src="`http://localhost:3000/public/image/products/${f.image}`"
                alt=""
              />
            </div>
            <div class="product-detail">
              <p>
                {{ f.name }}
              </p>
              <div class="icon">
                <button @click="deleteItemFavourite(f)" class="bt">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="cart-options">
                <span> $ {{ f.price }}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="view">
          <button class="view-btn">
            <router-link
              @click="scrollToTop()"
              class="nav-link active"
              to="/favourite"
              >View Wishlist</router-link
            >
          </button>
        </div>
      </div>
    </div>
    <div class="slide-down-cart">
      <div class="close-btn">
        <button class="cls">
          <i class="fas fa-times"></i>
          <span style="margin-left: 5px">Close</span>
        </button>
      </div>
      <div class="d-flex justify-content-between title">
        <h5>shopping cart :</h5>
        <span v-if="cart.length" style="cursor:pointer" @click="clearCart()">
          <i class="fas fa-trash-alt"></i>
          Clear Cart
        </span>
      </div>
      <div v-if="!cart.length" class="no-item">
        <p>No items in cart</p>
      </div>
      <div v-else class="has-item">
        <ul class="mini-product-list">
          <li v-for="c in cart" :key="c.id">
            <div class="product-image">
              <img
                :src="`http://localhost:3000/public/image/products/${c.image}`"
                alt=""
              />
            </div>
            <div class="product-detail">
              <p>
                {{ c.name }}
              </p>
              <div class="icon">
                <button @click="deleteItemCart(c)" class="bt">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div class="cart-options">
                <span>{{ c.quantity }} x</span>
                <span> $ {{ c.price }}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="summary">
          <div class="total">
            <span class="label">Total</span>
            <span class="price">$ {{ totalPrice }}</span>
          </div>
        </div>
        <div class="check-out">
          <button style="margin-bottom: 25px" class="btn btn-checkout">
            Checkout
          </button>
          <button class="btn btn-view-cart">
            <router-link @click="scrollToTop()" to="/cart"
              >View Cart</router-link
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Event scrolling navbar
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

$(document).ready(function () {
  $(window).scroll(function () {
    if (window.scrollY > 0) {
      $(".nav-menu").addClass("sticky");
    } else $(".nav-menu").removeClass("sticky");
  });

  // wishlist slide down
  let $wishlist = $(".slide-down-wishlist");
  $(".wish-list-btn-slide").click(function () {
    $wishlist.toggleClass("is-active");
  });
  $(document).mouseup(function (e) {
    if (!$wishlist.is(e.target) && $wishlist.has(e.target).length === 0) {
      $wishlist.removeClass("is-active");
    }
  });
  $(".wish-list-cls").click(function () {
    $wishlist.toggleClass("is-active");
  });

  //cart slide down
  let $cart = $(".slide-down-cart");
  $(".btn-slide").click(function () {
    $cart.toggleClass("is-active");
  });
  $(document).mouseup(function (e) {
    if (!$cart.is(e.target) && $cart.has(e.target).length === 0) {
      $cart.removeClass("is-active");
    }
  });
  $(".cls").click(function () {
    $cart.toggleClass("is-active");
  });
});
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      cart: [],
      favourites: [],
    };
  },
  methods: {
    deleteItemCart(item) {
      axios.delete(`http://localhost:3000/cart/${item.id}`);
    },
    deleteItemFavourite(item) {
      axios.delete(`http://localhost:3000/favourites/${item.id}`);
    },
    clearCart() {
      if (confirm('Do you want to clear all of the items ?')) {
        axios.delete("http://localhost:3000/cart");
      } else return false;
    },
    clearWishlist() {
      if (confirm('Do you want to clear all of the items ?')) {
        axios.delete("http://localhost:3000/favourites");
      } else return false;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  computed: {
    totalQuantityCart() {
      return this.cart.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0);
    },
    totalPrice() {
      let total = 0;
      this.cart.map(function (item) {
        return (total += item.quantity * item.price);
      });
      return total;
    },
  },
  mounted() {
    this.cartApi();
    this.refreshCart();
    this.favouritesApi();
    this.refreshFavourites();
  },
};
</script>
<style scoped>
ul {
  margin-bottom: 0;
}
li {
  display: inline-block;
}
li a {
  color: #444444;
  font-size: 18px;
  font-weight: 500px;
  padding: 15px;
}
.logo-brand {
  display: flex;
  align-items: center;
}
.nav-left {
  display: flex;
  align-items: center;
}
.nav-left li {
  padding: 0 40px;
}
.nav-right {
  position: relative;
  display: flex;
  align-items: center;
}
.nav-right li .icon:hover {
  color: #b8860b;
  transition: 0.4s;
}
.nav-menu {
  margin-top: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: 0.5s;
  /* padding-top: 10px; */
  background-color: #fff;
  text-align: center;
  z-index: 999;
}
.sticky {
  box-shadow: 0px 0px 17px -1px rgb(0 0 0 / 66%);
  margin-top: 0;
}
.number {
  display: inline-block;
  font-size: 11px;
  background: #b8860b;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0;
  font-weight: 600;
}
.number-wish-list {
  left: -5px;
  position: relative;
}
.number-cart {
  left: -4px;
  position: relative;
}
.slide-down-cart,
.slide-down-wishlist {
  background: #fff;
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: 9999;
  transition: transform 0.5s ease;
  width: 456px;
  padding: 16px 20px 10px;
  display: none;
  overflow-y: auto;
}
.title {
  margin-bottom: 22px;
  border-bottom: 1px solid #e4e4e4;
  margin-top: 7px;
}
.close-btn {
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
}
.close-btn button {
  font-weight: 400;
  margin-bottom: 30px;
}
h5 {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 20px;
  padding-bottom: 17px;
  margin-bottom: 0;
}
.no-item {
  padding: 15px 25px;
  float: left;
  width: 100%;
}
.no-item p {
  text-align: center;
  margin-bottom: 30px;
}
.text-continue {
  text-align: center;
}
.text-continue button {
  background: #f8e6e2;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 0;
  color: #000;
  display: inline-block;
  font-family: Muli;
  font-weight: 700;
  line-height: 1.15;
  padding: 15px 40px;
  margin: 0;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 17px;
}
.mini-product-list {
  max-height: calc(100% - 270px);
}
.mini-product-list li {
  border-left: none;
  border-bottom: 1px solid #e4e4e4;
  padding: 5px 15px 15px !important;
  margin-bottom: 10px;
  border-radius: 0;
  display: inline-block;
  width: 100%;
  position: relative;
}
.product-detail .icon {
  position: absolute;
  right: 5px;
  top: 6px;
  padding: 0 !important;
}
.product-image {
  line-height: normal;
  float: left;
  display: block;
  width: 70px;
  height: auto;
  margin-right: 15px;
  margin-left: 0;
  padding: 0 !important;
}
.total {
  color: #000;
  display: inline-block;
  margin-left: 0;
  margin-bottom: 15px;
  width: 100%;
  font-size: 18px;
}
.price {
  color: #7d597d;
  margin-left: 15px;
  float: right;
}
.check-out {
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 0 0 24px;
  margin-top: 10px;
}
.btn-checkout,
.btn-view-cart,
.view-btn {
  margin: 8px 0;
  padding: 8px 20px;
  width: 100%;
  background: #f8e6e2;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 0;
  color: #000;
  display: inline-block;
  font-family: Muli;
  font-weight: 700;
  line-height: 1.15;
  z-index: 1;
  overflow: hidden;
  position: relative;
  padding: 15px 40px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  font-size: 17px;
  outline: none;
  transition: all 0.4s ease-in-out;
}
.is-active {
  display: block;
}
.btn-view-cart a {
  color: #000;
}
</style>
