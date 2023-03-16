const axios = require('axios');
const { Type } = require('../db.js')

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

const getTypes = async (req, res) => {
try {
     let types = await Type.findAll()
    if (!types.length) types = await saveTypesApi()
    res.status(200).send({types } )
} catch (error) {
    res.status(400).send({message:error.message } )
}
   
}

module.exports = { getTypes }