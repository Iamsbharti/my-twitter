import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Message.css";
import Searchicon from "@material-ui/icons/Search";
import { getUsersList } from "../../apis/usersApi";
import { Avatar } from "@material-ui/core";
import ChatBox from "./ChatBox";
import { getAllChatAction } from "../../redux/actions/chatAction";
import { connect } from "react-redux";
function PeopleList({ getAllChatAction }) {
  let history = useHistory();
  const [userList, setUserList] = useState([]);
  const [chatBoxContent, setChatBoxContent] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const userId = localStorage.getItem("userId");
  /**api call */
  useEffect(() => {
    async function fetchData() {
      const response = await getUsersList(userId);
      console.log("res::", response);
      setUserList(response.filter((usr) => usr.userId !== userId));
    }
    fetchData();
  }, [userId]);
  /**handle user selction */
  const handleUserSelection = (user) => {
    /**get chat details between the selected user and current user */
    let chatInfo = {
      senderId: user.userId,
      recieverId: userId,
    };
    getAllChatAction(chatInfo);
    setChatBoxContent(!chatBoxContent);
    setChatUser(user);
  };
  return (
    <>
      <div className="peoplelist">
        {localStorage.getItem("authToken") ? (
          <>
            <div className="peoplelistHeader">
              <div className="status__header">
                <h3>Messages</h3>
              </div>
              <div className="peoplelist__input">
                <Searchicon className="peoplelist__search" />
                <input placeholder="Searh for people and groups" type="text" />
              </div>
            </div>
            {userList.map((user, index) => (
              <div
                className="peoplelist__users"
                key={index}
                onClick={() => handleUserSelection(user)}
              >
                <div className="people__avatar">
                  <Avatar src={user.profile.filename}></Avatar>
                </div>
                <div className="peoplelist__body">
                  <div className="people__details">
                    <h5>
                      <span className="people__name">{user.name}</span>
                      <span className="people__verified">
                        <img
                          src={process.env.PUBLIC_URL + "/verified.png"}
                          alt=""
                          className="people__badge"
                        />
                        @{user.username}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          history.push("/login")
        )}
      </div>
      <ChatBox content={chatBoxContent} user={chatUser} />
      <ToastContainer autoClose={1000} hideProgressBar />
    </>
  );
}
const mapStateToProps = ({ user, chat }) => {
  console.log("chat::", chat);
  return { chat };
};
const mapActionToProps = {
  getAllChatAction,
};
export default connect(mapStateToProps, mapActionToProps)(PeopleList);
