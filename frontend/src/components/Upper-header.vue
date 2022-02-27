<template>
  <div class="upper-header">
    <div
      style="position: relative"
      class="container d-flex justify-content-between"
    >
      <ul class="upper-ul phone-number">
        <li>
          <p class="">Call us: 09999999999999</p>
        </li>
      </ul>
      <ul class="upper-ul account">
        <li>
          <router-link @click="this.scrollToTop()" to="/account">
            <p class="upper-content before-none">
              <i class="icon fas fa-user"></i>My Account
            </p></router-link
          >
        </li>
        <li v-if="this.username">
          <p style="cursor: default" class="upper-content">
            Welcome {{ username }}
          </p>
        </li>
        <li v-if="this.username" class="">
          <p @click.prevent="logOut()" class="upper-content">Logout</p>
        </li>
        <li v-if="!this.username">
          <router-link @click="this.scrollToTop()" to="/login">
            <p class="upper-content">
              <i class="icon fas fa-lock-open"></i>Login
            </p></router-link
          >
        </li>
        <li v-if="!this.username" class="">
          <router-link @click="this.scrollToTop()" to="/register">
            <p class="upper-content">
              <i class="icon fas fa-edit"></i>Register
            </p></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Upper-header",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    getUser() {
      var token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/accounts/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.myData) {
            this.username = response.data.myData.username;
          }
        });
    },
    refreshUser() {
      setInterval(() => {
        this.getUser();
      }, 100);
    },
    logOut() {
      localStorage.removeItem("token");
      this.username = null;
      this.$router.push("/");
    },
  },
  mounted() {
    this.getUser();
    this.refreshUser();
  },
};
</script>
<style scoped>
li {
  display: inline-block;
  cursor: pointer;
}
li p:hover {
  color: #b8860b;
  transition: 0.3s;
}
a:hover {
  text-decoration: none;
}
li p,
a {
  color: #444444;
  font-size: 14px;
  font-weight: 500;
}
li .icon {
  margin-right: 5px;
}
.upper-header {
  background-color: #eee;
}
.upper-header .upper-ul {
  padding: 10px 0;
  color: #dedede;
}
.upper-header ul li p {
  font-size: 12px;
  font-weight: 100;
}
.upper-header ul li .upper-content::before {
  content: "|"; 
  display: inline-block;
  margin: 0 20px;
}
.before-none::before {
  content: none !important;
}
@media screen and (min-width: 300px) and (max-width: 580px) {
  .phone-number {
    display: none;
  }
  .account {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
