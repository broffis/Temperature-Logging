const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const jwtSecret = process.env.JWT_SECRET;

// @route   POST  api/user
// @desc    Register a user
// @access  Public
router.post('/', [
  check('name', 'Please add name')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req)
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  const access = req.body.access !== undefined ? req.body.access : 0;

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      access
    });

    const salt = await bcrypt.genSalt(10); //=> generates salt for security

    user.password = await bcrypt.hash(password, salt); //=> generates salted & hashed value

    await user.save();

    const payload = {
      user: {
        id: user.id,
        access
      }
    }

    jwt.sign(
      payload, 
      jwtSecret,
      {
        expiresIn: 36000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token })
      })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});


// @route   PATCH  api/user/
// @desc    Update a user password
// @access  Public
router.patch('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('old_password', 'Please enter your previous password').isLength({
    min: 6
  }),
  check('new_password', 'Please enter your previous password').isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req)
  if ( !errors.isEmpty() ) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, new_password, old_password } = req.body;

    let user = await User.findOne({ email });

    console.log('user', user)

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    const { _id, name, access, password } = user;



    const isMatch = await bcrypt.compare(old_password, password);

    if ( !isMatch ) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    let userFields = {
      name,
      email,
      access
    };

    const salt = await bcrypt.genSalt(10); //=> generates salt for security
    userFields.password = await bcrypt.hash(new_password, salt);

    user = await User.findByIdAndUpdate(_id, 
      { $set: userFields },
      { new: true }
    )

    const payload = {
      user: {
        id: user.id,
        access: user.access
      }
    }

    jwt.sign(
      payload, 
      jwtSecret,
      {
        expiresIn: 36000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token })
      })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
})
module.exports = router;