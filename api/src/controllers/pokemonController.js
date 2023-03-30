const axios = require('axios');
const { Pokemon, Type } = require('../db.js')
const pokeNameExist = require('../helpers/pokeNameExist.js')



let apiPokesData = []//agiliza las respuestas del server

const getApiPokes = async (pag = 0, count = 150) => {
    try {
        if (apiPokesData.length) return apiPokesData
        let apiPokesPromise = []
        const { data } = await axios(`https://pokeapi.co/api/v2/pokemon?offset=${pag}&limit=${count}`)
        data.results.map(async poke => {
            apiPokesPromise.push(axios(poke.url))
        })
        let apiData = await Promise.all(apiPokesPromise)
        apiData.map(poke => {
            let pokeData = poke.data
            apiPokesData.push({
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.other.dream_world.front_default,
                hp: pokeData.stats[0].base_stat,
                attack: pokeData.stats[1].base_stat,
                defense: pokeData.stats[2].base_stat,
                speed: pokeData.stats[3].base_stat,
                height: pokeData.height,
                weight: pokeData.weight,
                types: pokeData.types.map(type => type.type.name)
            })
        })
        return apiPokesData
    } catch (error) {
        throw error
    }

}



getAll = async (req, res) => {
    try {
        const { name } = req.query
        if (name) {//busco por nombre
            getByName(req, res)
        } else {
            const { pag, count } = req.body//por si especifico alguna paginacion
            const apiPokes = await getApiPokes(pag, count)
            let data = apiPokes.map(poke => {
                return { id: poke.id, name: poke.name, image: poke.image, attack: poke.attack, types: poke.types }
            })
            let bdPokes = await Pokemon.findAll({ include: Type })
            if (bdPokes.length) {
                let data2 = bdPokes.map(poke => {
                    return {
                        id: poke.id,
                        name: poke.name,
                        image: poke.image,
                        attack: poke.attack,
                        types: poke.types.map(type => type.name)
                    }
                })
                data = data2.concat(data)
            }
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
        if (isNaN(idPokemon)) {
            //busca en la bd ya que los id de la api son numericos
            let findById = await Pokemon.findByPk(idPokemon)
            if (findById) {
                const getTypes = await findById.getTypes()
                const types = getTypes.map(el => el.dataValues.name)
                let data = findById.dataValues
                data.types = types
                return res.status(200).send(data)
            }

            return res.status(200).send({ message: 'Pokemon not found' })
        } else {
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            pokeData = data
        }
        if (pokeData) {
            return res.status(200).send({
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.other.dream_world.front_default,
                hp: pokeData.stats[0].base_stat,
                attack: pokeData.stats[1].base_stat,
                defense: pokeData.stats[2].base_stat,
                speed: pokeData.stats[3].base_stat,
                height: pokeData.height,
                weight: pokeData.weight,
                types: pokeData.types.map(type => type.type.name)
            })
        } else {
            return res.status(200).send({ message: 'Pokemon not found' })
        }

    } catch (error) {//no reenvio error al cliente porque va con datos de la conexion
        res.status(404).send({ message: 'Pokemon not found, dont insert id manually' })
    }
}

getByName = async (req, res) => {
    try {
        let { name } = req.query
        name = name.toLowerCase()
        //busca en el array de names para prevenir error 404
        if (await pokeNameExist(name)) {
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)

            return res.status(200).send({
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[3].base_stat,
                height: data.height,
                weight: data.weight,
                types: data.types.map(type => type.type.name)
            })
        } else {
            //busca en la bd
            let findByName = await Pokemon.findOne({ where: { name } })

            if (findByName) {
                const getTypes = await findByName.getTypes()
                const types = getTypes.map(el => el.dataValues.name)
                let pokeData = findByName.dataValues
                pokeData.types = types
                return res.status(200).send(pokeData)
            }
        }
        return res.status(200).send({ message: 'Pokemon not found' })
    } catch (error) {

        res.status(404).send(error)
    }
}


postNew = async (req, res) => {
    try {
        let { name, image, hp, attack, defense, speed, height, weight, types } = req.body

        if (!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !types.length) return res.status(400).send({ message: 'Complete all fields' })
        name = name.toLowerCase()
        if (await pokeNameExist(name)) {//evita duplicacion de nombre con la api
            return res.status(400).send({ message: 'Name already exist' })
        }
        let newPoke = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight })

        const poketypes = await Promise.all(
            types.map(async (id) => {
                const type = await Type.findByPk(id)
                await newPoke.addTypes(type)//agrego las relaciones
                return type.dataValues.name
            })
        )

        return res.status(201).send({ id: newPoke.id, name, image, hp, attack, defense, speed, height, weight, types: poketypes })
    } catch (error) {
        res.status(404).send(error)
    }
}




module.exports = { getAll, getById, getByName, postNew }

