import { FILTER, SET_POKES, SET_TYPES, SHOW_NEXT,SHOW_PAGE, SHOW_PREVIOUS, ORDER, DETAIL_POKE, ADD_POKE, ERROR ,CLEAR} from './types.js'

const initialState = {
    types: [],
    pokes: [],
    unfiltered: [],
    detail: {},
    current: 0,
    showPokes: [],
    err: "",
    newPoke:false
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_POKE:
            return {
                ...state,
                newPoke:true,
                pokes: [...state.pokes, payload],
                unfiltered: [...state.pokes, payload]
            }
        case SET_POKES:
            return {
                ...state,
                pokes: payload,
                unfiltered: payload,
                showPokes: payload.slice(0, 12)
            }
        case SET_TYPES:
            return {
                ...state,
                types: payload
            }
        case SHOW_NEXT:
            return {
                ...state,
                current: state.current + 1,
                showPokes: state.pokes.slice((state.current +1)* 12, ((state.current +1)*12)+12)
            }
        case SHOW_PREVIOUS:
            return {
                ...state,
                current: state.current - 1,
                showPokes: state.pokes.slice(((state.current )*12)-12, (state.current )* 12)
            }
            case SHOW_PAGE:
            return {
                ...state,
                current: payload,
                showPokes: state.pokes.slice( payload *12, (payload*12 )+ 12)
            }
        case DETAIL_POKE:
            return {
                ...state,
                detail: payload
            }
        case FILTER:
            if (payload === 'all') {
                return {
                    ...state,
                    pokes: state.unfiltered,
                    showPokes: state.unfiltered.slice(0, 12),
                    current: 0
                }
            }
            let filtered = []
            if (payload === 'custom') filtered = state.unfiltered.filter(poke => isNaN(poke.id))
            else if (payload === 'api') filtered = state.unfiltered.filter(poke => !isNaN(poke.id))
            else filtered = state.unfiltered.filter(poke => poke.types.includes(payload))
            return {
                ...state,
                pokes: filtered,
                showPokes: filtered.slice(0, 12),
                current: 0
            }

        case ORDER:
            const orderCopy = [...state.pokes]
            let ordered = []
            if (payload.field === 'attack') {
                payload.order === 'upward' ?
                    ordered = orderCopy.sort((a, b) => a.attack - b.attack)
                    : ordered = orderCopy.sort((a, b) => b.attack - a.attack)
            } else {
                payload.order === 'upward' ?
                    ordered = orderCopy.sort((a, b) => a.name.localeCompare(b.name))
                    : ordered = orderCopy.sort((a, b) => b.name.localeCompare(a.name))
            }

            return {
                ...state,
                pokes: ordered,
                showPokes: ordered.slice(0, 12),
                current: 0
            }
        case ERROR:
            return {
                ...state,
                err: payload
            }
        case CLEAR:
            return {
                ...state,
                newPokeName:false,
                err: ""
            }

        default: return { ...state }
    }
}

export default rootReducer