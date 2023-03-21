//crear los types en archivo aparte
import axios from 'axios'




export const filterCards = (filter) => {
    return {
        type: "FILTER",
        payload: filter
    }
}

export const orderCards = (field, order) => {
    return {
        type: "ORDER",
        payload: {
            field, order
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////






export const showNext = (current) => {
    return {
        type: "SHOW_NEXT",
        payload:current
    }
}
export const showPrevious = (current) => {
    return {
        type: "SHOW_PREVIOUS",
        payload:current
    }
}

export function getPokeDetail(id) {
    return async function (dispatch) {
        try {
            const {data} = await axios.get(`http://localhost:3001/pokemons/${id}`)
            
            dispatch({
                type: "DETAIL_POKE",
                payload: data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}
export function searchPoke(name) {
    return async function (dispatch) {
        try {
            const {data} = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            
            dispatch({
                type: "DETAIL_POKE",
                payload: data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}





export function getPokes() {
    return async function (dispatch) {
        try {
            const {data} = await axios.get(`http://localhost:3001/pokemons/`)
            
            dispatch({
                type: "SET_POKES",
                payload: data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        try {
            const {data} = await axios.get(`http://localhost:3001/types/`)
            dispatch({
                type: "SET_TYPES",
                payload: data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}


export function postPoke(poke) {

    return async function (dispatch) {
        try {
              
            const {data} = await axios.post(`http://localhost:3001/pokemons/`, poke)
            dispatch({
                type: "ADD_POKE",
                payload: data
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}


