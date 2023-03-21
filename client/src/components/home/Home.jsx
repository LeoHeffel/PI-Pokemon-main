
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterCards, orderCards, getPokes, getTypes, showNext, showPrevious } from '../../redux/actions.js'

import Cards from '../cards/Cards.jsx';

function Home() {
  const dispatch = useDispatch()
  const pokesRedux = useSelector((state) => state.showPokes)
  const current = useSelector((state) => state.current)
  const types = useSelector((state) => state.types)

  const [pokes, setPokes] = useState([])
  const [next, setNext] = useState(true)

  const [previous, setPrevious] = useState(false)

  useEffect(() => {
    dispatch(getPokes())
    dispatch(getTypes())
  }, [])

  useEffect(() => {
    setPokes(pokesRedux)
    if (pokesRedux.length == 12) setNext(true)
    if (pokesRedux.length < 12) setNext(false)
  }, [pokesRedux])




  useEffect(() => {
    if (current >= 12) setPrevious(true)
    else setPrevious(false)
  }, [current])

  const handleNext = () => {
    dispatch(showNext(current + 12))
  }

  const handlePrevious = () => {
    dispatch(showPrevious(current - 12))
  }
  const handleFilter = (e) => {
    const { value } = e.target

    dispatch(filterCards(value))
  }

  const handleOrder = (e) => {
    const { value } = e.target
    let field, order
    switch (value) {
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
    if(field && order)dispatch(orderCards(field, order))
    
  }








  return (
    <div className="App">

      <select name='filter' onClick={handleFilter}>
        <option value={'all'}>TODOS</option>
        <option value={'custom'}>PERSONALIZADOS</option>
        <option value={'api'}>ORIGINALES</option>
        {types.length && types.map(type => <option key={type.id} value={type.name}>{type.name.toUpperCase()}</option>)}
      </select>
      <select name='order' onClick={handleOrder}>
      <option value={''}>ORDEN </option>
        <option value={'alf'}>ALFABETICO ↑</option>
        <option value={'alfInv'}>ALFABETICO ↓</option>
        <option value={'attk'}>ATAQUE ↑</option>
        <option value={'attkInv'}>ATAQUE ↓ </option>
      </select>




      {pokes.length ? <Cards pokes={pokes}></Cards> : <h2> no se encotraron  Pokes!!</h2>}

      {previous && <button onClick={handlePrevious}>Anterior</button>}
      {next && <button onClick={handleNext}>Siguiente</button>}


    </div>
  );
}

export default Home;
