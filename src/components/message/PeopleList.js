import React from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Message.css";
import Searchicon from "@material-ui/icons/Search";
function PeopleList() {
  let history = useHistory();
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
          </>
        ) : (
          history.push("/login")
        )}
      </div>
      <ToastContainer autoClose={1000} hideProgressBar />
    </>
  );
}
export default PeopleList;
