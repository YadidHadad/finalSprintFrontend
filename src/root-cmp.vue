<template>
  <section class="main-layout">
    <user-msg />
    <app-header :style="headerColor" />
    <main class="app-main">
      <router-view @setHeaderColor="setHeaderColor" />
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
  methods: {



    headerColor(color) {

      console.log(color)
      // return { backgroundColor: this.color.rgb } || { backgroundColor: white }
    }




  },
}
</script>