import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fab);
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mixin({
    methods: {
      productsApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/products")
          .then((response) => (this.products = response.data.myData));
      },
      menApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/products/men")
          .then((response) => (this.men = response.data.myData));
      },
      womenApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/products/women")
          .then((response) => (this.women = response.data.myData));
      },
      othersApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/products/others")
          .then((response) => (this.others = response.data.myData));
      },
      cartApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/cart")
          .then((response) => (this.cart = response.data.myData));
      },
      categoryApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/categories")
          .then((response) => (this.categories = response.data.myData));
      },
      favouritesApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/favourites")
          .then((response) => (this.favourites = response.data.myData));
      },
      accountsApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/accounts")
          .then((response) => (this.accounts = response.data.myData));
      },
      reviewApi() {
        axios
          .get("https://my-api-for-frontend.herokuapp.com/review")
          .then((response) => (this.review = response.data.myData));
      },
      sortNewestApi() {
        axios
          .get(
            "https://my-api-for-frontend.herokuapp.com/products/sort/newest"
          )
          .then((response) => (this.newest = response.data.myData));
      },
      sortOldestApi() {
        axios
          .get(
            "https://my-api-for-frontend.herokuapp.com/products/sort/oldest"
          )
          .then((response) => (this.oldest = response.data.myData));
      },
      sortHighPriceApi() {
        axios
          .get(
            "https://my-api-for-frontend.herokuapp.com/products/sort/highprice"
          )
          .then((response) => (this.highPrice = response.data.myData));
      },
      sortLowPriceApi() {
        axios
          .get(
            "https://my-api-for-frontend.herokuapp.com/products/sort/lowprice"
          )
          .then((response) => (this.lowPrice = response.data.myData));
      },
      scrollToTop() {
        window.scrollTo(0, 0);
      },
    },
  })
  .mount("#app");
