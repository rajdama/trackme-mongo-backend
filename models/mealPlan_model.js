const mongoose = require('mongoose')
const mealPlan = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    food: {
      type: Object,
      required: true,
    },
    period: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('MealPlan', mealPlan, 'MealPlan')
