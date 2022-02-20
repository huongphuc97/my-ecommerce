<template>
  <div class="item">
    <h1 class="text-center">Manage users</h1>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Created</th>
            <th>Last login</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="acc in accounts" :key="acc.id">
            <td>{{ acc.id }}</td>
            <td>{{ acc.username }}</td>
            <td>{{ acc.role }}</td>
            <td>{{ moment(acc.created_at, moment.ISO_8601) }}</td>
            <td>{{ moment(acc.last_login, moment.ISO_8601) }}</td>
          </tr>
        </tbody>
      </table>
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
    };
  },
  mounted() {
    this.accountsApi();
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