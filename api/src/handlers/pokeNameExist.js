const axios = require('axios');
const { Pokemon } = require('../db.js')
let arrNames = []//evita pedidos repetitivos a la api externa

const pokeNameExistApi = async (name) => {
    try {
        name = name.toLowerCase()
        if (!arrNames.length) {
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=-1}`)
            data.results.map(poke => arrNames.push(poke.name))
        }
        let existent = arrNames.find(element => element === name)
        return existent ? true : false
    } catch (error) {
        throw Error(error)
    }

}

const pokeNameExist = async (name) => {
    try {
        let findByName = await Pokemon.findOne({ where: { name } })
        let existent = await pokeNameExistApi(name)
        return existent || findByName ? true : false
    } catch (error) {
        throw Error(error)
    }

}


module.exports = { pokeNameExistApi, pokeNameExist }

