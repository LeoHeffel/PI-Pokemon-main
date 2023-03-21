const initialState = {
    types: [],
    pokes: [],
    filtered: [],
    ordered: [],
    detail: {},
    current: 0,
    showPokes: []
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'ADD_POKE':
            return {
                ...state,
                pokes: [...state.pokes, payload]
            }
        case 'SET_POKES':
            return {
                ...state,
                pokes: payload,
                showPokes: payload.slice(0, 12)
            }
        case 'SET_TYPES':
            return {
                ...state,
                types: payload
            }
        case 'SHOW_NEXT':
            return {
                ...state,
                current: payload,
                showPokes: state.pokes.slice(payload, payload + 12)
            }
        case 'SHOW_PREVIOUS':
            return {
                ...state,
                current: payload,
                showPokes: state.pokes.slice(payload, payload + 12)
            }
        case 'DETAIL_POKE':
            return {
                ...state,
                detail: payload
            }
    

        case 'FILTER':
            return {
                ...state,
                myFavorites: state.allCharacters.filter(char => char.gender === payload)
            }
        case 'ORDER':
            const orderCopy = [...state.allCharacters]
            const ordered = orderCopy.sort((a, b) => {
                if (a.id > b.id) {
                    return payload === 'Ascendente' ? 1 : -1
                }
                if (a.id < b.id) {
                    return payload === 'Ascendente' ? -1 : 1
                }
                else return 0
            })
            return {
                ...state,
                myFavorites: ordered
            }


        default: return { ...state }
    }
}

export default rootReducer