const express = require('express')
const pokemonRouter = express.Router()
const pokemonController = require('../controllers/pokemonController.js')


module.exports = pokemonRouter
   
        .get('/', pokemonController.getAll)
        .get('/name', pokemonController.getByName)
        .get('/:idPokemon', pokemonController.getById)
        .post('/',pokemonController.postNew)