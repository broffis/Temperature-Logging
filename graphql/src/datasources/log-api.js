const { RESTDataSource } = require('apollo-datasource-rest');

class LogAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL
  }

  // GET
  getAllLocations() {
    return this.get('locations')
  }

  getLocationById(id) {
    return this.get(`locations/${id}`)
  }

  getAllFridges() {
    return this.get('fridges')
  }

  getFridgeByLocation(locationId) {
    return this.get(`fridges/location/${locationId}`);
  }

  getFridgeById(fridgeId) {
    return this.get(`fridges/single/${fridgeId}`)
  }

  getAllLogs() {
    return this.get('temp');
  }

  getLogsByFridgeId(fridgeId) {
    return this.get(`temp/fridge/${fridgeId}`);
  }

  // POST
  addLocation(name) {
    return this.post('locations', { location: name});
  }

  addFridge(data) {
    return this.post('fridges', data);
  }

  addFridgeTempLog(data) {
    return this.post('temp', data)
  }

  addUser(data) {
    return this.post('user', data);
  }
}

module.exports = LogAPI;