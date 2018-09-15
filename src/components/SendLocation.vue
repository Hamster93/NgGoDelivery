<template>
  <div>
    <input class="input" placeholder="Latitude" v-model="lat"/>
    <input class="input" placeholder="Longtitude" v-model="lng"/>
    <button class="button is-info" v-on:click="sendLocation">send location</button>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io.connect('http://localhost:8000', {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false
})
export default {
  data() {
    return {
      lat: 47.664294613795036,
      lng: 9.161820608520543,
      sending: false
    }
  },
  mounted() {
    socket.on('location_update', (data) => {
      console.log(data)
    })
  },
  methods: {
    sendLocation() {
      socket.emit('location_update', {
        "_id": "5a9c2777a1189b002bc8192d",
        "name": "unitname 1",
        "capacity": 1,
        "description": "asdaisdn",
        "__v": 0,
        "crew": [],
        "status": {
            "name": "ON_THE_WAY"
        },
        "location": {
          lat: this.lat,
          long: this.lng
        }
      })
    }
  }
}
</script>

<style>
</style>
