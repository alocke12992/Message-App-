import React from 'react';
import {
  Segment,
  Form,
  TextArea,
  Button,
  Grid,
  Divider,
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import axios from 'axios';
import {setFlash} from '../actions/flash';
import {addMessage, getMessages} from '../actions/messages';
import ChatMessage from './ChatMessage';
import styled from 'styled-components'
import {startTyping, stopTyping} from '../actions/isTyping';

class ChatWindow extends React.Component {
  state = {newMessage: ''}

  componentDidMount() {
    const {dispatch} = this.props;
    window.MessageBus.start()
    dispatch(setFlash('Welcome To My Chat App', 'green'))
    dispatch(getMessages())

    window.MessageBus.subscribe('/typing', (data) => {
      data.typing ?
        dispatch(startTyping(data.id))
        :
        dispatch(stopTyping(data.id))
    })
    window.MessageBus.subscribe('/chat_channel', (data) => {
      dispatch(addMessage(JSON.parse(data)));
    });
  }

  componentWillUnmount() {
    window.MessageBus.unsubscribe('/chat_channel')
    window.MessageBus.unsubscribe('/typing')
  }

  byTime = (x, y) => {
    if (x.created_at > y.created_at)
      return 1
    if (x.created_at < y.created_at)
      return -1
    return 0
  }

  displayMessages = () => {
    const {messages} = this.props;
    if (messages.length)
      return messages.sort(this.byTime).map((message, i) => {
        return <ChatMessage key={i} message={message} />
      })
    else
      return (
        <Header as="h1">No messages yet</Header>
      )
  }

  startTyping = () => {
    axios.post('/api/typing', {typing: true})
      .then(({headers}) => this.props.dispatch({type: 'HEADERS', headers}))
  }

  stopTyping = () => {
    axios.post('/api/typing')
      .then(({headers}) => this.props.dispatch({type: 'HEADERS', headers}))
  }

  addMessage = (e) => {
    e.preventDefault();
    this.stopTyping()
    const {dispatch, user: {email}} = this.props;
    const {newMessage} = this.state;
    const message = {email, body: newMessage};

    axios.post('/api/messages', message)
      .then(({headers}) => {
        dispatch({type: 'HEADERS', headers})
        this.setState({newMessage: ''})
      })
      .catch(({headers}) => {
        dispatch({type: 'HEADERS', headers})
        dispatch(setFlash('Error Posting Messages', 'red'))
      });
  }

  setMessage = (e) => {
    const {newMessage} = this.state
    const {value} = e.target
    if (newMessage && !value)
      // Stopped typing
      this.stopTyping()
    else
      // Is typing
      this.startTyping()
    this.setState({newMessage: e.target.value})
  }

  render() {
    const {isTyping} = this.props;
    return (
      <Grid centered columns={1}>
        <Grid.Column width={8}>
          <Window>
            <Header><Left>Messages</Left>Name<Right>Contact</Right></Header>
            <Wrapper>
              {this.displayMessages()}
              {isTyping.length > 0 && <Header as="h5">Someone is typing</Header>}
            </Wrapper>
            <Divider />
            <MessageInput>
              <Form onSubmit={this.addMessage}>
                <TextArea
                  value={this.state.newMessage}
                  onChange={this.setMessage}
                  placeholder="iMessage"
                  autoFocus
                  required
                ></TextArea>
                <Segment basic textAlign='center'>
                  <Button type='submit' primary>Send Message</Button>
                </Segment>
              </Form>
            </MessageInput>
          </Window>
        </Grid.Column>
      </Grid>
    )
  }
}


const Window = styled.div`
    background: none 0 0 #fff !important;
    color: #FFFFFF !important;
    font-family: "Open Sans" !important;
    line-height: 26px !important;
    width: 750px !important;
    height: 400px !important;
    margin: 0 auto !important;
    position: relative !important;
`

const Wrapper = styled.div`
  padding-top: 10px;
  position: relative;
  border: 1px solid #ddd;
  border-top: 0 none;
  background-color: #fff; 
  overflow-y: scroll; 
  height: 450px;
`

const Left = styled.span`
  position: absolute;
  top: 0;
  left: 35px;
  font-size: 18px;
`

const Right = styled.span`
  position: absolute;
  top: 0;
  right: 15px;
  font-size: 18px;
`

const Header = styled.header`
  color: #2095FE;
  background: #fff;
  border: 1px solid #ccc;
  border-bottom: 1px solid #bbb;
  box-shadow: 0 1px 2px rgba(1,1,1,0.2);
  height: 60px;
  text-align: center;
  font-size: 20px;
  line-height: 58px;
  white-space: nowrap;
`
const MessageInput = styled.div`
    border-radius: 10px;
    width: 80%;
    margin: '0 auto';
    padding: '10px';
`

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
    isTyping: state.isTyping,
  }
}

export default connect(mapStateToProps)(ChatWindow)
