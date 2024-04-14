const MealPlan = require('../models/mealPlan_model')

exports.addMealPlan = async (req, res) => {
  const mealPlanObject = {
    userId: `${req.body.userId}`,
    period: req.body.period,
    food: req.body.food,
  }
  const mealPlan = new MealPlan(mealPlanObject)
  mealPlan
    .save()
    .then((document) => {
      res.status(200).send(document)
    })
    .catch((error) => {
      console.error('Error saving data:', error)
    })
}

exports.getMealPlan = async (req, res) => {
  const startDate = new Date(req.body.date)
  startDate.setUTCHours(0, 0, 0, 0)
  const endDate = new Date(req.body.date)
  endDate.setUTCHours(23, 59, 59, 999)

  MealPlan.find({
    userId: req.body.userId,
    createdAt: { $gte: startDate, $lte: endDate },
  })
    .exec()
    .then((document) => {
      let plans = [[], [], [], []]
      document.map((plan) => {
        plans[plan.period].push(plan)
      })
      console.log(plans)
      res.status(200).send(plans)
    })
    .catch((error) => {
      console.error('Error saving data:', error)
    })
}

exports.deleteMeal = async (req, res) => {
  const startDate = new Date(req.body.date)
  startDate.setUTCHours(0, 0, 0, 0)
  const endDate = new Date(req.body.date)
  endDate.setUTCHours(23, 59, 59, 999)

  await MealPlan.deleteOne({
    userId: req.body.userId,
    period: req.body.period,
    createdAt: { $gte: startDate, $lte: endDate },
  })
}
