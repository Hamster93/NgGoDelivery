<template>
  <div class="container">
    <div class="field">

      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" placeholder="Emergency name" v-model="name">
      </div>

      <label class="label">Status</label>
      <div class="control">
        <input class="input" type="text" placeholder="OPEN_EMERGENCY" v-model="status.name">
      </div>


      <label class="label">Type</label>
      <div class="control">
        <input class="input" type="text" placeholder="Typename" v-model="type.name">
      </div>

      <label class="label">Description</label>
      <div class="control">
        <input class="textarea" type="textarea" placeholder="Any informations" v-model="description">
      </div>

      <label class="label">Street</label>
      <div class="control">
        <input class="input" type="text" placeholder="Erfurterstr" v-model="location.street">
      </div>

      <label class="label">Number</label>
      <div class="control">
        <input class="input" type="text" placeholder="2a" v-model="location.streetNr">
      </div>

      <label class="label">City</label>
      <div class="control">
        <input class="input" type="text" placeholder="Konstanz" v-model="location.city">
      </div>

      <label class="label">Zip</label>
      <div class="control">
        <input class="input" type="text" placeholder="78462" v-model="location.zip">
      </div>

    </div>
    <h1>Create Emergency: lat: {{ location.lat }}, lng: {{ location.lng }}</h1>
    <div class="g-map" id="map"></div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-success" v-on:click="saveEmergency">Submit</button>
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
  data() {
    return {
      bounds: null,
      markers: [],
      name: '',
      description: '',
      status: {
        name: ''
      },
      type: {
        name: ''
      },
      location: {
        street: '',
        streetNr: '',
        city: '',
        zip: '',
        lat: null,
        lng: null
      },
      geocoder: null,
      marker: null,
      map: null
    }
  },
  mounted() {
    const maps = window.google.maps
    const element = document.getElementById('map')
    let markerAlreadySet = false


    this.bounds = new maps.LatLngBounds()
    const mapCentre = {
      latitude: 47.6603782,
      longitude: 9.154525
    }
    this.map = new maps.Map(element, {
      center: new maps.LatLng(mapCentre.latitude, mapCentre.longitude),
      zoom: 16
    })

    this.geocoder = new maps.Geocoder()
    maps.event.addListener(this.map, 'click', (e) => {
      if (markerAlreadySet) {
        this.marker.setPosition(e.latLng)
        return
      }
      this.marker = new maps.Marker({
        position: e.latLng,
        map: this.map,
        draggable: true
      });

      this.marker.addListener('drag', (e) => {
        this.setAddressFromLatLng(e.latLng)
      })
      markerAlreadySet = true;
    })
  },
  watch: {
    location: {
      handler() {
        this.setMarkerToAnAddress()
      },
      deep: true
    }
  },
  methods: {
    saveEmergency() {
      const { name, description, status, type, location } = this
      dataService.createEmergency({name, description, status, type, location})
      .then(emergency => {
        if (!!emergency._id) {
          router.push('dashboard')
          // TODO: send success toaster
        }
      })
    },
    cancel() {
      router.push('dashboard')
    },
    setAddressFromLatLng(location) {
      this.location.lat = location.lat()
      this.location.lng = location.lng()
      this.geocoder.geocode({location}, (address, status) => {
          if (status === 'OK') {
            const addressComponents = address[0].address_components
            if (addressComponents.length === 9) {
              this.location.zip = addressComponents[8].long_name
              this.location.city = addressComponents[4].long_name
              this.location.street = addressComponents[1].long_name
              this.location.streetNr = addressComponents[0].long_name
            } else if (addressComponents.length === 8){
              this.location.zip = addressComponents[7].long_name
              this.location.city = addressComponents[2].long_name
              this.location.street = addressComponents[1].long_name
              this.location.streetNr = addressComponents[0].long_name
            } else if (addressComponents.length === 7) {
              this.location.zip = addressComponents[6].long_name
              this.location.city = addressComponents[2].long_name
              this.location.street = '',
              this.location.streetNr = ''
            }
          }
        })
    },

    setMarkerToAnAddress() {
      let address = `${this.location.street}. ${this.location.streetNr}, ${this.location.city}, ${this.location.zip}`
      if (this.marker === null) {
        this.marker = new window.google.maps.Marker({
          map: this.map,
          draggable: true
        });
      }
      this.geocoder.geocode({address}, (results, status) => {
        if (status === 'OK') {
          let location = results[0].geometry.location
          this.location.lat = location.lat()
          this.location.lng = location.lng()
          this.marker.setPosition(location)
        }
      })
    }
  }
}
</script>

<style scoped>
.g-map {
  min-width: 100%;
  height: 600px;
  background: gray;
}
</style>
