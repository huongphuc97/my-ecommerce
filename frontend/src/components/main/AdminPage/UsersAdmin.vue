<template>
  <div class="item">
    <h1 class="text-center">Manage users</h1>
    <div class="container">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#modelId2"
      >
        Create
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="modelId2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add User</h5>
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
              <form action="" @submit.prevent="createUser()">
                <div class="form-group">
                  <label for="">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="usernameNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Password</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="passwordNew"
                  />
                </div>
                <div class="form-group">
                  <label for="">Role</label>
                  <input type="text" class="form-control" v-model="roleNew" />
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <table v-if="this.accounts" class="table">
        <thead>
          <tr class="text-center">
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Created</th>
            <th>Last login</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="acc in accounts" :key="acc.id">
            <td>{{ acc.id }}</td>
            <td>{{ acc.username }}</td>
            <td>{{ acc.role }}</td>
            <td>{{ moment(acc.created_at, moment.ISO_8601) }}</td>
            <td>{{ moment(acc.last_login, moment.ISO_8601) }}</td>
            <td>
              <button
                v-if="acc.role != 'admin'"
                @click="editUser(acc)"
                class="btn btn-primary mr-3"
                data-toggle="modal"
                data-target="#modelId"
              >
                Edit
              </button>
              <button
                v-if="acc.role != 'admin'"
                @click="deleteUser(acc)"
                class="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="pt-5 pb-5 no-info">
        <p class="text-center">You do not have permission</p>
      </div>
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
                  :placeholder="this.modalData.id"
                  class="form-control"
                  v-model="idModal"
                  readonly
                />
              </div>
              <div class="form-group">
                <label for="">Username</label>
                <input
                  type="text"
                  :placeholder="this.modalData.username"
                  class="form-control"
                  v-model="usernameModal"
                />
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <input
                  type="password"
                  :placeholder="this.modalData.password"
                  class="form-control"
                  v-model="passwordModal"
                />
              </div>
              <div class="form-group">
                <label for="">Role</label>
                <input
                  type="text"
                  :placeholder="this.modalData.role"
                  class="form-control"
                  v-model="roleModal"
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
</template>
<script>
import axios from "axios";
const moment = require("moment");
export default {
  name: "UsersAdmin",
  data() {
    return {
      accounts: [],
      moment: moment,
      modalData: [],
      idModal: null,
      usernameModal: null,
      passwordModal: null,
      roleModal: null,
      usernameNew: null,
      passwordNew: null,
      roleNew: null,
    };
  },
  methods: {
    createUser() {
      axios.post(
        "http://localhost:3000/accounts/create",
        {
          username: this.usernameNew,
          password: this.passwordNew,
          role: this.roleNew,
        },
        { params: { role: this.role } }
      );
    },
    editUser(accounts) {
      this.modalData = accounts;
    },
    deleteUser(accounts) {
      axios.delete(`http://localhost:3000/accounts/${accounts.id}`, {
        params: {
          role: this.role,
        },
      });
      this.refreshUser();
    },
    editModalData() {
      axios.put(
        `http://localhost:3000/accounts/${this.modalData.id}`,
        {
          username: this.usernameModal
            ? this.usernameModal
            : this.modalData.username,
          password: this.passwordModal
            ? this.passwordModal
            : this.modalData.password,
          role: this.roleModal ? this.roleModal : this.modalData.role,
        },
        {
          params: {
            role: this.role,
          },
        }
      );
      this.refreshUser();
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
          .get("http://localhost:3000/accounts/admin", {
            params: {
              role: this.role,
            },
          })
          .then((response) => (this.accounts = response.data.myData));
      });
  },
};
</script>
<style scoped>
.item {
  margin-top: 100px;
}
</style>
