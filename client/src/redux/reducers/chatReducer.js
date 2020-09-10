import { GET_ALL_CHAT, UPDATE_CURRENT_CHAT } from "../actions/actionTypes";
import { currentchat } from "../defaultStore";

export function chatReducer(_currentChat = currentchat, action) {
  switch (action.type) {
    case GET_ALL_CHAT:
      return action.allChatResponse;
    case UPDATE_CURRENT_CHAT:
      return [..._currentChat, action.chatInfo];
    default:
      return _currentChat;
  }
}
