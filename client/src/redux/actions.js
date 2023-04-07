import {FILTER, SET_POKES,SET_TYPES,SHOW_NEXT,SHOW_PREVIOUS, SHOW_PAGE,ORDER,DETAIL_POKE,ADD_POKE,ERROR, CLEAR, ADD_USER} from './types.js'
import axios from 'axios'


export const filterCards = (filter) => {
    return {
        type: FILTER,
        payload: filter
    }
}

export const orderCards = (field, order) => {
    return {
        type: ORDER,
        payload: {
            field, order
        }
    }
}

export const showNext = () => {
    return {
        type: SHOW_NEXT,
    }
}

export const showPage= (page) => {
    return {
        type: SHOW_PAGE,
        payload:page
    }
}
export const showPrevious = () => {
    return {
        type: SHOW_PREVIOUS,
    }
}

export const clearError = () => {
    return {
        type: CLEAR,
    }
}

export const setUser = (user) => {
    return {
        type: ADD_USER,
        payload: user,
    }
}

export function getPokeDetail(id) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`)
            dispatch({
                type: DETAIL_POKE,
                payload: data
            })
        }
        catch (error) {
            dispatch({
                type:ERROR,
                payload:error.message
            })
            
        }
    }
}
export function searchPoke(name) {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/pokemons?name=${name}`)

            dispatch({
                type: DETAIL_POKE,
                payload: data
            })
        }
        catch (error) {
            dispatch({
                type:ERROR,
                payload:error.message
            })
          
        }
    }
}





export function getPokes() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/pokemons/`)

            dispatch({
                type: SET_POKES,
                payload: data
            })
        }
        catch (error) {
            dispatch({
                type:ERROR,
                payload:error.message
            })
       
        }
    }
}

export function getTypes() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/types/`)
            dispatch({
                type: SET_TYPES,
                payload: data
            })
        }
        catch (error) {
            dispatch({
                type:ERROR,
                payload:error.message
            })
      
        }
    }
}


export function postPoke(poke) {

    return async function (dispatch) {
        try {
            const { data } = await axios.post(`http://localhost:3001/pokemons/`, poke)
            dispatch({
                type: ADD_POKE,
                payload: data
            })
        }
        catch (error) {
            dispatch({
                type:ERROR,
                payload:error.response.data.message
            })
        
        }
    }
}


export function LoginOrRegister(user,LOR) {

    return async function (dispatch) {
        try {
            const { data } = await axios.post(`http://localhost:3001/user/${LOR}`, user)
            dispatch({
                type: ADD_USER,
                payload: data
            })
        }
        catch (error) {
            dispatch({
                type:ERROR,
                payload:error.response.data.message
            })
        }
    }
}

