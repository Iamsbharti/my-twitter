import React from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../css/Message.css";
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
