<template>
  <section class="main-layout">
    <user-msg />
    <app-header />
    <main class="app-main">
      <router-view />
    </main>
  </section>
</template>

<script>


import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'

import { userService } from './services/user.service'



export default {

  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  data() {
    return {
    }
  },
  components: {
    appHeader,
    userMsg
  },
  computed: {




  },
}
</script>