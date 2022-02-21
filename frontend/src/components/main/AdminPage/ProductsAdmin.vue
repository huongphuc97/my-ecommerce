<template>
  <div class="item">
    <div class="container">
      <h1 class="text-center mb-5">Manage Products</h1>
      <!-- Button trigger modal -->
      <!-- <button
        type="button"
        class="d-flex btn btn-primary btn-md mb-5"
        data-toggle="modal"
        data-target="#modelId1"
      >
        Create
      </button> -->

      <!-- Modal -->
      <!-- <div
        class="modal fade"
        id="modelId1"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New product</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createProduct()" action="">
                <div class="form-group">
                  <label for="">ID</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="idNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Name</label>
                  <input
                    type="text"
                    name="name"
                    id=""
                    class="form-control"
                    v-model="nameNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Price</label>
                  <input
                    type="text"
                    name="price"
                    id=""
                    class="form-control"
                    v-model="priceNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Sale price</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="sale_priceNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Image</label>
                  <input type="file" name="image" id="" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="">Status</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="statusNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Description</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="descriptionNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Quantity</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="quantityNew"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div> -->
      <table v-if="this.role == 'admin'" class="text-center table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Sale price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Status</th>
            <th>Description</th>
            <th>Created</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pro in products" :key="pro.id">
            <td scope="row">{{ pro.id }}</td>
            <td>{{ pro.name }}</td>
            <td>{{ pro.price }}</td>
            <td>{{ pro.sale_price }}</td>
            <td>
              <img
                class="card-img-top"
                :src="`http://localhost:3000/public/image/products/${pro.image}`"
                alt=""
              />
            </td>
            <td>{{ pro.category }}</td>
            <td>{{ pro.status }}</td>
            <td>{{ pro.description }}</td>
            <td>{{ moment(pro.created_at, moment.ISO_8601) }}</td>
            <td>{{ pro.quantity }}</td>
            <td>
              <button
                @click="editProduct(pro)"
                class="btn btn-primary mr-3"
                data-toggle="modal"
                data-target="#modelId"
              >
                Edit
              </button>
              <button @click="deleteProduct(pro)" class="btn btn-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="no-info">
        <p class="text-center">You do not have permission</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const moment = require("moment");
export default {
  name: "ProductsAdmin",
  data() {
    return {
      products: [],
      currentPage: null,
      total: null,
      perPage: null,
      moment: moment,
      modalData: [],
      id: null,
      name: null,
      price: null,
      sale_price: null,
      status: null,
      description: null,
      quantity: null,
      categories: [],
      role: null,
    };
  },
  methods: {
    editProduct(product) {
      this.modalData = product;
    },
    deleteProduct(product) {
      axios.delete(`http://localhost:3000/products/${product.id}`);
      this.refreshProductsApi();
    },
    editModalData() {
      var notify = axios.put(
        `http://localhost:3000/products/${this.modalData.id}`,
        {
          name: this.name ? this.name : this.modalData.name,
          price: this.price ? this.price : this.modalData.price,
          sale_price: this.sale_price
            ? this.sale_price
            : this.modalData.sale_price,
          status: this.status ? this.status : this.modalData.status,
          description: this.description
            ? this.description
            : this.modalData.description,
          quantity: this.quantity ? this.quantity : this.modalData.quantity,
        }
      );
      if (notify) {
        alert("Product edited");
        this.refreshProductsApi();
      }
    },
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
          this.role = response.data.myData.role;
          this.username = response.data.myData.username;
          this.created_at = response.data.myData.created_at;
          this.last_login = response.data.myData.last_login;
        }
        axios
          .get("http://localhost:3000/products/admin", {
            params: {
              role: this.role,
            },
          })
          .then((response) => (this.products = response.data.myData));
      });
  },
};
</script>
<style scoped>
.item {
  margin-top: 100px;
}
img {
  width: 100%;
  height: 50px;
}
</style>