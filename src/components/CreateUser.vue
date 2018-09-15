<template>
  <div class="container">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Max Musterman" v-model="name">
      </div>
    </div>

    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" type="text" placeholder="username" v-model="username">
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="password" v-model="password">
        </div>
    </div>

    <div class="field">
      <label class="label">Repeat Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="password" v-model="repeatPassword">
        </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success" v-on:click="saveUser">Submit</button>
      </div>
      <div class="control">
        <button class="button is-danger" v-on:click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import dataService from '@/services/data.service'

export default {
  data() {
    return {
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      token: ''
    }
  },
  methods: {
    saveUser() {
      const { name, username, password, repeatPassword } = this
      dataService.createUser({username, password})
      .then(user => {
        if (!!user._id) {
          router.push('dashboard')
          // TODO: send success toaster
        }
      })

    },
    cancel() {
      router.push('dashboard')
    }
  }
}
</script>

<style scoped>
</style>
