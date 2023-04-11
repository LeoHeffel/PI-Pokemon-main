const axios = require('axios');
let apiPokesData = []//agiliza las respuestas del server



const getAllApiPokes = async (pag = 0, count = 150) => {
    try {
        if (apiPokesData.length) return apiPokesData
        let apiPokesPromise = []
        const { data } = await axios(`https://pokeapi.co/api/v2/pokemon?offset=${pag}&limit=${count}`)
        data.results.map( poke => {
            apiPokesPromise.push(axios(poke.url))
        })
        let apiData = await Promise.all(apiPokesPromise)
        apiData.map(poke => {
            let pokeData = poke.data
            apiPokesData.push({
                id: pokeData.id,
                name: pokeData.name,
                image: pokeData.sprites.other.dream_world.front_default,
                attack: pokeData.stats[1].base_stat,
                types: pokeData.types.map(type => type.type.name)
            })
        })
        return apiPokesData
    } catch (error) {
        throw Error(error)
    }

}

const getApiPokesByIdOrName= async (idOrName) => {
    try {
        const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
        if (data) {
            let pokeData = {
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
            }
            return pokeData
        }
        else return null
    } catch (error) {
        throw Error(error)
    }
}




module.exports = { getAllApiPokes, getApiPokesByIdOrName }