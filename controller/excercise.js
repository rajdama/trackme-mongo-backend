const { Client, ID, Databases } = require('node-appwrite')

const client = new Client()
  .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
  .setKey(`${process.env.APPWRITE_API_KEY}`)

const databases = new Databases(client)

const fetchDocumentByIdAndDate = async (userId, date) => {
  const allDocuments = await databases.listDocuments(
    '648889c9d70e67f298c6',
    '64888a47f167444cc8f4'
  )

  const userDocument = await allDocuments.documents.filter(
    (document) => document.userId == userId && document.date == date
  )
  return userDocument
}

exports.excercisePlanExist = async (req, res) => {
  const userDocument = await fetchDocumentByIdAndDate(
    req.body.userId,
    req.body.date
  )

  if (userDocument?.length != 0) {
    res.status(200).send(true)
  } else {
    res.status(200).send(false)
  }
}

exports.createExcercisePlan = async (req, res) => {
  const excercisePlan = [req.body.excercise]

  const stringifidExcercisePlan = JSON.stringify(excercisePlan)

  const document = await databases.createDocument(
    '648889c9d70e67f298c6',
    '64888a47f167444cc8f4',
    ID.unique(),
    {
      userId: `${req.body.userId}`,
      excercisePlan: stringifidExcercisePlan,
      date: req.body.date,
    }
  )

  res.status(200).send(excercisePlan)
}

exports.updateExcercisePlan = async (req, res) => {
  const excercisePlan = await fetchDocumentByIdAndDate(
    req.body.userId,
    req.body.date
  )
  const stringifiedExcercisePlan = excercisePlan[0].excercisePlan
  const parsedExcercisePlan = JSON.parse(stringifiedExcercisePlan)
  parsedExcercisePlan.push(req.body.excercise)

  const document = await databases.updateDocument(
    '648889c9d70e67f298c6',
    '64888a47f167444cc8f4',
    `${excercisePlan[0].$id}`,
    {
      userId: `${req.body.userId}`,
      excercisePlan: JSON.stringify(parsedExcercisePlan),
    }
  )

  res.status(200).send(parsedExcercisePlan)
}

exports.getExcercisePlan = async (req, res) => {
  let userExcercisePlan = await fetchDocumentByIdAndDate(
    req.body.userId,
    req.body.date
  )

  if (userExcercisePlan.length != 0) {
    const parsedExcercisePlan = JSON.parse(userExcercisePlan[0].excercisePlan)
    res.status(200).send(parsedExcercisePlan)
  } else {
    res.status(200).send([])
  }
}
