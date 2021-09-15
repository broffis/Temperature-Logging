const mongoose = require('mongoose');

const FridgeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  locationId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Fridge', FridgeSchema);
