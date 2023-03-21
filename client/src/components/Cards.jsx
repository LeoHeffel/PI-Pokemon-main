import Card from './Card.jsx';
import styled from 'styled-components';

const StyledCards = styled.div`
display: flex;
justify-content:space-around;
flex-wrap: wrap
`

export default function Cards(props) {
   const { pokes } = props;
   return (
   <StyledCards>
      {pokes.length?
      pokes.map(poke => <Card key={poke.id}
         id={poke.id}
          name={poke.name}
          image={poke.image}
          types={poke.types}
        />)
        :<h2>Loading ...</h2>}
   </StyledCards>)
}

