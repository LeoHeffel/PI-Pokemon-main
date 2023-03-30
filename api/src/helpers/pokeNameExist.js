const axios = require('axios');
const { Pokemon } = require('../db.js')
let arrNames = []//evita pedidos repetitivos a la api externa

const pokeNameExist = async (name) => {
    name = name.toLowerCase()
    if (!arrNames.length) {
        const { data } = await axios(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=-1}`)
        data.results.map(poke => arrNames.push(poke.name))
    }
    let findByName = await Pokemon.findOne({ where: { name } })
    let existent = arrNames.find(element => element === name)
    return existent || findByName ? true : false
}
module.exports = pokeNameExist

