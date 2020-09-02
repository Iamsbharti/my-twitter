import { GET_ALL_CHAT } from "../actions/actionTypes";
import { currentchat } from "../defaultStore";

export function chatReducer(_currentChat = currentchat, action) {
  switch (action.type) {
    case GET_ALL_CHAT:
      return action.allChatResponse;
    default:
      return _currentChat;
  }
}
