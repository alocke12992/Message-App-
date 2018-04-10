import React from 'react';
import {Segment, Divider} from 'semantic-ui-react';
import styled from 'styled-components'


const ChatMessage = ({message}) => (
  <Wrapper>
    <i>{message.email}</i>
    <Divider hidden />
    <Message>{message.body}</Message>
  </Wrapper>
)

const Wrapper = styled(Segment) `
  padding-top: 10px;
  position: relative;
  border: 1px solid #ddd;
  border-top: 0 none;
`

const Message = styled.blockquote`
    border-radius: 20px 20px 20px 20px;
    margin: 0 15px 10px;
    padding: 15px 20px;
    position: relative;
`

export default ChatMessage;
