import { GET_ALL_CHAT } from "./actionTypes";
import * as chatApi from "../../apis/usersApi";

export function getAllChatAction(chatInfo) {
  console.log("get all chat action:", chatInfo);
  return async (dispatch) => {
    let getChatResponse = await chatApi.getAllChats(chatInfo);
    dispatch({ type: GET_ALL_CHAT, getChatResponse });
  };
}
