<template>
  <div class="products">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div
            class="d-flex justify-content-end align-items-center products-sort"
          >
            <p style="padding-right: 30px">Sort By:</p>

            <select
              class="custom-select"
              v-model="selectOption"
              @change="changeSelect(this.selectOption)"
            >
              <option disabled value="">Choose</option>
              <option value="newest">By Newest</option>
              <option value="oldest">By Oldest</option>
              <option value="highToLow">Price: High To Low</option>
              <option value="lowToHigh">Price: Low To High</option>
            </select>
            <div class="sort-icons">
              <ul class="d-flex">
                <li><i class="fas fa-th"></i></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <div class="products-search mt-5">
            <form action="" @submit.prevent="searchProduct">
              <input
                type="text"
                class="form-control"
                id="inputForSearch"
                placeholder="Search"
              />
              <button type="submit"><i class="fas fa-search"></i></button>
            </form>
          </div>
          <div class="categories">
            <h4>Product Categories</h4>
            <form action="">
              <label class="custom-categories" for="products">
                <input
                  type="radio"
                  id="products"
                  value="products"
                  @change="cate"
                  v-model="searchCategories"
                  checked
                />
                All Products
              </label>
              <label class="custom-categories" for="men">
                <input
                  type="radio"
                  id="men"
                  value="men"
                  @change="cate"
                  v-model="searchCategories"
                />
                Men
              </label>
              <label class="custom-categories" for="women">
                <input
                  type="radio"
                  id="women"
                  value="women"
                  @change="cate"
                  v-model="searchCategories"
                />
                Women
              </label>
              <label class="custom-categories" for="others">
                <input
                  type="radio"
                  id="others"
                  value="others"
                  @change="cate"
                  v-model="searchCategories"
                />
                Others
              </label>
            </form>
          </div>
          <div class="price-filter">
            <h4>Price</h4>
            <Slider
              :min="10"
              :max="5000"
              :format="format"
              v-model="value"
              @click="searchByPrice"
            />
          </div>
        </div>
        <div class="col-md-9">
          <div v-if="this.products" class="row">
            <div
              v-for="total in products"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.searchProductByKey" class="row">
            <div
              v-for="total in searchProductByKey"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  v-if="total.image"
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 v-if="total.name" class="card-title">{{ total.name }}</h4>
                  <p v-if="total.price" class="card-text">
                    $ {{ total.price }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.newest" class="row">
            <div
              v-for="total in newest"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.oldest" class="row">
            <div
              v-for="total in oldest"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.highPrice" class="row">
            <div
              v-for="total in highPrice"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.lowPrice" class="row">
            <div
              v-for="total in lowPrice"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.men" class="row">
            <div v-for="total in men" :key="total.id" class="col-md-4 mt-5 pro">
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.women" class="row">
            <div
              v-for="total in women"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.others" class="row">
            <div
              v-for="total in others"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="this.rangePriceValue" class="row">
            <div
              v-for="total in rangePriceValue"
              :key="total.id"
              class="col-md-4 mt-5 pro"
            >
              <div class="card text-left">
                <img
                  class="card-img-top"
                  :src="`https://api-ecm.herokuapp.com/public/image/products/${total.image}`"
                  alt=""
                />
                <div class="right-buttons d-flex">
                  <button @click="addFavourite(total, 1)" class="button-right">
                    <i class="far fa-heart"></i>
                  </button>
                  <router-link
                    @click="this.scrollToTop()"
                    :to="`/detail/${total.name}/${total.id}`"
                  >
                    <button class="button-right">
                      <i class="fas fa-expand"></i>
                    </button>
                  </router-link>
                </div>
                <div class="add-cart-btn">
                  <button @click="addCart(total, 1)" class="btn-detail">
                    Add To Cart
                  </button>
                </div>
                <div class="card-body text-center">
                  <h4 class="card-title">{{ total.name }}</h4>
                  <p class="card-text">$ {{ total.price }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="this.products" class="row">
            <div class="col-md-12">
              <VueTailwindPagination
                :current="currentPage"
                :total="total"
                :per-page="perPage"
                @page-changed="pageChange($event)"
              />
            </div>
          </div>
          <div v-if="this.women" class="row">
            <div class="col-md-12">
              <VueTailwindPagination
                :current="currentPageWomen"
                :total="totalWomen"
                :per-page="perPageWomen"
                @page-changed="pageChangeWomen($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";
import Slider from "@vueform/slider";
export default {
  name: "Products",
  components: {
    VueTailwindPagination,
    Slider,
  },
  data() {
    return {
      currentPage: 0,
      perPage: 0,
      total: 0,
      currentPageWomen: 0,
      perPageWomen: 0,
      totalWomen: 0,
      products: [],
      cart: [],
      favourites: [],
      men: [],
      women: [],
      others: [],
      searchCategories: "products",
      value: [10, 1000],
      rangePriceValue: [],
      format: {
        prefix: "$",
        decimals: 0,
      },
      selectOption: "",
      newest: [],
      oldest: [],
      highPrice: [],
      lowPrice: [],
      searchProductByKey: [],
    };
  },
  methods: {
    pageChange(event) {
      this.currentPage = event;
      this.getData();
    },
    pageChangeWomen(event) {
      this.currentPageWomen = event;
      this.cate();
    },
    async getData() {
      var response = await axios.get(
        `https://api-ecm.herokuapp.com/products/pages=${this.currentPage}`
      );
      var responseData = response.data;
      this.currentPage = responseData.page;
      this.perPage = responseData.per_page;
      this.total = responseData.total;
      this.products = response.data.myData;
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
    searchByPrice() {
      axios
        .get(`https://api-ecm.herokuapp.com/products/range/${this.value}`)
        .then((response) => (this.rangePriceValue = response.data.myData));
      this.men = false;
      this.products = false;
      this.women = false;
      this.others = false;
      this.newest = false;
      this.oldest = false;
      this.highPrice = false;
      this.lowPrice = false;
      this.searchProductByKey = false;
    },
    async cate() {
      this.newest = false;
      this.oldest = false;
      this.highPrice = false;
      this.lowPrice = false;
      this.rangePriceValue = false;
      this.searchProductByKey = false;
      if (this.searchCategories === "men") {
        this.men = this.menApi();
        this.products = false;
        this.women = false;
        this.others = false;
      } else if (this.searchCategories === "women") {
        var response = await axios.get(
          `https://api-ecm.herokuapp.com/products/women/page/${this.currentPageWomen}`
        );
        var responseData = response.data;
        this.currentPageWomen = responseData.pageWomen;
        this.perPageWomen = responseData.per_pageWomen;
        this.totalWomen = responseData.totalWomen;
        this.women = response.data.myData;
        this.products = false;
        this.men = false;
        this.others = false;
      } else if (this.searchCategories === "others") {
        this.others = this.othersApi();
        this.products = false;
        this.men = false;
        this.women = false;
      } else {
        this.products = this.getData();
        this.men = false;
        this.women = false;
        this.others = false;
      }
    },
    changeSelect(option) {
      this.products = false;
      this.men = false;
      this.women = false;
      this.others = false;
      this.rangePriceValue = false;
      this.searchProductByKey = false;
      if (option == "newest") {
        this.newest = this.sortNewestApi();
        this.oldest = false;
        this.highPrice = false;
        this.lowPrice = false;
      } else if (option == "oldest") {
        this.oldest = this.sortOldestApi();
        this.newest = false;
        this.highPrice = false;
        this.lowPrice = false;
      } else if (option == "highToLow") {
        this.highPrice = this.sortHighPriceApi();
        this.oldest = false;
        this.newest = false;
        this.lowPrice = false;
      } else if (option == "lowToHigh") {
        this.lowPrice = this.sortLowPriceApi();
        this.oldest = false;
        this.highPrice = false;
        this.newest = false;
      }
    },
    searchProduct() {
      var getInput = document.getElementById("inputForSearch");
      axios
        .get(
          "https://api-ecm.herokuapp.com/products/search/bykey/" + getInput.value + ""
        )
        .then((response) => (this.searchProductByKey = response.data.myData));
      this.products = false;
      this.men = false;
      this.women = false;
      this.others = false;
      this.oldest = false;
      this.newest = false;
      this.lowPrice = false;
      this.highPrice = false;
      this.rangePriceValue = false;
    },
  },
  mounted() {
    this.currentPage = 1;
    this.getData();
    this.currentPageWomen = 1;
    this.cate();
    this.cartApi();
    this.refreshCart();
    this.favouritesApi();
    this.refreshFavourites();
  },
};
</script>
<style scoped>
.products {
  margin-top: 100px;
  margin-bottom: 50px;
}
.custom-select {
  width: 200px;
  padding: 12px;
  font-size: 16px;
  line-height: 1;
  height: 45px;
  background: url(http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat 100%;
  background-position-x: 170px;
  border: 1px solid;
  background-size: 6%;
}
p,
ul {
  margin-bottom: 0;
}
.sort-icons li {
  padding-left: 20px;
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
.pro:hover .add-cart-btn {
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
.form-control {
  width: 250px;
}
.products-search {
  position: relative;
}
.products-search button {
  background: none;
  position: absolute;
  top: 8px;
  right: 15px;
}
.categories {
  padding-top: 30px;
}
.categories h4,
.price-filter h4 {
  margin-bottom: 20px;
  font-size: 18px;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 10px;
}
.price-filter {
  padding-top: 20px;
}
.custom-categories {
  display: block;
  position: relative;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 16px;
}
</style>