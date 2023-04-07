const { Router } = require('express');
const pokemonRouter = require('./pokemonRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter.js')

const router = Router();

router.use('/pokemons', pokemonRouter)
    .use('/types', typeRouter)
    .use('/user', userRouter)

module.exports = router;
