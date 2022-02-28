<template>
  <div>
    <nav class="background">
      <div class="container">
        <h1>Your Wishlist</h1>
        <ul style="margin-top: 20px">
          <li>
            <router-link @click="this.scrollToTop()" to="/">Home</router-link>
          </li>
          <li>/</li>
          <li>Wishlist</li>
        </ul>
      </div>
    </nav>
    <div class="main-content">
      <div class="container">
        <div v-if="!favourites.length" class="cart-empty">
          <img src="../../assets/empty-cart.png" alt="" />
          <h5>No Items In Wishlist</h5>
          <p>Add Items Now</p>
          <p>
            <button class="btn-start">Start Shopping</button>
          </p>
        </div>
        <div v-else class="cart-has-items">
          <div class="row">
            <div class="col-md-12">
              <div class="table-border border-bottom">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Add To Cart</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="f in favourites" :key="f.id">
                      <td scope="row">
                        <img
                          :src="`https://get-api-ecommerce-pj.herokuapp.com/public/image/products/${f.image}`"
                          alt=""
                        />
                      </td>
                      <td>{{ f.name }}</td>
                      <td>{{ f.price }}</td>
                      <td>{{ f.quantity }}</td>
                      <td>$ {{ totalPrice }}</td>
                      <td>
                        <button class="add-favourite" @click="addCart(f)">
                          Add To Cart
                        </button>
                      </td>
                      <td>
                        <button @click="deleteItemFavourite(f)">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Favourite",
  data() {
    return {
      favourites: [],
      cart: [],
    };
  },
  methods: {
    deleteItemFavourite(item) {
      axios.delete(`https://get-api-ecommerce-pj.herokuapp.com/favourites/${item.id}`);
    },
    addCart(product) {
      var foundItem = this.cart.find((item) => {
        return item.id == product.id;
      });
      if (foundItem) {
        alert("Item already exists in cart");
      } else {
        axios.post("https://get-api-ecommerce-pj.herokuapp.com/cart", {
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
  computed: {
    totalPrice() {
      let total = 0;
      this.favourites.map(function (item) {
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
div {
  margin-top: 40px;
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
.main-content {
  overflow-x: hidden;
  min-height: 400px;
  margin-bottom: 90px;
}
.cart-empty {
  padding: 50px 0;
  text-align: center;
}
.btn-start {
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
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
}
.table-border {
  border: 1px solid #ededed;
  text-align: center;
}
.border-bottom {
  border-bottom: 0 !important;
}
.table-border thead {
  background-color: #f79837;
  color: #fff;
}
.table-border img {
  width: 92px;
  height: 92px;
  padding-top: 12px;
}
.table-border tr th,
tr td {
  border: 1px solid #eee;
  vertical-align: middle;
}
.add-favourite {
  margin: 8px 0;
  padding: 8px 20px;
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
</style>