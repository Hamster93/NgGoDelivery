<template>
  <div class="box">
    <div class="centered-text">
      <h2 class="title is-4">Users</h2>
      <button class="button is-rounded is-primary" v-on:click="openCreateForm">+</button>
    </div>
    <div class="content">
      <ul class="is-unstyled">
        <li v-for="user in users" :key="user._id">
          <h4>
          <button class="delete is-medium" v-on:click="deleteUser(user._id)">x</button>
          {{ user.username }}
            <!-- <span class="tag is-primary is-rounded">online</span> -->
          </h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import dataService from '@/services/data.service'

export default {
  name: 'Users',
  data() {
    return {
      token: '',
      users: []
    }
  },
  methods: {
    openCreateForm() {
      router.push('create-user')
    },
    deleteUser(id) {
      dataService.deleteUser(id)
      .then(deleted => {
        if (!!deleted) {
          this.users = this.users.filter(user => {
            return user._id != id
          })
        }
      })
    }
  },
  mounted() {
    dataService.fetchAllUsers()
    .then(users => this.users = users)
  }
}

</script>

<style scoped>
<style>
