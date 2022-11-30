<template>
  <section class="main-layout" :style="userBGC">
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

import { FastAverageColor } from 'fast-average-color';

const fac = new FastAverageColor();


export default {

  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  data() {
    return {
      url: 'src/assets/img/bgc-img-def.jpg'
    }
  },
  components: {
    appHeader,
    userMsg
  },
  computed: {

    userBGC() {
      // console.log('back')
      return { backgroundImage: this.url }
      // return { backgroundColor: 'red' }
      // return "{ backgroundColor: 	#880808 }"
    },
    avgColor() {

      const url = this.url

      fac.getColorAsync(url)
        .then(color => {
          container.style.backgroundColor = color.rgba;
          container.style.color = color.isDark ? '#fff' : '#000';
        })
        .catch(e => {
          console.log(e);
        });
    }

  },
}
</script>