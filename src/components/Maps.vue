<template>
  <div class="box">
    <div class="g-map" id="map"></div>
  </div>
</template>

<script>
import dataService from '@/services/data.service'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:8000', {
  transports: ['websocket'],
  forceNew: true,
  reconnection: false
})

export default {
  data () {
    return {
      name: "Map",
      markerCoordinates: [{
        latitude: 47.6603782,
        longitude: 9.154525
      }],
      bounds: null,
      markers: [],
      map: null,
    }
  },
  mounted () {
    const maps = window.google.maps
    const element = document.getElementById('map')
    this.bounds = new maps.LatLngBounds()

    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new maps.LatLng(mapCentre.latitude, mapCentre.longitude),
      zoom: 14
    }
    this.map = new maps.Map(element, options)
    let markers = {}
    let marker = new maps.Marker({
      map: this.map,
      icon: 'static/unit.png'
    })

    socket.on('location_update', (data) => {
      if (!markers[data._id]) {
        markers[data._id] = new maps.Marker({
          map: this.map,
          icon: 'static/unit.png'
        })
      }

      const position = new maps.LatLng(data.location.lat, data.location.long)
      console.log(position)
      markers[data._id].setPosition(position)
    })

    dataService.fetchAllEmergencies()
    .then(emergencies => {
      emergencies.forEach((emergency) => {
        const position = new maps.LatLng(emergency.location.lat, emergency.location.lng);
        const marker = new maps.Marker({
          position,
          map: this.map,
          title: emergency.name
        })
      })
    })
  }
}
</script>

<style scoped>
.g-map {
  width: 800px;
  height: 600px;
  background: gray;
}
</style>
