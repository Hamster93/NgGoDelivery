<template>
  <div class="container">

    <div class="field control">
      <input class="input" type="text" placeholder="username" v-model="username"/>
    </div>

    <div class="field control">
      <input class="input" type="password" placeholder="password" v-model="password"/>
    </div>

    <div>
      <button class="button is-rounded is-primary" v-on:click="login">Login</button>
    </div>

    <div>
      <span v-if="!!errorMsg">{{ errorMsg }}</span>
    </div>

  </div>

</template>

<script>
import router from '@/router'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      errorMsg: ''
    }
  },
  methods: {
    async login() {
      let auth = await fetch('http://localhost:8000/login', {
        body: JSON.stringify({username: this.username, password: this.password}),
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })

      auth = await auth.json()

      if (auth.success && auth.token) {
        this.errorMsg = ''
        localStorage.setItem('mcs-jwt-token', auth.token)
        router.push('dashboard')
      } else {
        this.errorMsg = auth
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
