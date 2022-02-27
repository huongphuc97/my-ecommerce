<template>
  <div class="item">
    <div class="container">
      <div v-if="this.role">
        <div class="row">
          <div class="col-md-6">
            <div class="jumbotron">
              <p class="lead">Your orders</p>
              <hr class="my-2" />
              <table class="table">
                <thead>
                  <tr>
                    <th>Order code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="ord in orders" :key="ord.id">
                    <td scope="row">{{ ord.order_code }}</td>
                    <td>
                      <button style="color:#fff;" class="btn btn-primary">
                        <router-link
                          @click="this.scrollToTop()"
                          :to="`/order/${ord.order_code}`"
                        >
                          View details
                        </router-link>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
           <div class="col-md-6">
            <div class="jumbotron">
              <p class="lead">Welcome back {{ this.username }}</p>
              <hr class="my-2" />
              <p>Your role is {{ this.role }}</p>
              <p>Created at {{ moment(this.created_at, moment.ISO_8601) }}</p>
              <p>Last login {{ moment(this.last_login, moment.ISO_8601) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center" v-if="this.role == 'admin'">
        <button class="admin-panel">
          <router-link @click="scrollToTop()" to="/admin"
            >Go to admin panel</router-link
          >
        </button>
      </div>
      <div class="login-warning" v-if="this.role === null">
        <div class="d-flex justify-center">
          <p class="pr-2">You are not logging in</p>
          <router-link @click="scrollToTop()" to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const moment = require("moment");
export default {
  name: "Account",
  data() {
    return {
      role: null,
      username: null,
      created_at: null,
      data: [],
      moment: moment,
      idUser: null,
      orders: [],
      order_name: null,
    };
  },
  mounted() {
    var token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/accounts/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.myData) {
          this.idUser = response.data.myData.id;
          this.role = response.data.myData.role;
          this.username = response.data.myData.username;
          this.created_at = response.data.myData.created_at;
          this.last_login = response.data.myData.last_login;
        }
        axios
          .get("http://localhost:3000/accounts/admin", {
            params: {
              role: this.role,
            },
          })
          .then((response) => (this.data = response.data.myData));
        axios
          .get(`http://localhost:3000/orders/${this.idUser}`)
          .then((response) => (this.orders = response.data.myData));
      });
  },
};
</script>
<style scoped>
.item {
  margin-top: 100px;
  margin-bottom: 30px;
}
.admin-panel {
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
  transition: all 0.4s ease-in-ou;
}
.login-warning {
  margin-top: 180px;
  margin-bottom: 100px;
}
.btn-primary{
  background-color: #fff !important;
}
</style>
