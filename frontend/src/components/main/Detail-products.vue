<template>
  <div class="wrap">
    <nav class="background">
      <div class="container">
        <h1>{{ name }}</h1>
        <ul style="margin-top: 20px">
          <li>
            <router-link @click="this.scrollToTop()" to="/">Home</router-link>
          </li>
          <li>/ Product</li>
          <li>/</li>
          <li>{{ name }}</li>
        </ul>
      </div>
    </nav>
    <div class="product-info">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="image-product">
              <img
                @click="toggler = !toggler"
                v-if="products.image"
                :src="`http://localhost:3000/public/image/products/${products.image}`"
                alt=""
              />
            </div>
            <div class="small-images">
              <div class="images">
                <div class="row">
                  <div class="col-md-4">
                    <img
                      @click="toggler = !toggler"
                      v-if="products.image"
                      :src="`http://localhost:3000/public/image/products/${products.image}`"
                      alt=""
                    />
                  </div>
                  <div class="col-md-4">
                    <img
                      @click="toggler = !toggler"
                      v-if="products.image"
                      :src="`http://localhost:3000/public/image/products/${products.image}`"
                      alt=""
                    />
                  </div>
                  <div class="col-md-4">
                    <img
                      @click="toggler = !toggler"
                      v-if="products.image"
                      :src="`http://localhost:3000/public/image/products/${products.image}`"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="info-product">
              <h2>{{ name }}</h2>
              <div class="pt-2 pb-3 d-flex justify-content-between">
                <star-rating
                  :star-size="20"
                  inactive-color="gray"
                  :show-rating="false"
                ></star-rating>
                <div class="real-sold">
                  <i class="fas fa-fire"></i>
                  <span style="padding-left: 10px"
                    >5 sold in last 12 hours</span
                  >
                </div>
              </div>
              <div class="text-cont">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Veritatis eveniet voluptatibus accusantium ipsum repellat
                  incidunt dolores, fuga aliquid quaerat ut expedita quae iure
                  animi ab atque fugiat temporibus ducimus. Nisi eos, aliquid
                  explicabo culpa provident quas, molestias mollitia nulla
                  eligendi quis, odio ducimus pariatur? Quo dicta enim quidem
                  dolore aliquid?
                </p>
              </div>
              <div class="row">
                <div class="col-md-6 price mt-2 mb-2">
                  <span>Price:</span>
                </div>
                <div class="col-md-6 mt-2 mb-2">
                  <span>$ {{ products.price }}</span>
                </div>
                <div class="progressbar col-md-12 mt-3 mb-3">
                  <span class="progress"></span>
                </div>
                <div class="col-md-6 category mt-3 mb-3">
                  <span>Category :</span>
                </div>
                <div class="col-md-6 mt-3 mb-3">
                  <span>{{ products.category }}</span>
                </div>
                <div class="col-md-6 mt-3 mb-3">
                  <span>Available:</span>
                </div>
                <div class="col-md-6 mt-3 mb-3">
                  <span>1</span>
                </div>
                <div class="col-md-6 mt-3 mb-3 pt-2">
                  <span>Quantity :</span>
                </div>
                <div class="col-md-6 mt-3 mb-3">
                  <span>
                    <vue-number-input
                      v-model="value"
                      :min="1"
                      @update:model-value="onUpdate"
                      @input="onInput"
                      inline
                      center
                      controls
                    ></vue-number-input>
                  </span>
                </div>
                <div class="col-md-6 mt-3 mb-3">
                  <span>Total:</span>
                </div>
                <div class="col-md-6 mt-3 mb-3">
                  <span>$ {{ totalPrice }}</span>
                </div>
                <div class="col-md-6 pr-2">
                  <button
                    @click="
                      addCart(
                        products,
                        this.onUpdate ? this.newValue : this.inputValue
                      )
                    "
                    class="add-cart-button"
                  >
                    <i class="fas fa-shopping-cart"></i>
                    <span>Add To Cart</span>
                  </button>
                </div>
                <div class="col-md-6 pl-2">
                  <button
                    @click="addFavourite(products)"
                    class="add-wishlist-button"
                  >
                    <i class="far fa-heart"></i>
                    <span>Add To Wishlist</span>
                  </button>
                </div>
                <div class="real-time-random mt-3">
                  <span class="real-time"></span>
                  <span> Visitors right now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="descrip-content mt-5">
          <ul class="tabs">
            <li class="show-data current" data-id="#description">
              <span>Product Description</span>
            </li>
            <li class="show-data" data-id="#reviews"><span>Reviews</span></li>
          </ul>
          <div
            id="description"
            class="content description current no-background"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
              laborum delectus ea repellat quasi, iusto, tempora recusandae
              maiores quas placeat facilis rerum reprehenderit, magni assumenda
              voluptatibus quisquam sit consectetur accusantium! Debitis
              praesentium magnam similique voluptas voluptates reprehenderit
              quis commodi nam.
            </p>
            <h4 class="pt-4 pb-4">Lorem ipsum dolor sit amet.</h4>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem, ipsum dolor.</li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
                illum?
              </li>
            </ul>
            <h4 class="pt-4 pb-4">Paragraph Text</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              aperiam sed fugit facilis reprehenderit eos sint molestiae sunt
              fugiat sequi.
            </p>
          </div>
          <div id="reviews" class="reviews content">
            <div class="d-flex justify-content-md-between write-reviews">
              <h3>Customer Reviews</h3>
              <span data-toggle="#review-toggle" class="icon-review">
                <i class="far fa-edit"></i> Write a review
              </span>
            </div>
            <div id="review-toggle" class="form-review-dropdown pb-4">
              <form @submit.prevent="submitReview">
                <h3 class="pt-4" style="border-top: 1px solid #dfdfdf">
                  Write a review
                </h3>
                <div class="form-group pt-4">
                  <label for="">Name</label>
                  <input
                    type="text"
                    v-model="nameReview"
                    name=""
                    id=""
                    class="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div class="form-group">
                  <label for="">Email</label>
                  <input
                    type="email"
                    v-model="emailReview"
                    name=""
                    class="form-control"
                    placeholder="hppy@gmail.com"
                  />
                </div>
                <div class="form-group">
                  <label for="">Rating</label>
                  <br />
                  <star-rating
                    :star-size="20"
                    inactive-color="gray"
                    @update:rating="setRating"
                    :show-rating="false"
                  ></star-rating>
                </div>
                <div class="form-group">
                  <label for="">Review title</label>
                  <input
                    type="text"
                    v-model="titleReview"
                    name=""
                    id=""
                    class="form-control"
                    placeholder="Title"
                  />
                </div>
                <div class="form-group">
                  <label for="">Your review</label>
                  <textarea
                    class="form-control"
                    v-model="textareaReview"
                    name=""
                    id=""
                    rows="3"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  value="Submit"
                  class="btn-submit-review pt-3 pb-3"
                >
                  Submit Review
                </button>
              </form>
              <div v-if="notifySuccess" class="form-success-noti mt-5 mb-5">
                Thank you for submitting a review!
              </div>
            </div>
            <div v-if="!review.length" class="no-review">
              <p>There is no review at the moment</p>
            </div>
            <div v-for="r in review" :key="r.id" class="default-review">
              <div class="rating pb-3">
                <star-rating
                  :star-size="20"
                  inactive-color="gray"
                  :rating="r.rating"
                  :show-rating="false"
                  :read-only="true"
                ></star-rating>
              </div>
              <p>{{ r.title }}</p>
              <span class="user-inline">
                <strong>{{ r.name }}</strong> On
                <strong>{{ r.month }} {{ r.day }} , {{ r.year }}</strong>
              </span>
              <p class="comment pt-3">
                {{ r.text_review }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <FsLightbox
        :toggler="toggler"
        :sources="[
          `http://localhost:3000/public/image/products/${products.image}`,
        ]"
      />
    </div>
  </div>
