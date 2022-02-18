<template>
  <div class="test">
    <form @submit.prevent="loginForm">
      <label for="">Username</label>
      <input
        type="text"
        name="username"
        id=""
        class="form-control"
        placeholder=""
        aria-describedby="helpId"
        v-model="username"
      />
      <br />

      <label for="">Password</label>
      <input
        type="text"
        name="password"
        id=""
        class="form-control"
        placeholder=""
        aria-describedby="helpId"
        v-model="password"
      />
      <br />
      <button @click="this.scrollToTop()" type="submit">Login</button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    loginForm() {
      axios
        .post("http://localhost:3000/accounts/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => localStorage.setItem("token", response.data.token));
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
.test {
  margin-top: 100px;
}
</style>