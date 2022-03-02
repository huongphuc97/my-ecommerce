<template>
  <div>
    <div class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="footer-left">
              <router-link to="/">
                <img
                  src="https://andshop-vue.netlify.app/_nuxt/img/logo.f486653.png"
                  alt=""
                />
              </router-link>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
                quod?
              </p>
              <div class="footer-icons">
                <ul>
                  <li>
                    <a href=""><i class="fab fa-facebook"></i></a>
                  </li>
                  <li>
                    <a href=""><i class="fab fa-twitter"></i></a>
                  </li>
                  <li>
                    <a href=""><i class="fab fa-instagram"></i></a>
                  </li>
                  <li>
                    <a href=""><i class="fab fa-google"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="footer-title">
              <h3>Information</h3>
            </div>
            <ul>
              <li>
                <router-link class="link" to="/">Home</router-link>
              </li>
              <li>
                <router-link class="link" to="/cart">About Us</router-link>
              </li>
              <li>
                <router-link class="link" to="/cart"
                  >Privacy Policy</router-link
                >
              </li>
            </ul>
          </div>
          <div class="col-md-2">
            <div class="footer-title">
              <h3>Your Account</h3>
            </div>
            <ul>
              <li>
                <router-link class="link" to="/">Home</router-link>
              </li>
              <li>
                <router-link class="link" to="/cart">About Us</router-link>
              </li>
              <li>
                <router-link class="link" to="/cart"
                  >Privacy Policy</router-link
                >
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <div class="footer-title">
              <h3>Subscribe</h3>
              <div class="form-subscribe">
                <form @submit.prevent="subscribe()">
                  <input
                    type="email"
                    placeholder="email"
                    class="form-control"
                    v-model="email"
                  />
                  <button type="submit">Subscribe</button>
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
export default {
  name: "Footer",
  data() {
    return {
      email: null,
    };
  },
  methods: {
    subscribe() {
      alert(`Thank ${this.email} for subscribing us`);
    },
  },
};
</script>
<style scoped>
.footer {
  background-color: #f6f6f6;
  padding: 70px 0;
}
.footer-icons ul li {
  display: inline-block;
}
.footer-icons ul li a {
  padding-right: 20px;
  color: #000;
}
h3 {
  font-size: 18px;
  text-transform: uppercase;
}
.footer-title ul {
  padding-top: 15px;
}
.col-md-3 li,
.col-md-2 li {
  padding-top: 15px;
}
.col-md-3 .link,
.col-md-2 .link {
  color: #0a0d14;
}
.form-subscribe {
  padding-top: 20px;
}
.form-subscribe button {
  margin-top: 20px;
  background-color: #000;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: inline-block;
  border-radius: 0;
  border: none;
  padding: 15px 20px;
}
</style>
