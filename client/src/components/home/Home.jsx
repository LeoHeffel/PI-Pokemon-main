
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filterCards, orderCards, getPokes, getTypes, showNext, showPrevious } from '../../redux/actions.js'
import Cards from '../cards/Cards.jsx';
import Loading from '../loading/Loading.jsx';
import Error from '../error/Error.jsx';
import styled from 'styled-components';

function Home() {
  const dispatch = useDispatch()
  const pokesRedux = useSelector((state) => state.showPokes)
  const current = useSelector((state) => state.current)
  const unfiltered = useSelector((state) => state.unfiltered)
  const types = useSelector((state) => state.types)
  const err = useSelector((state) => state.err)


  const [pokes, setPokes] = useState([])
  const [next, setNext] = useState(true)
  const [previous, setPrevious] = useState(false)

  useEffect(() => {
    if (!unfiltered.length) {
      dispatch(getPokes())
      dispatch(getTypes())
    }

  }, [unfiltered])


  useEffect(() => {
    setPokes(pokesRedux)
    if (pokesRedux.length === 12) setNext(true)
    if (pokesRedux.length < 12) setNext(false)
  }, [pokesRedux])

  useEffect(() => {
    if (current >= 12) setPrevious(true)
    else setPrevious(false)
  }, [current])

  const handleNext = () => {
    dispatch(showNext())
  }

  const handlePrevious = () => {
    dispatch(showPrevious())
  }
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


  return (
    <>{err ? <Error error={err} message="No se puede conectar con el servidor"/> :
      !unfiltered.length ? <Loading />
        : <DivHome className="Home">
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
          {pokes.length ? <Cards pokes={pokes}></Cards> :  <Error error={'No se encontró ningún Pokémon'} />}
          <DivHome>
            {previous && <Button onClick={handlePrevious}>Anterior</Button>}
            {(current/12+1)}
            {next && <Button onClick={handleNext}>Siguiente</Button>}
          </DivHome>
        </DivHome>
    }
    </>

  );
}

export default Home;


const Button = styled.button`
  margin:10px;
  box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
	background-color:#ededed;
	border-radius:6px;
	border:1px solid #dcdcdc;
	display:inline-block;
	cursor:pointer;
	color:#777777;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
  &:hover{
    background:linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
	  background-color:#dfdfdf;
  }
  &:active{
    position:relative;
    top:1px;
  }
`
const DivHome = styled.div`
  margin: 20px;
`