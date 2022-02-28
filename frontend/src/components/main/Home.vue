<template>
  <div>
    <Banner />
    <Introduce-products />
    <Divide-products />
    <Background-countdown />
    <div class="container mt-5">
      <div class="text-center">
        <h1>Products</h1>
        <p>Mauris luctus nisi sapien tristique dignissim ornare</p>
      </div>
      <div class="row">
        <div
          v-for="item in info"
          :key="item.id"
          class="col-lg-3 col-md-6 mt-5 clothe"
        >
          <div class="card text-left">
            <img
              class="card-img-top"
              :src="`https://api-ecm.herokuapp.com/public/image/products/${item.image}`"
              alt=""
            />
            <div class="right-buttons d-flex">
              <button @click="addFavourite(item, 1)" class="button-right">
                <i class="far fa-heart"></i>
              </button>
              <router-link
                @click="this.scrollToTop()"
                :to="`/detail/${item.name}/${item.id}`"
              >
                <button class="button-right">
                  <i class="fas fa-expand"></i>
                </button>
              </router-link>
            </div>
            <div class="add-cart-btn">
              <button @click="addCart(item, 1)" class="btn-detail">
                Add To Cart
              </button>
            </div>
            <div class="card-body text-center">
              <h4 class="card-title">{{ item.name }}</h4>
              <p class="card-text">$ {{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <VueTailwindPagination
        :current="currentPage"
        :total="total"
        :per-page="perPage"
        @page-changed="pageChange($event)"
      />
    </div>
    <Trending-background />
  </div>
</template>

<script>
import Banner from "../Banner.vue";
import IntroduceProducts from "../Introduce-products.vue";
import DivideProducts from "../Divide-products.vue";
import BackgroundCountdown from "../Background-countdown.vue";
import "@ocrv/vue-tailwind-pagination/dist/style.css";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import TrendingBackground from "../Trending-background.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Banner,
    IntroduceProducts,
    DivideProducts,
    BackgroundCountdown,
    VueTailwindPagination,
    TrendingBackground,
  },
  data() {
    return {
      currentPage: 0,
      perPage: 0,
      total: 0,
      info: [],
      cart: [],
      products: [],
      favourites: [],
    };
  },
  methods: {
    pageChange(event) {
      this.currentPage = event;
      this.getData();
    },
    async getData() {
      var response = await axios.get(
        `https://api-ecm.herokuapp.com/products/homepage=${this.currentPage}`
      );
      var responseData = response.data;
      this.currentPage = responseData.page;
      this.perPage = responseData.per_page;
      this.total = responseData.total;
      this.info = response.data.myData;
    },
    addCart(product, quantity1) {
      var foundItem = this.cart.find((item) => {
        return item.id == product.id;
      });
      if (foundItem) {
        axios.put(`https://api-ecm.herokuapp.com/cart/${foundItem.id}`, {
          quantity: (foundItem.quantity += quantity1) > 3 ? 1 : 2,
        });
      } else {
        axios.post("https://api-ecm.herokuapp.com/cart", {
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
        axios.post("https://api-ecm.herokuapp.com/favourites", {
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
    this.currentPage = 1;
    this.getData();
    this.cartApi();
    this.refreshCart();
    this.favouritesApi();
    this.refreshFavourites();
  },
};
</script>
<style scoped>
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
.clothe:hover .add-cart-btn {
  display: block;
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
img {
  width: 100%;
  height: 350px;
}
@media screen and (max-width: 1250px) {
  img {
    height: unset;
  }
}
</style>
