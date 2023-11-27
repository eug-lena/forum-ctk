import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddPost from './views/AddPost.vue'
import Post from './views/Post.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add-post',
      name: 'add-post',
      component: AddPost
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post
    }
  ]
})
