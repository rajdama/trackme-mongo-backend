const express = require('express')
const {
  mealPLanExists,
  getMealPlan,
  deleteMeal,
  addMealPlan,
} = require('../controller/mealPlan')
const { requireSignin } = require('../middleware/middleware')

const router = express.Router()

router.post('/createMealPlan', requireSignin, addMealPlan)
router.post('/getMealPlan', getMealPlan)
router.post('/deleteMeal', requireSignin, deleteMeal)

module.exports = router
