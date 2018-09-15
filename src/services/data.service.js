import axios from 'axios'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('mcs-jwt-token')
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default {

  // Units

  createUnit(unit) {
    return axios.post('http://127.0.0.1:8000/unit', unit)
    .then(res => res.data)
    .catch(console.log)
  },

  fetchAllUnits() {
    return axios.get('http://localhost:8000/units')
    .then(res => res.data)
    .catch(console.log)
  },

  deleteUnit(id) {
    return axios.delete(`http://localhost:8000/unit/${id}`)
    .then(res => res.data)
    .catch(console.log)
  },

  getUnit(id) {
    return axios.get(`http://localhost:8000/unit?id=${id}`)
    .then(res => res.data)
    .catch(console.log)
  },

  updateUnit(unit) {
    return axios.put(`http://localhost:8000/unit`, unit)
    .then(res => res.data)
    .catch(console.log)
  },

  // Users

  createUser(user) {
    return axios.post('http://127.0.0.1:8000/user', user)
    .then(res => res.data)
    .catch(console.log)
  },

  fetchAllUsers() {
    return axios.get('http://localhost:8000/users')
    .then(res => res.data)
    .catch(console.log)
  },

  deleteUser(id) {
    return axios.delete(`http://localhost:8000/user/${id}`)
    .then(res => res.data)
    .catch(console.log)
  },

  // Emergencies

  fetchAllEmergencies() {
    return axios.get('http://localhost:8000/emergencies')
    .then(res => res.data)
    .catch(console.log)
  },

  createEmergency(emergency) {
    return axios.post('http://localhost:8000/emergency', emergency)
    .then(res => res.data)
    .catch(console.log)
  }

}
