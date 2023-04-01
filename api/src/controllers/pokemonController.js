
const {pokeNameExistApi, pokeNameExist} = require('../handlers/pokeNameExist.js')
const {getAllApiPokes,getApiPokesByIdOrName} = require('../handlers/getApiPokes.js')
const {getAllDbPokes,getDbPokesById,getDbPokesByName} = require('../handlers/getDbPokes.js')
const {saveDbPoke} = require ('../handlers/saveDb.js')



getAll = async (req, res) => {
    try {
        const { name } = req.query
        if (name) {//busco por nombre
            getByName(req, res)
        } else {
            const apiPokes = await getAllApiPokes()
            const dbPokes= await getAllDbPokes()
            let data = dbPokes.concat(apiPokes)
            res.status(200).send(data)
        }
    } catch (error) {
        res.status(400).send(error)
    }
}


getById = async (req, res) => {
    try {
        const { idPokemon } = req.params
        let pokeData 
        if (isNaN(idPokemon))pokeData = await getDbPokesById(idPokemon) //busca en la bd ya que los id de la api son numericos
        else pokeData = await getApiPokesByIdOrName(idPokemon)
        if(pokeData)return res.status(200).send(pokeData)
        else return res.status(200).send({ message: 'Pokemon not found' })

    } catch (error) {
        res.status(404).send(error)
    }
}

getByName = async (req, res) => {
    try {
        let { name } = req.query
        let pokeData
        name = name.toLowerCase()
        //busca en el array de names para prevenir error 404
        if (await pokeNameExistApi(name)) pokeData= await getApiPokesByIdOrName(name) 
        else pokeData = await getDbPokesByName(name)
        if(pokeData)return res.status(200).send(pokeData)
        else return res.status(200).send({ message: 'Pokemon not found' })
    } catch (error) {
        res.status(404).send(error)
    }
}


postNew = async (req, res) => {
    try {
        let { name, image, hp, attack, defense, speed, height, weight, types } = req.body
        if (!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types.length) return res.status(400).send({ message: 'Complete all fields' })
        name = name.toLowerCase()
        if (await pokeNameExist(name)) return res.status(400).send({ message: 'Name already exist' })
        let newPoke = await saveDbPoke({ name, image, hp, attack, defense, speed, height, weight },types)
        return res.status(201).send(newPoke)
    } catch (error) {
        res.status(404).send(error)
    }
}




module.exports = { getAll, getById, getByName, postNew }

