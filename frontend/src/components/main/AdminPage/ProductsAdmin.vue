<template>
  <div class="item">
    <div class="container">
      <h2 class="text-center mb-5">Manage Products</h2>
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
      <table class="table">
        <thead>
          <tr class="text-center">
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
          <tr class="text-center" v-for="pro in products" :key="pro.id">
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
      <div v-if="this.products" class="row">
        <div class="col-md-12">
          <VueTailwindPagination
            :current="currentPage"
            :total="total"
            :per-page="perPage"
            @page-changed="pageChange($event)"
          />
        </div>
        <div
          class="modal fade"
          id="modelId"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Edit product</h5>
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
                <form @submit.prevent="editModalData()" action="">
                  <div class="form-group">
                    <label for="">ID</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      :placeholder="this.modalData.id"
                      class="form-control"
                      v-model="id"
                      readonly
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Name</label>
                    <input
                      type="text"
                      name="name"
                      id=""
                      :placeholder="this.modalData.name"
                      class="form-control"
                      v-model="name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Price</label>
                    <input
                      type="text"
                      name="price"
                      id=""
                      :placeholder="this.modalData.price"
                      class="form-control"
                      v-model="price"
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Sale price</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      :placeholder="this.modalData.sale_price"
                      class="form-control"
                      v-model="sale_price"
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Image</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      :placeholder="this.modalData.image"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Status</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      :placeholder="this.modalData.status"
                      class="form-control"
                      v-model="status"
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Description</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      :placeholder="this.modalData.description"
                      class="form-control"
                      v-model="description"
                    />
                  </div>
                  <div class="form-group">
                    <label for="">Quantity</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      :placeholder="this.modalData.quantity"
                      class="form-control"
                      v-model="quantity"
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VueTailwindPagination from "@ocrv/vue-tailwind-pagination";

const moment = require("moment");
export default {
  name: "ProductsAdmin",
  components: { VueTailwindPagination },
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
    async getData() {
      var response = await axios.get(
        `http://localhost:3000/products/admin/pages=${this.currentPage}`
      );
      var responseData = response.data;
      this.currentPage = responseData.page;
      this.perPage = responseData.per_page;
      this.total = responseData.total;
      this.products = response.data.myData;
    },
    pageChange(event) {
      this.currentPage = event;
      this.getData();
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
    this.currentPage = 1;
    this.getData();
    var token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/accounts/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.role = response.data.myData.user[0].role;
        this.username = response.data.myData.user[0].username;
        this.created_at = response.data.myData.user[0].created_at;
        this.last_login = response.data.myData.user[0].last_login;
        axios
          .get("http://localhost:3000/products/admin", {
            params: {
              role: this.role,
            },
          })
          .then((response) => (this.products = response.data.myData));
      });
    axios
      .get("http://localhost:3000/categories")
      .then((response) => (this.categories = response.data.myData));
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