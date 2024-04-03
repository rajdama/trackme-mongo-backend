const express = require('express')
const {
  createMealPlan,
  mealPLanExists,
  updateMealPlan,
  getMealPlan,
  deleteMeal,
} = require('../controller/mealPlan')
const { requireSignin } = require('../middleware/middleware')

const router = express.Router()

router.post('/createMealPlan', requireSignin, createMealPlan)
router.post('/updateMealPlan', requireSignin, updateMealPlan)
router.post('/mealPlanExists', requireSignin, mealPLanExists)
router.post('/getMealPlan', requireSignin, getMealPlan)
router.post('/deleteMeal', requireSignin, deleteMeal)

module.exports = router
