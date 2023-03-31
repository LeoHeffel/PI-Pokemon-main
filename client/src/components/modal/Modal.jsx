import React from 'react'
import styled from 'styled-components'





const Modal = ({message,color, onClose, img}) => {
    return (
        <>
            <Overlay>
                <ModalContainer>
                    <Message style={{color}}>
                        <h2>{message}</h2>
                        <Img src={img} alt="pikachu"  />
                    </Message>
                    <Close onClick={onClose}> X</Close>
                </ModalContainer>
            </Overlay>
        </>
    )
}

export default Modal


const Overlay = styled.div`
    z-index:1000;
    width: 100vw;
    height: 100vh;
    position:absolute;
    top:0;
    left:0;
    
    background: rgba(0,0,0,.5);
    display: flex;
    align-items:center;
    justify-content:center;
`

const ModalContainer = styled.div`
    width: 500px;
    min-height:100px;
    background: white;
    position:relative;
    border-radius: 5px;
    box-shadow: 0px 2px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
    padding: 20px;
`

const Message = styled.div`
    color:#777777;
    margin-bottom:20px
`

const Close = styled.div`
    position:absolute;
    right: 20px;
    top: 20px;
    padding:5px;
    border-radius: 5px;
    cursor: pointer;
    transition: .3s ease all;
    &:hover{
        background: gray;
        color:red;
    }
`

const Img = styled.img`
width: 25vh;
`