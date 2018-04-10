import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import {addMessage} from '../actions/messages';
import ChatMessage from './ChatMessage';
import styled from 'styled-components'
import {Segment, Form, TextArea, Button, Divider, Grid} from 'semantic-ui-react';

class ChatWindow extends React.Component {
  state = {newMessage: ''}

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(setFlash('Welcome to iMessage', 'blue'))
  }

  displayMessages = () => {
    let {messages} = this.props;

    if (messages.length)
      return messages.map((message, i) => {
        return (<ChatMessage key={i} message={message} />)
      });
    else
      return (
        <Segment inverted textAlign='center'>
          <Header as='h1'>No Chat Messages Yet.</Header>
        </Segment>
      )
  }

  setMessage = (e) => {
    this.setState({newMessage: e.target.value});
  }

  addMessage = (e) => {
    e.preventDefault();
    let {dispatch, user: {email}} = this.props;

    dispatch(addMessage({email, body: this.state.newMessage}));
    this.setState({newMessage: ''});
  }
  render() {
    return (
      <Grid centered columns={1}>
        <Grid.Column width={8}>
          <Header><Left>Messages</Left>Name<Right>Contact</Right></Header>
          <Wrapper>
            {this.displayMessages()}
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
        </Grid.Column>
      </Grid>
    )
  }
}

const Wrapper = styled(Segment) `
  padding-top: 10px;
  position: relative;
  border: 1px solid #ddd;
  border-top: 0 none;
  background-color: #fff; 
  overflow-y: scroll; 
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
  background: #eee;
  border: 1px solid #ccc;
  border-bottom: 1px solid #bbb;
  box-shadow: 0 1px 2px rgba(1,1,1,0.2);
  height: 60px;
  text-align: center;
  font-size: 20px;
  line-height: 58px;
  white-space: nowrap;
`
const MessageInput = styled(Segment) `
    border-radius: 10px;
    width: 80%;
    margin: '0 auto';
    padding: '10px';
`

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
  }
}

export default connect(mapStateToProps)(ChatWindow)
