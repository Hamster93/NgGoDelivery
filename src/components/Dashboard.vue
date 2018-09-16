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
</div>
</template>

<script>
import Maps from '@/components/Maps'

export default {
  name: 'Dashboard',
  data () {
    return {
      giveaway: null
    }
  },
  components: {
    Maps,
  },
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
