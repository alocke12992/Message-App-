const isTyping = ( state = [], action ) => {
  switch (action.type) {
    case 'START_TYPING':
      return [...new Set([...state, action.id])]
    case 'STOP_TYPING':
      return state.filter( u => u !== action.id )
    default:
      return state;
  }
}

export default isTyping;
