import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();


createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router)  
    .mixin({
        methods: {
            productsApi() {
                axios
                    .get("http://localhost:3000/products")
                    .then((response) => (this.products = response.data.myData));
            },
            refreshProductsApi() {
                setInterval(() => {
                    this.productsApi();
                }, 100);
            },
            menApi() {
                axios
                    .get("http://localhost:3000/products/men")
                    .then((response) => (this.men = response.data.myData));
            },
            refreshMen() {
                setInterval(() => {
                    this.menApi();
                }, 100);
            },
            womenApi() {
                axios
                    .get("http://localhost:3000/products/women")
                    .then((response) => (this.women = response.data.myData));
            },
            refreshWomen() {
                setInterval(() => {
                    this.womenApi();
                }, 100);
            },
            othersApi() {
                axios
                    .get("http://localhost:3000/products/others")
                    .then((response) => (this.others = response.data.myData));
            },
            refreshOthers() {
                setInterval(() => {
                    this.othersApi();
                }, 100);
            },
            cartApi() {
                axios
                    .get("http://localhost:3000/cart")
                    .then((response) => (this.cart = response.data.myData));
            },
            refreshCart() {
                setInterval(() => {
                    this.cartApi();
                }, 100);
            },
            favouritesApi() {
                axios
                    .get("http://localhost:3000/favourites")
                    .then((response) => (this.favourites = response.data.myData));
            },
            accountsApi() {
                axios
                    .get("http://localhost:3000/accounts")
                    .then((response) => (this.accounts = response.data.myData));
            },
            refreshFavourites() {
                setInterval(() => {
                    this.favouritesApi();
                }, 100);
            },
            reviewApi() {
                axios
                    .get("http://localhost:3000/review")
                    .then((response) => (this.review = response.data.myData));
            },
            refreshReview() {
                setInterval(() => {
                    this.reviewApi();
                }, 100);
            },
            sortNewestApi() {
                axios
                    .get("http://localhost:3000/products/sort/newest")
                    .then((response) => (this.newest = response.data.myData));
            },
            sortOldestApi() {
                axios
                    .get("http://localhost:3000/products/sort/oldest")
                    .then((response) => (this.oldest = response.data.myData));
            },
            sortHighPriceApi() {
                axios
                    .get("http://localhost:3000/products/sort/highprice")
                    .then((response) => (this.highPrice = response.data.myData));
            },
            sortLowPriceApi() {
                axios
                    .get("http://localhost:3000/products/sort/lowprice")
                    .then((response) => (this.lowPrice = response.data.myData));
            },
            scrollToTop() {
                window.scrollTo(0, 0);
            },

        },
    }).mount('#app')