</template>
<script>
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

setInterval(function () {
  var number = Math.floor(Math.random() * 30);
  $(".real-time").text(number);
}, 4000);
import StarRating from "vue-star-rating";
import FsLightbox from "fslightbox-vue/v3";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import axios from "axios";
export default {
  name: "Detail-products",
  components: { FsLightbox, StarRating, VueNumberInput },
  data() {
    return {
      products: [],
      cart: [],
      favourites: [],
      review: [],
      toggler: false,
      rating: 0,
      nameReview: null,
      emailReview: null,
      titleReview: null,
      textareaReview: null,
      notifySuccess: false,
      value: 1,
      newValue: null,
      oldValue: null,
      inputValue: null,
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    addCart(product, quantity1) {
      var foundItem = this.cart.find((item) => {
        return item.id == product.id;
      });
      if (foundItem) {
        axios.put(`http://localhost:3000/cart/${foundItem.id}`, {
          quantity: (foundItem.quantity += quantity1),
        });
      } else {
        axios.post("http://localhost:3000/cart", {
          id: product.id,
          name: product.name,
          price: product.price,
          sale_price: product.sale_price,
          image: product.image,
          category_id: product.category_id,
          status: product.status,
          quantity: this.onUpdate ? this.newValue : this.inputValue,
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
        axios.post("http://localhost:3000/favourites", {
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
    setRating(rating) {
      this.rating = rating;
    },
    submitReview() {
      let notification = axios.post("http://localhost:3000/review", {
        name: this.nameReview,
        email: this.emailReview,
        rating: this.rating,
        title: this.titleReview,
        text_review: this.textareaReview,
      });
      if (notification) {
        this.notifySuccess = true;
      }
    },
    onUpdate(newValue, oldValue) {
      this.newValue = newValue;
      this.oldValue = oldValue;
    },
    onInput(value) {
      this.inputValue = value;
    },
  },
  computed: {
    totalPrice() {
      var total = 0;
      if (this.onUpdate) {
        return (total += this.newValue * this.products.price);
      } else {
        return (total += this.inputValue * this.products.price);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      $(document).ready(function () {
        $(".icon-review").click(function () {
          let dataToggle = $(this).data("toggle");
          $(dataToggle).slideToggle();
        });
        $(".show-data").click(function () {
          $(".content").hide();
          let data = $(this).data("id");
          $(data).fadeIn();
          $(".show-data").removeClass("current");
          $(this).addClass("current");
        });
      });
    });
    this.cartApi();
    this.refreshCart();
    this.favouritesApi();
    this.refreshFavourites();
    this.reviewApi();
    this.refreshReview();
    axios
      .get("http://localhost:3000/products")
      .then((response) => (this.products = response.data.myData[this.id - 1]));
  },
};
</script>
<style scoped>
.wrap {
  margin: 40px 0;
}
li {
  display: inline-block;
}
.background {
  padding: 80px 0;
  height: auto;
  color: #eee;
  display: inline-block;
  text-align: center;
  width: 100%;
  margin: 0;
  position: relative;
  z-index: 1;
}
.background::before {
  position: absolute;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0.95;
  background: #fafafa;
  z-index: -1;
}
.background li {
  display: inline-block;
  font-size: 1em;
  padding-right: 2px;
  margin-right: 2px;
  color: #181818;
}
.product-info {
  margin-bottom: 70px;
  margin-top: 70px;
}
ul {
  margin-bottom: 0;
}
h2 {
  font-size: 40px;
  font-weight: bold;
}
.progressbar {
  height: 6px;
}
.progress {
  background-color: #3bab3c;
  height: 10px;
  display: block;
  width: 100%;
}
.add-cart-button,
.add-wishlist-button {
  background: #f8e6e2;
  border: none;
  color: #000000;
  margin-bottom: 10px;
  margin-right: 10px;
  background: #f8e6e2;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 0;
  color: #000;
  display: inline-block;
  font-family: Muli;
  font-weight: 700;
  line-height: 1.15;
  padding: 15px 100px;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  width: 100%;
  font-size: 17px;
  outline: none;
  transition: all 0.4s ease-in-out;
}
.small-images {
  margin-top: 20px;
}
.small-images img {
  width: 117px;
}
img {
  cursor: pointer;
}
.real-time {
  padding: 2px 12px;
  border-radius: 2px;
  background: #e53939;
  color: #ffffff;
}
.col-md-6,
.progressbar {
  padding-left: 0;
}
.tabs li span {
  border: 1px solid #e4e4e4;
  border-top: none;
  border-bottom: none;
  color: #000;
  margin: 0;
  padding: 10px 25px;
  display: inline-block;
  font-size: 18px;
  position: relative;
  z-index: 1;
  cursor: pointer;
}
.tabs li span::before {
  background: #7d597d;
  content: "";
  display: inline-block;
  height: 2px;
  position: absolute;
  top: 0;
  left: -1px;
  right: -1px;
}
.description,
.reviews {
  border: 1px solid rgba(228, 228, 228, 0.5);
  padding: 25px 30px;
  margin: 0;
}
.content {
  display: none;
}
.current {
  background-color: #7d597d;
  display: inline-block;
}
.no-background {
  background-color: #fff;
}
.write-reviews {
  padding-bottom: 20px;
}
.default-review,
.no-review {
  padding-top: 20px;
  border-top: 1px solid #dfdfdf;
}
.form-review-dropdown {
  display: none;
}
.icon-review {
  cursor: pointer;
}
.btn-submit-review {
  margin: 0 0 20px;
  outline: none;
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
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  cursor: pointer;
  font-size: 17px;
  outline: none;
  transition: all 0.4s ease-in-out;
}
.form-success-noti {
  padding: 12px 20px !important;
  outline: none;
  border: 1px solid #b3dba8;
  background-color: #c8eebe;
  border-radius: 50px;
}
</style>