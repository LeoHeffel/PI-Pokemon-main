const express = require('express')
const typesController= require('../controllers/typeController.js')
const typeRouter = express.Router()




module.exports =typeRouter.get('/',typesController.getTypes)
