<template>
  <div class="item">
    <div class="container">
      <h2 class="text-center">Admin Management Dashboard</h2>
      <div class="admin-menu">
        <ul class="d-flex justify-center">
          <li>
            <p class="has-dropdown">Manage products</p>
            <ul class="child-dropdown">
              <li>
                <router-link
                  @click="scrollToTop()"
                  class="nav-link"
                  to="/productsadmin"
                  >Products list</router-link
                >
              </li>
              <li>
                <router-link
                  @click="scrollToTop()"
                  class="nav-link"
                  to="/categoriesadmin"
                  >Categories list</router-link
                >
              </li>
            </ul>
          </li>
          <li>
            <p class="has-dropdown">Manage users</p>
            <ul class="child-dropdown">
              <li>
                <router-link
                  @click="scrollToTop()"
                  class="nav-link"
                  to="/usersadmin"
                  >Users list</router-link
                >
              </li>
              <li>
                <p>s</p>
              </li>
            </ul>
          </li>
          <li>
            <p>Manage comments</p>
            <ul class="child-dropdown">
              <li>
                <p>Product lists</p>
              </li>
              <li>
                <p>Product Categories</p>
              </li>
              <li>
                <p>Add product</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Admin",
};
</script>
<style scoped>
.item {
  margin-top: 100px;
  margin-bottom: 250px;
}
.admin-menu li {
  display: inline-block;
  position: relative;
}
.admin-menu li p {
  padding: 15px 20px;
}
.child-dropdown {
  width: 216px;
  display: none;
  padding-left: 10px;
  position: absolute;
  opacity: 1;
  position: absolute;
  padding: 15px;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 4px rgb(0 0 0 / 5%);
  transition: 0.7s ease-in-out 0s;
}
.child-dropdown li {
  width: 100%;
}
.admin-menu li:hover .child-dropdown {
  display: inline-block;
}
</style>