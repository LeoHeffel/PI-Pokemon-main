import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { getPokeDetail } from '../../redux/actions.js'
import Loading from "../loading/Loading.jsx";


export default function Details() {
  const { detailId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const pokeDetail = useSelector((state) => state.detail)
  const [poke, setPoke] = useState(null)

  useEffect(() => {
    if (detailId) dispatch(getPokeDetail(detailId))
  }, [detailId])

  useEffect(() => {
    if (pokeDetail.id == detailId) setPoke(pokeDetail)//es para prevenir que se muestre el detalle anterior mientras carga
  }, [pokeDetail])


  return (<>
    <Container>
      {poke ? <><StyledDiv>
        <h1> {poke.name}</h1>
        <hr></hr>
        <DivStats>
          <h2><Img src="/img/key.png" /> ID: {poke.id}</h2>
          <h2> <Img src="/img/hp.png" />  Vida: {poke.hp}</h2>
          <h2><Img src="/img/attack.png" />  Ataque: {poke.attack}</h2>
          <h2> <Img src="/img/defense.png" /> Defensa: {poke.defense}</h2>
          <h2> <Img src="/img/speed.png" /> Velocidad: {poke.speed}</h2>
          <h2><Img src="/img/height.png" /> Altura: {poke.height}</h2>
          <h2><Img src="/img/weight.png" />  Peso: {poke.weight}</h2>
          <h2><Img src="/img/type.png" /> {poke.types.length > 1 ? 'Tipos' : 'Tipo'}: {poke.types.toString().replace(/,/g, " - ")}</h2>
        </DivStats>
        <StyledImg src={poke.image} alt={`imagen de ${poke.name}`} />
      </StyledDiv>
      </> : <Loading />}
    </Container>
    <Button onClick={() => navigate('/home')}>Volver</Button>

  </>);
}

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

const StyledDiv = styled.div`
  color: #253f9a;
  width:50%;
  display: inline-block;
  border: solid gray 2px;
  border-radius: 30px;
  margin:20px;
  position:relative;
  box-shadow: 5px 4px 6px 0px #253f9a, 5px 5px 10px 1px #000;
  text-transform: uppercase;
`
const StyledImg = styled.img`
  max-height:350px;
  width:25vw;
  position: absolute;
  bottom: 20px;
  right:20px
`


const Container = styled.div`
  display : flex;
  min-width: 1000px;
  margin-top: 10px;
  margin-left:auto;
  margin-right:auto;
  justify-content:center;
`
const DivStats = styled.div`
  margin-left: 30px;
  border-radius: 10px;
  text-align: left; 
  float: left;
  color: black;
  text-transform: capitalize;
`

const Img = styled.img`
  height: 20px;
`