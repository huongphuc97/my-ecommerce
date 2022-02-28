<template>
  <div class="item">
    <div class="container">
      <h1 class="text-center mb-5">Manage Products</h1>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="d-flex btn btn-primary btn-md mb-5"
        data-toggle="modal"
        data-target="#modelId1"
      >
        Create
      </button>

      <!-- Modal -->
      <div
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
                  <input type="text" class="form-control" v-model="idNew" />
                </div>
                <div class="form-group">
                  <label for="">Name</label>
                  <input type="text" class="form-control" v-model="nameNew" />
                </div>
                <div class="form-group">
                  <label for="">Price</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="priceNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Sale price</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="sale_priceNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Image</label>
                  <input
                    type="file"
                    id=""
                    class="form-control"
                    @change="onFileChange"
                  />
                </div>
                <div class="form-group">
                  <label for="">Status</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="category_idNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Status</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="statusNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Description</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="descriptionNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Quantity</label>
                  <input
                    type="number"
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
      </div>
      <table v-if="this.role == 'admin'" class="table">
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
                :src="`https://api-ecm.herokuapp.com/categories/public/image/products/${pro.image}`"
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
                          <label for="">Name</label>
                          <input
                            type="text"
                            class="form-control"
                            :placeholder="this.modalData.name"
                            v-model="name"
                          />
                        </div>
                        <div class="form-group">
                          <label for="">Price</label>
                          <input
                            type="number"
                            class="form-control"
                            :placeholder="this.modalData.price"
                            v-model="price"
                          />
                        </div>
                        <div class="form-group">
                          <label for="">Sale price</label>
                          <input
                            type="number"
                            class="form-control"
                            :placeholder="this.modalData.sale_price"
                            v-model="sale_price"
                          />
                        </div>
                        <div class="form-group">
                          <label for="">Image</label>
                          <input
                            type="file"
                            id=""
                            class="form-control"
                            @change="fileEdit"
                          />
                        </div>
                        <div class="form-group">
                          <label for="">Status</label>
                          <input
                            type="number"
                            class="form-control"
                            :placeholder="this.modalData.status"
                            v-model="status"
                          />
                        </div>
                        <div class="form-group">
                          <label for="">Description</label>
                          <input
                            type="text"
                            class="form-control"
                            :placeholder="this.modalData.description"
                            v-model="description"
                          />
                        </div>
                        <div class="form-group">
                          <label for="">Quantity</label>
                          <input
                            type="number"
                            class="form-control"
                            :placeholder="this.modalData.quantity"
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
                        <button type="submit" class="btn btn-primary">
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
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
      idNew: null,
      nameNew: null,
      priceNew: null,
      sale_priceNew: null,
      category_idNew: null,
      statusNew: null,
      descriptionNew: null,
      quantityNew: null,
      selectedFile: null,
      fileForEdit: null,
    };
  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
    },
    createProduct() {
      const fd = new FormData();
      fd.append("id", this.idNew);
      fd.append("name", this.nameNew);
      fd.append("price", this.priceNew);
      fd.append("sale_price", this.sale_priceNew);
      fd.append("image", this.selectedFile);
      fd.append("status", this.statusNew);
      fd.append("category_id", this.category_idNew);
      fd.append("description", this.descriptionNew);
      fd.append("quantity", this.quantityNew);
      axios.post("https://api-ecm.herokuapp.com/categories/products", fd, {
        params: { role: this.role },
      });
    },
    editProduct(product) {
      this.modalData = product;
    },
    deleteProduct(product) {
      axios.delete(`https://api-ecm.herokuapp.com/categories/products/${product.id}`);
      this.refreshProductsApi();
    },
    fileEdit(e) {
      this.fileForEdit = e.target.files[0];
    },
    editModalData() {
      const f = new FormData();
      f.append("name", this.name ? this.name : this.modalData.name);
      f.append("price", this.price ? this.price : this.modalData.price);
      f.append(
        "sale_price",
        this.sale_price ? this.sale_price : this.modalData.sale_price
      );
      f.append("image", this.fileForEdit);
      f.append("status", this.status ? this.status : this.modalData.status);
      f.append(
        "category_id",
        this.category_id ? this.category_id : this.modalData.category_id
      );
      f.append(
        "description",
        this.description ? this.description : this.modalData.description
      );
      f.append(
        "quantity",
        this.quantity ? this.quantity : this.modalData.quantity
      );
      axios.put(`https://api-ecm.herokuapp.com/categories/products/${this.modalData.id}`, f, {
        params: { role: this.role },
      });
      this.refreshProductsApi();
    },
  },
  mounted() {
    var token = localStorage.getItem("token");
    axios
      .get("https://api-ecm.herokuapp.com/categories/accounts/get", {
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
          .get("https://api-ecm.herokuapp.com/categories/products/admin", {
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
