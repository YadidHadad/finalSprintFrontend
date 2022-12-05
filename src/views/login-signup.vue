<template>
  <div class="container about">
    <p>{{ msg }}</p>

    <section class="login-main-layout">
      <div v-if="loggedinUser">
        <h3>
          Loggedin User:
          {{ loggedinUser.fullname }}
          <button @click="doLogout">Logout</button>
        </h3>
      </div>
      <div class="login-container">
        <h2>Log in to Kanban</h2>
        <form @submit.prevent="doLogin">
          <input type="text" placeholder="Enter email" v-model="loginCred.username">
          <input type="text" placeholder="Enter password" v-model="loginCred.password">
          <button class="btn login-btn">Log in</button>
          <div>OR</div>
          <button class="btn google-btn">
            <span class="icon"></span>
            Continue with Google
          </button>


          <hr class="bottom-form-separator">
        </form>
      </div>
    </section>
    <div class="bottom-right-img"></div>
    <div class="bottom-left-img"></div>
    <!-- <hr />
      <details>
        <summary>
          Admin Section
        </summary>
        <ul>
          <li v-for="user in users" :key="user._id">
            <pre>{{ user }}</pre>
            <button @click="removeUser(user._id)">x</button>
          </li>
        </ul>
      </details> -->
  </div>
</template>

<script>

import imgUploader from '../cmps/img-uploader.vue'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: 'user1', password: '123' },
      signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username || !this.loginCred.password) {
        this.msg = 'Please enter email/password'
        return
      }
      try {
        const user = await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        console.log(user);
        if(user) this.$router.push('/')
        else console.log('User name and password dont match');
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')

    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    }

  },
  components: {
    imgUploader
  }
}
</script>