<template>
  <div class="container">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Unit name" v-model="name">
      </div>
    </div>

    <div class="field">
      <label class="label">Capacity</label>
      <div class="control">
        <input class="input" type="number" placeholder="2" v-model="capacity">
      </div>
    </div>

    <div class="field">
      <label class="label">Status</label>
        <div class="control">
          <input class="input" type="text" placeholder="ON_THE_WAY" v-model="status.name">
        </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
        <div class="control">
          <input class="textarea" type="textarea" placeholder="Unit description" v-model="description">
        </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success" v-on:click="saveUnit">Submit</button>
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
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      name: '',
      capacity: 1,
      status: {
        name: ''
      },
      description: ''
    }
  },
  mounted() {
    dataService.getUnit(this.id)
    .then(unit => {
      this.name = unit.name
      this.capacity = unit.capacity
      this.status = unit.status
      this.description = unit.description
    })
  },
  methods: {
    saveUnit() {
      const { name, capacity, status, description } = this
      const request = this.id
      ? dataService.updateUnit({ id: this.id, name, capacity, status, description })
      : dataService.createUnit({ name, capacity, status, description })
      request.then(unit => {
        if (!!unit._id) {
          router.push('/dashboard')
          // TODO: send success toaster
        }
      })
    },
    cancel() {
      router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
</style>
