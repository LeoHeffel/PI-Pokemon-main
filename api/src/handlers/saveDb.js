const { Pokemon, Type ,User} = require('../db.js')
const axios = require('axios');
const saveTypesApi = async () => {
    try {
        const { data } = await axios('https://pokeapi.co/api/v2/type')
        const typeNames = data.results.map(type => { return { name: type.name } })
        let types = await Type.bulkCreate(typeNames)
        return types
    } catch (error) {
 
        throw Error(error)
    }
}





const saveDbPoke = async (poke, types) => {
    try {
        let newPoke = await Pokemon.create(poke)
        const poketypes = await Promise.all(
            types.map(async (id) => {
                const type = await Type.findByPk(id)
                await newPoke.addTypes(type)//agrego las relaciones
                return type.dataValues.name
            })
        )
        return { ...newPoke.dataValues, types: poketypes }
    } catch (error) {
        throw Error(error)
    }
}


const saveDbUser = async (user) => {
    try {
        let newUser = await User.create(user)
        
        return { ...newUser.dataValues}
    } catch (error) {
        throw Error(error)
    }
}

module.exports = {saveDbPoke, saveTypesApi,saveDbUser}