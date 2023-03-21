import { useEffect,useState } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getPokeDetail } from '../../redux/actions.js'




const StyledDiv = styled.div`
color: red;
width:50%;
display: inline-block;
`
const StyledImg = styled.img`
border-radius: 10px;
margin-top: 100px
`


export default function Details(props) {
const  {detailId}= useParams()
const [poke,setPoke]= useState(null)

const dispatch = useDispatch()
const pokeDetail = useSelector((state) => state.detail)




const navigate = useNavigate()

useEffect(() => {
  if(detailId)dispatch(getPokeDetail(detailId))
  }, [detailId])

  useEffect(() => {
    if(pokeDetail.id==detailId)setPoke(pokeDetail)
    }, [pokeDetail])



    return (
      <div>
    {poke ? <><StyledDiv>
        <div>
          <h1> {poke.name.toUpperCase()}</h1>
        <hr></hr>
          <h2>ID: {poke.id}</h2>
          <h2>Vida: {poke.hp}</h2>
          <h2>Ataque: {poke.attack}</h2>
          <h2>Defensa: {poke.defense}</h2>
          <h2>Velocidad: {poke.speed}</h2>
          <h2>Altura: {poke.height}</h2>
          <h2>Peso: {poke.weight}</h2>
          <h2>Tipos: {poke.types.toString().replace(/,/g," - ")}</h2>
        </div>
       </StyledDiv>
       <StyledDiv>
          <StyledImg src={poke.image} alt={`imagen de ${poke.name}`} />
       </StyledDiv></>: <h2>Loading...</h2>}
          <button onClick={()=>navigate('/home')}>Volver</button>
      </div>
       
    );
 }