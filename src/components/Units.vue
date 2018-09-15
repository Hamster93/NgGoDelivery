<template>
  <div class="box">
    <div class="centered-text">
      <h2 class="title is-4">Units</h2>
      <button class="button is-primary is-rounded" v-on:click="openCreateForm">+</button>
    </div>
    <div class="content">
      <ul class="is-unstyled">
        <li v-for="unit in units" :key="unit._id">
          <h4 class="title is-4">
            <button class="button is-small is-rounded is-info is-outlined" v-on:click="openEditForm(unit)">edit</button>
            <button class="delete is-medium" v-on:click="deleteUnit(unit._id)">x</button>
            {{ unit.name }}
          </h4>
          <h6 class="subtitle is-6">{{unit.status.name}}</h6>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import router from '@/router'
import dataService from '@/services/data.service'

export default {
  name: 'Units',
  data() {
    return {
      token: '',
      units: []
    }
  },
  mounted() {
    dataService.fetchAllUnits()
    .then(units => this.units = units)
  },
  methods: {
    openCreateForm() {
      router.push('create-unit')
    },

    openEditForm(unit) {
      router.push('edit-unit/' + unit._id)
    },

    deleteUnit(id) {
      dataService.deleteUnit(id)
      .then(deleted => {
        if (!!deleted) {
          this.units = this.units.filter(unit => {
            return unit._id != id
          })
        }
      })
    }
  }
}
</script>
