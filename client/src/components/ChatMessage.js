import React, {Fragment} from 'react';
import styled from 'styled-components'


const ChatMessage = ({message}) => (
  <Fragment>
    <Name>{message.email}</Name>
    <Message>{message.body}</Message>
  </Fragment>
)

const Message = styled.blockquote`
    border-radius: 20px 20px 20px 20px !important;
    margin: 0 15px 10px !important;
    padding: 15px 20px !important;
    position: relative !important;
    background: #2095FE !important;
    color: #fff !important;
    width: 55px;
    wight: 40px; 
`
const Name = styled.h6`
  font-family: "Helvetica Neue" !important;
	font-size: 15px !important;
  font-weight: normal !important;
  color: 'gray' !important;
`

export default ChatMessage;
