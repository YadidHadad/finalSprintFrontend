import { createRouter, createWebHashHistory } from 'vue-router'

import homePage from './views/home-page.vue'
// import chat from './views/chat.vue'
// import reviewApp from './views/review-app.vue'
import loginSignup from './views/login-signup.vue'
import userDetails from './views/user-details.vue'
import boardDetails from './views/board-details.vue'
import taskDetails from './views/task-details.vue'




import taskDetailsTest from './views/task-details-test.vue'


const routes = [
  {
    path: '/',
    name: 'home-page',
    component: homePage
  },
  // {
  //   path: '/review',
  //   name: 'review',
  //   component: reviewApp
  // },
  // {
  //   path: '/chat',
  //   name: 'chat',
  //   component: chat
  // },
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
  // {
  //   path: '/task',
  //   name: 'task-details-test',
  //   component: taskDetailsTest
  // },
  {
    path: '/board/:id',
    name: 'board-details',
    component: boardDetails,
    children: [
      {
        path: '/board/:id/task/:taskId',
        name: 'task-details',
        component: taskDetailsTest
      },
    ]
  },
  // {
  //   path: '/task/:id',
  //   name: 'task-details',
  //   component: taskDetails
  // },
]


export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

