const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const TempLog = require('../models/Log');

//  @route  POST  api/temp
//  @desc   Add temperature log
//  @access Public
router.post('/', [
  check('fridgeId', 'Please add a fridge')
    .not()
    .isEmpty(),
  check('temperature', 'Please add a temperature')
    .not()
    .notEmpty()
],async (req, res) => {
  const errors = validationResult(req);
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fridgeId, temperature, logTime } = req.body;
  
  try {
    let tempLog = await TempLog.findOne({ fridgeId, logTime });
    if (tempLog) {
      return res.status(400).json({ msg: 'Temp Log already exists' });
    }

    tempLog = new TempLog({
      fridgeId,
      temperature,
      logTime
    });

    await tempLog.save();
    res.send(tempLog);
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
});


//  @route  GET  api/temp/
//  @desc   Get all temperature logs
//  @access Public
router.get('/', async (req, res) => {
  try {
    const logs = await TempLog.find();
    res.send(logs);
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
});

//  @route  GET  api/temp/fridge/:id
//  @desc   Get all temperature logs for fridge
//  @access Public
router.get('/fridge/:id', async (req, res) => {
  try {
    const fridgeId = req.params.id;
    const logs = await TempLog.find({ fridgeId });
    res.send(logs);
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
});



module.exports = router;