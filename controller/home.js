const { Client, Databases } = require('node-appwrite')
const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
  .setKey(`${process.env.APPWRITE_API_KEY}`)

const databases = new Databases(client)

exports.getCurrentMonthPlan = async (req, res) => {
  const excercisePlans = await databases.listDocuments(
    '648889c9d70e67f298c6',
    '64888a47f167444cc8f4'
  )

  const mealPlans = await databases.listDocuments(
    '648889c9d70e67f298c6',
    '648889d9a5d7e0ba9e8a'
  )

  const currentMontheExcercisePlans = excercisePlans.documents.filter((plan) =>
    plan.date
      ? req.body.month ==
          plan.date.slice(
            plan.date.indexOf(`-${req.body.month}-`) + 1,
            plan.date.indexOf(`-20`)
          ) && plan.userId == req.body.userId
      : false
  )

  const currentMonthMealPlans = mealPlans.documents.filter((plan) =>
    plan.date
      ? req.body.month ==
          plan.date.slice(
            plan.date.indexOf(`-${req.body.month}-`) + 1,
            plan.date.indexOf(`-20`)
          ) && plan.userId == req.body.userId
      : false
  )

  res.status(200).send({ currentMonthMealPlans, currentMontheExcercisePlans })
}
