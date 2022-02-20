import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/main/Home.vue'
import About from '../components/main/About.vue'
import Cart from '../components//main/Cart.vue'
import Favourite from '../components//main/Favourite.vue'
import DetailProducts from '../components/main/Detail-products.vue'
import Products from '../components/main/Products.vue'
import Login from '../components/main/Login.vue'
import Account from '../components/main/Account.vue'
import Admin from '../components/main/Admin.vue'
import CategoriesAdmin from '../components/main/AdminPage/CategoriesAdmin.vue'
import ProductsAdmin from '../components/main/AdminPage/ProductsAdmin.vue'
import UsersAdmin from '../components/main/AdminPage/UsersAdmin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/favourite',
    name: 'Favourite',
    component: Favourite
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/detail/:name/:id',
    name: 'Detail-products',
    props: true,
    component: DetailProducts
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/categoriesadmin',
    name: 'CategoriesAdmin',
    component: CategoriesAdmin
  },
  {
    path: '/productsadmin',
    name: 'ProductsAdmin',
    component: ProductsAdmin
  },
  {
    path: '/usersadmin',
    name: 'UsersAdmin',
    component: UsersAdmin
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
