<template>
  <div>
    <nav class="background">
      <div class="container">
        <h1>Your Shopping Cart</h1>
        <ul style="margin-top: 20px">
          <li>
            <router-link @click="this.scrollToTop()" to="/">Home</router-link>
          </li>
          <li>/</li>
          <li>Shopping Cart</li>
        </ul>
      </div>
    </nav>
    <div class="main-content">
      <div class="container">
        <div v-if="!cart.length" class="cart-empty">
          <img src="../../assets/empty-cart.png" alt="" />
          <h5>No Items In Cart</h5>
          <p>Add Items Now</p>
          <p>
            <router-link @click="this.scrollToTop()" to="/">
              <button class="btn-start">Start Shopping</button>
            </router-link>
          </p>
        </div>
        <div v-else class="cart-has-items mb-5">
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
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="c in cart" :key="c.id">
                      <td scope="row">
                        <img
                          :src="`https://api-ecm.herokuapp.com/public/image/products/${c.image}`"
                          alt=""
                        />
                      </td>
                      <td>{{ c.name }}</td>
                      <td>{{ c.price }}</td>
                      <td>{{ c.quantity }}</td>
                      <td>$ {{ c.price * c.quantity }}</td>
                      <td>
                        <button @click="deleteItemCart(c)">
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="this.idUser" class="text-center mb-5">
            <button @click="makeOrder()" class="btn btn-success">
              Make order
            </button>
          </div>
          <div v-else-if="!this.idUser" class="text-center mb-5">
            <router-link @click="scrollToTop()" class="nav-link" to="/login">
              Please login to make order</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Cart",
  data() {
    return {
      cart: [],
      idUser: null,
    };
  },
  methods: {
    deleteItemCart(item) {
      axios.delete(`https://api-ecm.herokuapp.com/cart/${item.id}`);
    },
    makeOrder() {
      this.cart.map((item) => {
        var noti = axios.post("https://api-ecm.herokuapp.com/orders", {
          user_id: this.idUser,
          order_details_name: item.name,
          order_details_price: item.price,
          order_details_quantity: item.quantity,
        });
        if (noti) {
          axios.delete("https://api-ecm.herokuapp.com/cart");
          this.$router.push("/account");
        }
      });
    },
    getUser() {
      var token = localStorage.getItem("token");
      axios
        .get("https://api-ecm.herokuapp.com/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.myData) {
            this.idUser = response.data.myData.id;
          }
        });
    },
  },
  mounted() {
    this.cartApi();
    this.getUser();
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
</style>
