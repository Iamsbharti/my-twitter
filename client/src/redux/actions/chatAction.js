import { GET_ALL_CHAT, UPDATE_CURRENT_CHAT } from "./actionTypes";
import * as chatApi from "../../apis/usersApi";

export function getAllChatAction(chatInfo) {
  return async (dispatch) => {
    let allChatResponse = await chatApi.getAllChats(chatInfo);
    dispatch({ type: GET_ALL_CHAT, allChatResponse });
  };
}
export function updateChatAction(chatInfo) {
  return (dispatch) => {
    dispatch({ type: UPDATE_CURRENT_CHAT, chatInfo });
  };
}
