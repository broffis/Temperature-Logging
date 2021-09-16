const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Fridge = require('../models/Fridge');

//  @route  POST  api/fridges
//  @desc   Add fridge
//  @access Public
router.post('/', [
  check('name', 'Please add name')
    .not()
    .isEmpty(),
  check('locationId', 'Please select a location')
    .not()
    .isEmpty()
], async (req, res) => {
  const errors = validationResult(req)
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, locationId } = req.body;

  try {
    let fridge = await Fridge.findOne({ name, locationId })

    if (fridge) {
      return res.status(400).json({ msg: 'Fridge already exists in this location' });
    }

    fridge = new Fridge({
      name,
      locationId
    });

    await fridge.save();
    res.json({
      msg: `Fridge created: ${name}`,
      data: fridge
    })
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
})

// @route   GET api/fridges
// @desc    Get all fridges
// @access  Public
router.get('/', async (req, res) => {
  try {
    const fridges = await Fridge.find();
    res.send(fridges)
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
});

// @route   GET api/fridges/location/:id
// @desc    Get fridges by location
// @access  Public
router.get('/location/:id', async (req, res) => {
  try {
    const locationId = req.params.id;
    console.log('locationID', locationId)

    const fridges = await Fridge.find({ locationId });
    res.send(fridges)
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
});

// @route   GET api/fridges/single/:id
// @desc    Get single fridge
// @access  Public
router.get('/single/:id', async (req, res) => {
  try {
    const fridgeId = req.params.id;
    const fridge = await Fridge.findOne({ _id: fridgeId });
    res.send(fridge);
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
});

module.exports = router;