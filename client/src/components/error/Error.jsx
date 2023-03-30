import styled from "styled-components"
import Modal from '../modal/Modal.jsx';




const Error = ({error, message}) => {



const handleClic=()=>{
  
  window.location= '/home'
  
}



  return (<>
    <Modal message={message}  img={'/img/pika.png'} onClose={handleClic}/>
    <Div>
        <h2>{error}</h2>
       
      </Div>
     
  </>)
}

export default Error

const Div = styled.div`
margin-top:50px;
`

