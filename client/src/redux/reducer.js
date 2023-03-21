const initialState = {
    types: [],
    pokes: [],
    unfiltered: [],
    detail: {},
    current: 0,
    showPokes: []
}

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'ADD_POKE':
            return {
                ...state,
                pokes: [...state.pokes, payload],
                unfiltered: [...state.pokes, payload]
            }
        case 'SET_POKES':
            return {
                ...state,
                pokes: payload,
                unfiltered: payload,
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

        case 'ORDER':
            const orderCopy = [...state.pokes]
            let ordered = []
            if (payload.field == 'attack') {
                payload.order === 'upward'?
                ordered = orderCopy.sort((a,b) => a.attack-b.attack)
                : ordered = orderCopy.sort((a,b) => b.attack -a.attack)
            }else{
                payload.order === 'upward'?
                ordered = orderCopy.sort((a,b) => a.name.localeCompare(b.name))
                : ordered = orderCopy.sort((a,b) => b.name.localeCompare(a.name))
            }

            return {
                ...state,
                pokes: ordered,
                showPokes: ordered.slice(0, 12),
            }


        default: return { ...state }
    }
}

export default rootReducer