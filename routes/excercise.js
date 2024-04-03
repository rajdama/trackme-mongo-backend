const express = require('express')
const {
  createExcercisePlan,
  getExcercisePlan,
  excercisePlanExist,
  updateExcercisePlan,
} = require('../controller/excercise')
const { requireSignin } = require('../middleware/middleware')
const router = express.Router()

router.post('/createExcercisePlan', requireSignin, createExcercisePlan)
router.post('/getExcercisePlan', requireSignin, getExcercisePlan)
router.post('/excercisePlanExist', requireSignin, excercisePlanExist)
router.post('/updateExcercisePlan', requireSignin, updateExcercisePlan)

module.exports = router
