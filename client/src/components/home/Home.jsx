
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPokes, getTypes } from '../../redux/actions.js'
import Cards from '../cards/Cards.jsx';
import Loading from '../loading/Loading.jsx';
import Error from '../error/Error.jsx';
import styled from 'styled-components';
import Pagination from '../pagination/Pagination.jsx';
import FilterAndOrder from '../filter/FilterAndOrder.jsx';

function Home() {
  const dispatch = useDispatch()
  const pokesRedux = useSelector((state) => state.showPokes)
  const unfiltered = useSelector((state) => state.unfiltered)
  const types = useSelector((state) => state.types)
  const err = useSelector((state) => state.err)


  const [pokes, setPokes] = useState([])

  useEffect(() => {
    if (!unfiltered.length) {
      dispatch(getPokes())
      dispatch(getTypes())
    }
  }, [unfiltered])

  useEffect(() => {
    setPokes(pokesRedux)
  }, [pokesRedux])


  return (
    <>{err ? <Error error={err} message="No se puede conectar con el servidor" /> :
      !unfiltered.length ? <Loading />
        : <DivHome >
          <FilterAndOrder types={types} />
          {pokes.length ? <Cards pokes={pokes} /> : <Error error={'No se encontró ningún Pokémon'} message={'Prueba con otro filtro'}/>}
          <DivHome>
            <Pagination />
          </DivHome>
        </DivHome>
    }
    </>

  );
}

export default Home;



const DivHome = styled.div`
  margin: 20px;
`