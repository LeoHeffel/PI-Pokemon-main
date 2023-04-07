
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Landing = () => {

  return (
    <LandingDiv className='landing'>
        <h1> P.I. Pokemon LeoHeffel</h1>
       <Link to={'/login'}> <Img src="/img/logo.png" alt="logo" />	</Link>
    </LandingDiv>
  )
}

export default Landing

const LandingDiv = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/img/bg.jpg');
`

const Img = styled.img`
  width : 50vh;
  margin: 200px;
  float:left;
  &:hover{
    transform: translateY(-3%) 
  }
`

