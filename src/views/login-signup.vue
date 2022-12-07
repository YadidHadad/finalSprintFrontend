<template>
  <div class="container about">
    <p>{{ msg }}</p>



    <section class="login-main-layout ">




      <div v-if="loggedinUser" class="user-loggedin flex column justify-center align-center gap20">
        <h3>
          {{ loggedinUser.fullname }}
        </h3>
        <h2>
          {{ loggedinUser.email }}
        </h2>
        <button class="btn login-btn" @click="doLogout">Logout</button>
      </div>


      <div v-else class="login-signup-container">
        <!-- <h1 v-else>Sign up to Kanban</h1> -->
        <form v-if="!isSignUp" @submit.prevent="doLogin">
          <h1>Log in to Kanban</h1>
          <div class="login-container">
            <input type="text" placeholder="Enter email" v-model="loginCred.email">
            <input type="text" placeholder="Enter password" v-model="loginCred.password">
            <button class="btn login-btn">Log in</button>
          </div>
          <div>OR</div>
        </form>

        <form v-else @submit.prevent="doSignup">
          <h1>Sign up for your account</h1>
          <div class="signup-container">
            <input type="text" placeholder="Enter full name" v-model="signupCred.fullname">
            <input type="text" placeholder="Enter email" v-model="signupCred.email">
            <input type="text" placeholder="Enter password" v-model="signupCred.password">
            <!-- <img-uploader @uploaded="onUploaded"></img-uploader> -->
            <button class="btn login-btn">Sign up</button>
          </div>
          <div>OR</div>
        </form>

        <button class="btn google-btn">
          <span class="icon"></span>
          Continue with Google
        </button>

        <GoogleLogin :callback="loginWithGoogle" />
        <hr class="bottom-form-separator">

        <div v-if="!isSignUp" class="login-footer">
          <span href="">Can't log in?</span>
          <span class="fa-solid fa-circle"></span>
          <span href="" @click.prevent="(isSignUp = true)">Sign up for an account
          </span>
        </div>
        <div v-else class="signup-footer">
          <span href="" @click.prevent="(isSignUp = false)">
            Already have an account? Log In
          </span>
        </div>
      </div>
    </section>
    <img class="bottom-right-img"
      src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.385/static/media/trello-right.16b9c9bb.svg"
      alt="">
    <img class="bottom-left-img"
      src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.385/static/media/trello-left.7317ad1f.svg"
      alt="">
    <!-- <div class="bottom-right-img"></div>
    <div class="bottom-left-img"></div> -->
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
import { decodeCredential } from 'vue3-google-login'
// import { googleTokenLogin } from "vue3-google-login"
export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { email: '', password: '' },
      signupCred: { email: '', password: '', fullname: '', imgUrl: '' },
      isSignUp: false
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
    async loginWithGoogle(res) {
      console.log(res);
      const userData = decodeCredential(res.credential)
      console.log("Handle the userData", userData)
      try {
        const user = await this.$store.dispatch({ type: "loginWithGoogle", email: userData.email })
        // console.log(user);
        if (user) this.$router.push('/')
        else {
          this.isSignUp = true
          this.signupCred.email = userData.email
          this.signupCred.imgUrl = userData.picture
        }
      }
      catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    // googleLoginPopup() {
    //   googleTokenLogin().then((response) => {
    //     console.log("Handle the response", response)
    //     this.loginWithGoogle(response)
    //   })
    // },
    setUserImg(imgUrl) {
      console.log(imgUrl);
    },
    async doLogin() {
      if (!this.loginCred.email || !this.loginCred.password) {
        this.msg = 'Please enter email/password'
        return
      }
      try {
        const user = await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        console.log(user);
        if (user) this.$router.push('/board')
        else console.log('User name and password dont match');
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    async doLogout() {
      try {
        await this.$store.dispatch({ type: 'logout' })
      } catch (err) {
        console.log('userStore: Error in logout', err)
      }
    },

    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.email) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/board')

    },

    async loadUsers() {
      try {
        await this.$store.dispatch({ type: "loadUsers" })
      } catch (err) {
        console.log('userStore: Error in loadUsers', err)

      }
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
  }
}
</script>