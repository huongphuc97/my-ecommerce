<template>
  <div class="test">
    <div class="con">
      <div class="screen">
        <div class="screen__content">
          <form class="register" @submit.prevent="registerForm()">
            <div class="register__field">
              <i class="register__icon fas fa-user"></i>
              <input
                type="text"
                class="register__input"
                placeholder="Username"
                v-model="username"
              />
            </div>
            <div class="register__field">
              <i class="register__icon fas fa-lock"></i>
              <input
                type="password"
                class="register__input"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="register__field">
              <i class="register__icon fas fa-lock"></i>
              <input
                type="password"
                class="register__input"
                placeholder="Re password"
                v-model="rePassword"
              />
              <br />
              <small id="err">Re-password is not matched</small>
            </div>
            <button type="submit" class="button register__submit">
              <span class="button__text">Sign up</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div class="screen__background">
          <span
            class="screen__background__shape screen__background__shape4"
          ></span>
          <span
            class="screen__background__shape screen__background__shape3"
          ></span>
          <span
            class="screen__background__shape screen__background__shape2"
          ></span>
          <span
            class="screen__background__shape screen__background__shape1"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      rePassword: "",
    };
  },
  methods: {
    registerForm() {
      var err = document.getElementById("err");
      if (this.rePassword == "" || this.rePassword != this.password) {
        err.style.display = "inline-block";
        return false;
      } else {
        err.style.display = "none";
        axios.post("https://api-for-ecm-app.herokuapp.com/accounts/create", {
          username: this.username,
          password: this.password,
          role: "guest",
        });
      }
      alert('Sign up succcessfully')
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
#err {
  display: none;
  color: red;
  margin-top: 5px;
}
.test {
  margin-top: 200px;
  margin-bottom: 100px;
}
.con {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.screen {
  background: linear-gradient(90deg, #5d54a4, #7c78b8);
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px #5c5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #fff;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6c63ac;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5d54a4, #6a679e);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7e7bb9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.register {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.register__field {
  padding: 20px 0px;
  position: relative;
}

.register__icon {
  position: absolute;
  top: 30px;
  color: #7875b5;
}

.register__input {
  border: none;
  border-bottom: 2px solid #d1d1d4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: 0.2s;
}

.register__input:active,
.register__input:focus,
.register__input:hover {
  outline: none;
  border-bottom-color: #6a679e;
}

.register__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #d4d3e8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4c489d;
  box-shadow: 0px 2px 2px #5c5696;
  cursor: pointer;
  transition: 0.2s;
}

.register__submit:active,
.register__submit:focus,
.register__submit:hover {
  border-color: #6a679e;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875b5;
}
</style>
