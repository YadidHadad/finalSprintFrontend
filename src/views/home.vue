<template>
  <section class="home-page ">

    <section class="header flex row align-center justify-between">
      <div class="logo gap flex row align-center justify-center">
        <span class="fa-brands trello-icon "></span>
        <span class="">Kannban</span>
      </div>


      <router-link class="login-btn flex justify-center align-center" :to="'/login'">
        Continue as Demo
      </router-link>

    </section>

    <section>
      <img class="wave" src="/src/assets/img/home-page/white-wave-bg.svg" alt="">
      <div class="demo-invite flex row align-start w-100 justify-around wrap">
        <div>
          <h1>Kannban brings all your tasks, teammates, and tools together</h1>
          <p>Keep everything in the same place-even if your team isn't.</p>

          <div class="flex row gap20 justify-center ">
            <button class="btn-signup">
              <router-link :to="'/login'">
                Sign up -it's free!
              </router-link>
            </button>
            <!-- <button class="btn-signup">
              <router-link :to="'/board'">
                or continue as demo
              </router-link>
            </button> -->
          </div>
        </div>

        <img class="img1" src="/src/assets/img/home-page/home1.jpeg" alt="">

      </div>
    </section>
  </section>


</template>

<script>
export default {
  name: 'home',
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
  }

}
</script>
