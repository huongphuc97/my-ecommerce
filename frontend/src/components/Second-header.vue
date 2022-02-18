<template>
  <div class="container">
    <div class="second-header">
      <div class="search-box d-flex">
        <div class="input-products">
          <input
            type="text"
            class="form-control"
            placeholder="Input products"
          />
        </div>
        <div class="input-categories">
          <select name="" id="">
            <option value="">
              All categories <i class="fas fa-caret-down"></i>
            </option>
            <option
              v-for="cate in categories"
              :key="cate.id"
              value="{{cate.name}}"
            >
              {{ cate.name }}
            </option>
          </select>
        </div>
        <div class="search-function">
          <button class="btn-search">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Second-header",
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => (this.categories = response.data.myData));
  },
};
</script>
<style scoped>
.second-header {
  margin: 80px 0 10px 0;
}
.search-box {
  justify-content: center;
}
.second-header .search-box .form-control {
  padding: 10px 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: unset;
}
.second-header .search-box .form-control:focus {
  border-color: #000;
  box-shadow: none;
}
.input-products {
  flex: 0 0 60%;
  max-width: 60%;
}
.input-categories select {
  padding: 10px 20px;
  border: 1px solid #ced4da;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 46px;
}
.btn-search {
  padding: 10px 20px;
  border: 1px solid #ced4da;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #0063d1;
  color: #fff;
}
.number {
  border-radius: 50%;
  background-color: #eee;
  padding: 5px;
  position: relative;
  left: -4px;
  top: 8px;
}
.upper-content .icon {
  padding-right: 5px;
  font-size: 15px;
}
</style>