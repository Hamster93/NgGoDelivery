<template>
<div>
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          MCS2 Dashboard
        </h1>
      </div>
    </div>
  </section>
  <div class="columns container is-fluid">
    <units class="column"></units>
    <emergencies class="column"></emergencies>
    <users class="column"></users>
    <maps class="column"></maps>
  </div>
  <send-location></send-location>
</div>
</template>

<script>
import Units from '@/components/Units'
import Emergencies from '@/components/Emergencies'
import Users from '@/components/Users'
import Maps from '@/components/Maps'
import SendLocation from '@/components/SendLocation'

export default {
  name: 'Dashboard',
  components: {
    Units,
    Emergencies,
    Users,
    Maps,
    SendLocation
  },
  mount() {

  }
}
</script>

<style>
  .centered-text {
    text-align: center;
  }
  ul.is-unstyled {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
