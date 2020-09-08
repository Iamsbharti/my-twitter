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
import { baseUrl } from "../../apis/apiUtils";
import CloseIcon from "@material-ui/icons/Close";
import ListIcon from "@material-ui/icons/List";
function PeopleList({ getAllChatAction }) {
  let history = useHistory();
  const [userList, setUserList] = useState([]);
  const [chatBoxContent, setChatBoxContent] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const [toggleFriendList, setToggleList] = useState(true);
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
    /**close the friendlist bar for mobile devices */
    if (width <= 800) {
      setToggleList(true);
    }
  };
  /**responsive peoplelist */

  const handleDisplayFriendList = () => {
    setToggleList(!toggleFriendList);
  };
  /**compute the current window size */
  /**hide  for mobile device */
  const { height, width } = useWindowDimensions();
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    );
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
  }

  let responsiveSideBar = (
    <div>
      <div className="friendList__responsive">
        <div className="friendList_responsive_header">
          <p>Friend List</p>
          <span>
            <CloseIcon onClick={handleDisplayFriendList} />
          </span>
        </div>
        <div className="friendList_responsive__userinfo">
          {userList.map((user, index) => (
            <div
              className="peoplelist__users"
              key={index}
              onClick={() => handleUserSelection(user)}
            >
              <div className="people__avatar">
                <Avatar
                  src={`${baseUrl}/api/v1/user/fetchPicture?filename=${
                    user.profile.filename
                  }&authToken=${localStorage.getItem("authToken")}`}
                ></Avatar>
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
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div hidden={toggleFriendList}>{responsiveSideBar}</div>
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
                  <Avatar
                    src={`${baseUrl}/api/v1/user/fetchPicture?filename=${
                      user.profile.filename
                    }&authToken=${localStorage.getItem("authToken")}`}
                  ></Avatar>
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

      <div className="responsive__friendList_menu">
        <ListIcon fontSize="large" onClick={handleDisplayFriendList} />
      </div>

      <ChatBox content={chatBoxContent} user={chatUser} />
      <ToastContainer autoClose={1000} hideProgressBar />
    </>
  );
}
const mapStateToProps = ({ user, chat }) => {
  return { chat };
};
const mapActionToProps = {
  getAllChatAction,
};
export default connect(mapStateToProps, mapActionToProps)(PeopleList);
