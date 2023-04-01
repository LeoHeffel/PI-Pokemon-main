const { Pokemon, Type } = require('../db.js')

const saveTypesApi = async () => {
    try {
        const { data } = await axios('https://pokeapi.co/api/v2/type')
        const typeNames = data.results.map(type => { return { name: type.name } })
        let types = await Type.bulkCreate(typeNames)
        return types
    } catch (error) {
        throw error
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
        throw error
    }
}

module.exports = {saveDbPoke, saveTypesApi}