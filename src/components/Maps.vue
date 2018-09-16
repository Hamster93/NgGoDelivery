<template>
  <div class="box">
    <div class="g-map" id="map"></div>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io.connect('http://localhost:9000')

export default {
  data () {
    return {
      name: "Map",
      markerCoordinates: [{
        latitude: 47.3889663,
        longitude: 8.5133641,
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

    socket.on('on_new_task', (data) => {
      console.log('EVENT  ------   ON_NEW_TASK');
      if (!markers[data._id]) {
        markers[data._id] = new maps.Marker({
          map: this.map,
          icon: 'static/unit.png'
        })
      }

      const position = new maps.LatLng(data.location.latitude, data.location.longitude)
      console.log(position)
      markers[data._id].setPosition(position)
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
