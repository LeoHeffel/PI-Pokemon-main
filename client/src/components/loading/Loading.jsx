import React from 'react'
import styled from 'styled-components'

const Loading = () => {
  return (
    <div>
        <h1>Cargando ....</h1>
        <Img src="/img/snorlax.gif" alt="snorlax" />
        
    </div>
  )
}

export default Loading

const Img = styled.img`
width : 25vh;
margin: 20px;
`