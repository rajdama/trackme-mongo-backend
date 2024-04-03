const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

env.config()
app.use(
  cors({
    origin: '*',
  })
)
// https://track-me-frontend.onrender.com
app.use(express.json())
const port = process.env.PORT || 4000

const userRoutes = require('./routes/user')
const mealPlanRoutes = require('./routes/mealPlan')
const excercisePlanRoutes = require('./routes/excercise')
const homePlanRoutes = require('./routes/home')
const chatBot = require('./routes/chatBot')

mongoose
  .connect(`mongodb+srv://rajdama:rajdama1234@cluster0.4ldv9.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database connected')
  })

app.use('/', userRoutes)
app.use('/', mealPlanRoutes)
app.use('/', excercisePlanRoutes)
app.use('/', homePlanRoutes)
app.use('/', chatBot)

app.listen(port, () => {
  console.log(` Server is running on port ${port} `)
})
