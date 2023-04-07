
const { Pokemon, Type } = require('../db.js')


const getAllDbPokes = async () => {
    try {
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
            return data2
        } else return []
    } catch (error) {
        throw Error(error)
    }
}



const getDbPokesById = async (idPokemon) => {
    try {
        let find = await Pokemon.findByPk(idPokemon,{ include: Type })
        return  organize(find)
    } catch (error) {
        throw Error(error)
    }
}

const getDbPokesByName = async (name) => {
    try {
        let find = await Pokemon.findOne({ where: { name },include: Type })
         return  organize(find)
    } catch (error) {
        throw Error(error)
    }
}


const organize = (poke)=>{
    try {
        if (poke) {
            let pokeData = {
            id: poke.id,
            name: poke.name,
            image: poke.image,
            hp: poke.hp,
            defense:poke.defense,
            speed:poke.speed,
            height:poke.height,
            weight: poke.weight,
            attack: poke.attack,
            types: poke.types.map(type => type.name)
        }
           return pokeData
        }
        return null
    } catch (error) {
        throw Error(error)
    }

}
module.exports = {getAllDbPokes,getDbPokesById, getDbPokesByName}