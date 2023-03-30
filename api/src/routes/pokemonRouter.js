const express = require('express')
const pokemonRouter = express.Router()
const pokemonController = require('../controllers/pokemonController.js')


module.exports = pokemonRouter
   
        .get('/', pokemonController.getAll)
        .get('/:idPokemon', pokemonController.getById)
        .post('/',pokemonController.postNew)