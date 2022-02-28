<template>
  <div class="item">
    <h1 class="text-center">Manage categories</h1>
    <div v-if="this.role == 'admin'" class="container">
      <table v-if="this.role == 'admin'" class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cate in categories" :key="cate.id">
            <td>{{ cate.id }}</td>
            <td>{{ cate.name }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#modelId"
      >
        Create
      </button>

      <!-- Modal -->
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
              <h5 class="modal-title">Modal title</h5>
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
              <form @submit.prevent="addCate()" action="">
                <div class="form-group">
                  <label for="">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="name"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-info">
      <p class="text-center">You do not have permission</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CategoriesAdmin",
  data() {
    return {
      categories: [],
      modalData: [],
      name: null,
      role: null,
    };
  },
  methods: {
    addCate() {
      var notiSuccess = axios.post(
        "https://get-api-ecommerce-pj.herokuapp.com/categories",
        {
          name: this.name,
        },
        {
          params: {
            role: this.role,
          },
        }
      );
      if (notiSuccess) {
        alert(`Created ${this.name}`);
      }
    },
  },
  mounted() {
    var token = localStorage.getItem("token");
    axios
      .get("https://get-api-ecommerce-pj.herokuapp.com/accounts/get", {
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
          .get("https://get-api-ecommerce-pj.herokuapp.com/categories", {
            params: {
              role: this.role,
            },
          })
          .then((response) => (this.categories = response.data.myData));
      });
  },
};
</script>
<style scoped>
.item {
  margin-top: 100px;
  margin-bottom: 350px;
}
</style>