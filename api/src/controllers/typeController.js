const { saveTypesApi }= require('../handlers/saveDb.js') 

const { Type } = require('../db.js')



const getTypes = async (req, res) => {
    try {
        let types = await Type.findAll()
       
        if (!types.length) types = await saveTypesApi()
        res.status(200).send(types)
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = { getTypes }