const jwt = require('jsonwebtoken')
const { Client, Users, ID } = require('node-appwrite')
const bcrypt = require('bcrypt')

const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
  .setKey(`${process.env.APPWRITE_API_KEY}`)

const users = new Users(client)

exports.signup = async (req, res) => {
  const hashedPassword = await bcrypt.hash(`${req.body.password}`, 10)
  const user = await users.createBcryptUser(
    ID.unique(),
    `${req.body.email}`,
    `${hashedPassword}`,
    `${req.body.firstName}`
  )
  res.status(200).send(user)
}

exports.signin = async (req, res) => {
  const userList = await users.list()
  console.log(userList)
  const usersDetails = userList.users
  let userExist = false
  for (let i = 0; i < usersDetails.length; i++) {
    if (usersDetails[i].email == req.body.email) {
      userExist = true

      const authenticated = await bcrypt.compare(
        req.body.password,
        usersDetails[i].password
      )

      if (authenticated) {
        const token = jwt.sign(
          { email: usersDetails[i].email, password: usersDetails[i].password },
          process.env.JWT_SECRET_KEY,
          { expiresIn: '2h' }
        )

        res.status(200).send({ token: token, user: usersDetails[i] })
      } else {
        res.status(400).send('Password is incorrect')
      }
    }
  }

  if (!userExist) {
    res.status(400).send('User Not Found')
  }
}

exports.getUpdatedUser = async (req, res) => {
  await users.updatePrefs(`${req.body.userId}`, {
    goal: `${req.body.goal}`,
  })
  const user = await users.get(`${req.body.userId}`)
  console.log(user)
  res.status(200).send(user)
}
