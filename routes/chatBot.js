const express = require('express')
const { chatBot } = require('../controller/chatBot')
const { requireSignin } = require('../middleware/middleware')
const router = express.Router()

router.post('/chatBot', requireSignin, chatBot)

module.exports = router
