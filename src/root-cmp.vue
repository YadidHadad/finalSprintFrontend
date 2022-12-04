<template>
  <section class="main-layout">
    <user-msg />
    <app-header :rgb="getRGB" />
    <main v-if="boards" class="app-main">
      <router-view @setRGB="setRGB" />
    </main>
  </section>
</template>

<script>


import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'

import { userService } from './services/user.service'



export default {
  async created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    console.log(`user:`, user)
    if (user) store.commit({ type: 'setLoggedinUser', user })


    try {
      await this.$store.dispatch({ type: 'loadBoards' })
      // console.log(this.boards)
    } catch (err) {
      console.log(err)
    }

  },

  data() {
    return {
      rgb: null,
      isDark: false
    }
  },
  components: {
    appHeader,
    userMsg
  },
  methods: {
    setRGB(rgb) {
      this.rgb = rgb
      this.isDark = rgb.isDark
    }
  },
  computed: {
    getRGB() {
      return this.rgb
    },
    boards() {
      return this.$store.getters.boards
    }

  },
}
</script>