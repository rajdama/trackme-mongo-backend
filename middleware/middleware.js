const jwt = require('jsonwebtoken')

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const user = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`)
      next()
    } catch (error) {
      if (error.expiredAt) {
        return res.status(400).json({ error: { loggedOut: true } })
      } else {
        return res.status(400).json({ error })
      }
    }
  } else {
    console.log('Authorization required!!')
    return res.status(400).json({ error: 'Authorization required!!' })
  }
}
