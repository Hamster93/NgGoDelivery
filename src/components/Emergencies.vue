<template>
  <div class="box">
    <div class="centered-text">
      <h2 class="title is-4">Emergencies</h2>
      <button class="button is-rounded is-primary" v-on:click="openCreateForm">+</button>
    </div>
  <div class="content">
    <ul class="is-unstyled">
      <li v-for="emergency in emergencies" :key="emergency._id">
        <h4 class="title is-4">{{ emergency.name }}</h4>
        <h6 class="subtitle is-6">{{emergency.status.name}}</h6>
        <p>{{ emergency.location }}</p>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import router from '@/router'
import dataService from '@/services/data.service'

export default {
  name: 'Emergencies',
  data() {
    return {
      token: '',
      emergencies: []
    }
  },
  beforeMount() {
    this.token = localStorage.getItem('mcs-jwt-token')
  },
  methods: {
    openCreateForm() {
      router.push('create-emergency')
    }
  },
  mounted() {
    dataService.fetchAllEmergencies()
    .then(emergencies => this.emergencies = emergencies)
  }
}
</script>

<style scoped>
<style>
