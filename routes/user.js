const express = require('express')
const { signup, signin, getUpdatedUser } = require('../controller/user')
const {
  validateSignupRequest,
  validateSigninRequest,
  isRequestValidated,
} = require('../validator/validator.js')
const router = express.Router()

router.post('/signin', validateSigninRequest, signin)
router.post('/signup', validateSignupRequest, signup)
router.post('/getUpdatedUser', isRequestValidated, getUpdatedUser)

module.exports = router
