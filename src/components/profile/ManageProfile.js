import React, { useState, useEffect } from "react";
import "../../css/Profile.css";
import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
const ManageProfile = ({ userInfo, handleGoBack, handleSaveProfile }) => {
  const [userProfile, setProfile] = useState({});
  useEffect(() => {
    setProfile(userInfo);
  }, [userInfo]);
  const handleChange = (event) => {
    console.log("handle chag");
    const { name, value } = event.target;
    console.log("name,val:", name, value);
    setProfile({
      ...userProfile,
      [name]: value,
    });
  };

  return (
    <div className="profile">
      <div className="profileHeader">
        <div className="status__header">
          <ArrowBackIcon
            fontSize="large"
            className="status__icon"
            onClick={handleGoBack}
          />
          <h3>Edit Profile for {userInfo.name}</h3>
        </div>
        <div className="profile__coverpic">
          <img
            src={process.env.PUBLIC_URL + "/coverpic.jpeg"}
            className="coverPic"
            alt=""
          />
          <img
            className="manage__user__avatar"
            src={process.env.PUBLIC_URL + "/saurabh (2).jpg"}
            alt=""
          />
          <Button
            className="btn"
            onClick={() => handleSaveProfile(userProfile)}
          >
            Save Profile
          </Button>
        </div>
      </div>
      <div className="manage__header__userinfo">
        <div className="manage__header__username">
          <input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleChange}
          />
        </div>
        <div className="manage__header__bio">
          <input
            type="text"
            value={userProfile.bio}
            onChange={handleChange}
            name="bio"
          />
        </div>
        <div className="manage__header__location">
          <input
            type="text"
            value={userProfile.country}
            onChange={handleChange}
            name="country"
          />
        </div>
        <div className="manage__header__website">
          <input
            type="text"
            value={userProfile.website && ""}
            placeholder="Add Your website https://"
            onChange={handleChange}
            name="website"
          />
        </div>
        <div className="manage__header__birthday">
          <input
            type="text"
            value={userProfile.birthday && userProfile.birthday}
            onChange={handleChange}
            name="birthday"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
