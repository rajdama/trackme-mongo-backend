const { Users, Client } = require('node-appwrite')
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')

const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
  .setKey(`${process.env.APPWRITE_API_KEY}`)

const users = new Users(client)

exports.sendEmails = async () => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rajdama1729@gmail.com',
      pass: 'nokwprpvmrxjxaxx',
    },
  })

  const userList = await users.list()
  const usersDetails = userList.users

  schedule.scheduleJob({ hour: 21, minute: 10 }, function () {
    usersDetails.forEach((item) => {
      let mailBreakfastDetails = {
        from: 'rajdama1729@gmail.com',
        to: `${item.email}`,
        subject: 'Time For Dinner',
        text: 'Hey Pal! I its time you have your breakfast if you have not done yet, if you have already had comeon track it and continue your progress',
      }
      mailTransporter.sendMail(mailBreakfastDetails, function (err, data) {
        if (err) {
          console.log('Error Occurs')
        } else {
          console.log('Email sent successfully')
        }
      })
    })
  })

  schedule.scheduleJob({ hour: 21, minute: 12 }, function () {
    usersDetails.forEach((item) => {
      let mailBreakfastDetails = {
        from: 'rajdama1729@gmail.com',
        to: `${item.email}`,
        subject: 'Time For BreakFast',
        text: 'Hey Pal! I its time you have your breakfast if you have not done yet, if you have already had comeon track it and continue your progress',
      }
      mailTransporter.sendMail(mailBreakfastDetails, function (err, data) {
        if (err) {
          console.log('Error Occurs')
        } else {
          console.log('Email sent successfully')
        }
      })
    })
  })
}
