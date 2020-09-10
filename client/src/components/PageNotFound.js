import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
export default function PageNotFound() {
  const pageStyle = {
    margin: "40px",
    padding: "40px",
  };
  const btnStyle = {
    backgroundColor: "#30C5FF",
    border: "none !important",
    color: "white !important",
    fontWeight: "900",
    fontSize: "19px",
    textTransform: "inherit !important",
    height: "39px !important",
    borderRadius: "11px !important",
    marginTop: "30px",
  };
  let history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div style={pageStyle}>
      <img
        src="https://media.giphy.com/media/xTiN0L7EW5trfOvEk0/giphy.gif"
        alt=""
        style={{ borderRadius: "10px" }}
      />
      <br />
      <Button style={btnStyle} onClick={handleClick}>
        Start Over!!!
      </Button>
    </div>
  );
}
