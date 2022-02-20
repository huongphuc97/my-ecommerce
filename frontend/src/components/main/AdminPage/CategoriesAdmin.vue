<template>
  <div class="item">
    <h1 class="text-center">Manage categories</h1>
    <div class="container">
      <table class="table">
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
        class="btn btn-primary btn-lg"
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
                    name=""
                    id=""
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
    };
  },
  methods: {
    addCate() {
      var notiSuccess = axios.post("http://localhost:3000/categories", {
        name: this.name,
      });
      if (notiSuccess) {
        alert(`Created ${this.name}`);
      }
    },
  },
  mounted() {
    setInterval(() => {
      axios
        .get("http://localhost:3000/categories")
        .then((response) => (this.categories = response.data.myData));
    }, 100);
  },
};
</script>
<style scoped>
.item {
  margin-top: 100px;
  margin-bottom: 350px;
}
</style>