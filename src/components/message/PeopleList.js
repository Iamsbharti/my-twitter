import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Message.css";
import Searchicon from "@material-ui/icons/Search";
import { getUsersList } from "../../apis/usersApi";
import { Avatar } from "@material-ui/core";
import ChatBox from "./ChatBox";
function PeopleList() {
  let history = useHistory();
  const [userList, setUserList] = useState([]);
  const [chatBoxContent, setChatBoxContent] = useState(false);
  const userId = localStorage.getItem("userId");
  /**api call */
  useEffect(() => {
    async function fetchData() {
      const response = await getUsersList(userId);
      console.log("res::", response);
      setUserList(response);
    }
    fetchData();
  }, [userId]);
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
              <div className="peoplelist__users" key={index}>
                <div className="people__avatar">
                  <Avatar
                    src={process.env.PUBLIC_URL + "/logo512.png"}
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
      <ChatBox content={chatBoxContent} />
      <ToastContainer autoClose={1000} hideProgressBar />
    </>
  );
}
export default PeopleList;
