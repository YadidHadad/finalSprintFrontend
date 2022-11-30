<template>
  <section class="main-layout">
    <user-msg />
    <app-header :color="getColor" />
    <main class="app-main">
      <router-view @setColor="setColor" />
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
      color: null,
      isDark: false
    }
  },
  components: {
    appHeader,
    userMsg
  },
  methods: {
    setColor(color) {
      this.color = color
      this.isDark = color.isDark
    }
  },
  computed: {
    getColor() {
      return this.color
    },

  },
}
</script>