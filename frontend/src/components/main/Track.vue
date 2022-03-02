<template>
  <div class="item">
    <div class="main-search-input-wrap">
      <div class="main-search-input fl-wrap">
        <form @submit.prevent="getOrder()">
          <div class="main-search-input-item">
            <input type="text" placeholder="Order code" v-model="orderCode" />
          </div>
          <button type="submit" class="main-search-button">Search</button>
        </form>
      </div>
    </div>
    <div v-if="orders.length >= 1" class="has-order">
      <div class="container center">
        <div class="row">
          <div class="col-md-6">
            <p>Found {{ orders.length }} result</p>
          </div>
          <div class="col-md-6">
            <button class="btn btn-primary">
              <router-link
                @click="this.scrollToTop()"
                :to="`/order/${this.orderCode}`"
              >
                View details
              </router-link>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Track",
  data() {
    return {
      orderCode: null,
      orders: [],
    };
  },
  methods: {
    getOrder() {
      axios
        .get(`https://my-api-for-frontend.herokuapp.com/orders/get/${this.orderCode}`)
        .then((response) => (this.orders = response.data.myData));
    },
  },
};
</script>
<style scoped>
.item {
  margin-top: 150px;
  margin-bottom: 150px;
}
.main-search-input {
  background: #fff;
  padding: 0 120px 0 0;
  border-radius: 1px;
}
.main-search-input-item {
  border: 1px solid gray;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 5px;
}
.main-search-input-item input {
  height: 50px;
  padding-left: 20px;
}

.main-search-button {
  background: #4db7fe;
}
.main-search-button {
  position: absolute;
  right: 0px;
  height: 50px;
  width: 120px;
  color: #fff;
  top: 0;
  border: none;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  cursor: pointer;
}

.main-search-input-wrap {
  max-width: 500px;
  margin: 20px auto;
  position: relative;
}
:focus {
  outline: 0;
}
.center {
  margin-left: auto !important;
  margin-right: auto !important;
  width: 520px;
}
.btn-primary {
  background-color: #fff !important;
}
</style>
