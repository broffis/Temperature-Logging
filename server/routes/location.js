const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Location = require('../models/Location');

//  @route  POST  api/locations
//  @desc   Add location
//  @access Public
router.post('/', [
  check('location', 'Please add location')
    .not()
    .isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { location } = req.body;

  try {
    let fridgeLocation = await Location.findOne({ location });

    if (fridgeLocation) {
      return res.status(400).json({ msg: 'Location already exists' });
    }

    fridgeLocation = new Location({
      location
    });

    await fridgeLocation.save();
    return res.status(200).json({ msg: `Successfully created location: ${location}`, data: fridgeLocation});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});


// @route   GET api/locations
// @desc    Get all locations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.send(locations) 
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
})

// @route   GET api/locations
// @desc    Get all locations
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findOne({ _id: req.params.id });
    res.send(location) 
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
})

module.exports = router