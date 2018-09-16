<template>
<div>
  <section class="hero is-dark">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          NgGo Dashboard
        </h1>
      </div>
    </div>
  </section>
  <div class="columns container is-fluid">
    <maps class="column"></maps>
  </div>
  <send-location></send-location>
</div>
</template>

<script>
import Maps from '@/components/Maps'
import SendLocation from '@/components/SendLocation'

export default {
  name: 'Dashboard',
  components: {
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
