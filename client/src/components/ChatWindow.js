import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setFlash} from '../actions/flash';
import {addMessage} from '../actions/messages';
import ChatMessage from './ChatMessage';
import {Segment, Header, Form, TextArea, Button} from 'semantic-ui-react';

class ChatWindow extends React.Component {
  state = {}

  render() {
    return (
      <div>Chat Window</div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
  }
}

export default connect(mapStateToProps)(ChatWindow)