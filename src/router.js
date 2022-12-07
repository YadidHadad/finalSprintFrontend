import { createRouter, createWebHashHistory } from 'vue-router'

import home from './views/home.vue'
// import chat from './views/chat.vue'
// import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import boardList from './views/board-list.vue'
import boardDetails from './views/board-details.vue'
import taskDetails from './views/task-details.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/board',
    name: 'board',
    component: boardList
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: loginSignup
  },
  {
    path: '/user/:id',
    name: 'user-details',
    component: userDetails
  },
  {
    path: '/board/:id',
    name: 'board-details',
    component: boardDetails,
    // children: [
    //   {
    //     path: '/board/:id/task/:taskId',
    //     name: 'task-details',
    //     component: taskDetails
    //   },
    // ]
  },
  {
    path: '/board/:id/:groupId/:taskId',
    name: 'task-details',
    component: boardDetails
  },
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

