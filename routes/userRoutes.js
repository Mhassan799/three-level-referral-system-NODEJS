const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
router.post('/register',userController.register)
router.get('/get-ref',userController.getSingleUser)
router.get('/get',userController.getAllUsers)

module.exports= router