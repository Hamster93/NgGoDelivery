<template>
<div>
  <div class="modal" :class="{'is-active': modalIsActive}">
    <div class="modal-background"></div>
      <div class="modal-content">
        <p>Amount: {{ giveaway.amount }}</p>
        <p>{{ giveaway.location.street }} {{ giveaway.location.number }}</p>
        <p>{{ giveaway.location.zip }}</p>
        <p>{{ giveaway.location.country }}</p>
        <Datepicker v-model="date"/>
        <div class="submit-button-wrapper">
          <a class="button is-primary is-rounded" @click="send">Submit</a>
        </div>
        <!-- Any other Bulma elements you want -->
      </div>
      <button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
    </div>
    <div class="box">
      <div class="g-map" id="map"></div>
    </div>
  </div>
</template>

<script>
const socket = io.connect('http://localhost:9000')
import Datepicker from 'vuejs-datepicker'
import io from 'socket.io-client'

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
      date: '',
      giveaway: {
        location: {}
      },
      modalIsActive: false
    }
  },
  components: {
    Datepicker
  },
  methods: {
    closeModal () {
      this.modalIsActive = false
    },
    send() {
      this.modalIsActive = false
      const giveaway = this.giveaway['collectionTime'] = this.date
      io.to(socket.id).emit('accept_task', giveaway, function(data) {
        console.log(data);
      })
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

    socket.on('new_task', (data) => {
      this.giveaway = data
      if (!markers[data._id]) {
        markers[data._id] = new maps.Marker({
          map: this.map,
          icon: 'static/unit.png'
        })
        markers[data._id].addListener('click', () => {
          this.modalIsActive = true
        })
      }
      const position = new maps.LatLng(data.location.latitude, data.location.longitude)
      markers[data._id].setPosition(position)
    })
  }
}
</script>

<style>
.g-map {
  height: 600px;
  background: gray;
}
.modal-content {
  height: 16rem;
  background: white;
  width: 40rem;
  border-radius: 25px;
  padding: 2rem;
}
.submit-button-wrapper {
  width: 100%;
  text-align: center;
}
.button.is-rounded {
  margin-top: 1rem;
  width: 60%;
  box-shadow: 1px 1px 34px #00d1b287;
}
.vdp-datepicker__calendar {
  position: fixed;
}
.vdp-datepicker input {
  margin: 0 auto;
  display: block;
  height: 2em;
  border-radius: 9px;
  padding: 1.5em;
  text-align: center;
  font-size: .8em;
}
</style>
