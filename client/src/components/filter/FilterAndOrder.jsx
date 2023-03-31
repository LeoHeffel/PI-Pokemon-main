
import { filterCards, orderCards} from '../../redux/actions.js'
import { useDispatch } from 'react-redux';


const FilterAndOrder = ({types}) => {

    const dispatch = useDispatch()
    const handleFilter = (e) => {
        const { value } = e.target
        if (value !== 'filter') dispatch(filterCards(value))
      }
    
      const handleOrder = (e) => {
        let field, order
        switch (e.target.value) {
          case 'alf':
            field = 'name'
            order = 'upward'
            break;
          case 'alfInv':
            field = 'name'
            order = 'downward'
            break;
          case 'attk':
            field = 'attack'
            order = 'upward'
            break;
          case 'attkInv':
            field = 'attack'
            order = 'downward'
            break;
          default:
            field = null
            order = null
            break;
        }
        if (field && order) dispatch(orderCards(field, order))
      }
    
    

    return (<>
        <select name='filter' onClick={handleFilter}>
            <option value={'filter'} disabled>FILTRO</option>
            <option value={'all'}>TODOS</option>
            <option value={'custom'}>PERSONALIZADOS</option>
            <option value={'api'}>ORIGINALES</option>
            {types.length && types.map(type => <option key={type.id} value={type.name}>{type.name.toUpperCase()}</option>)}
        </select>
        <select name='order' onClick={handleOrder}>
            <option value={''} disabled >ORDEN </option>
            <option value={'alf'}>ALFABETICO ↑</option>
            <option value={'alfInv'}>ALFABETICO ↓</option>
            <option value={'attk'}>ATAQUE ↑</option>
            <option value={'attkInv'}>ATAQUE ↓ </option>
        </select>
    </>)
}

export default FilterAndOrder

