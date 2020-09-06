import React, { useState, useEffect } from "react";
import "../../css/Profile.css";
import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { baseUrl } from "../../apis/apiUtils";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
const ManageProfile = ({
  userInfo,
  handleGoBackToProfile,
  handleSaveProfile,
}) => {
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
            onClick={handleGoBackToProfile}
          />
          <h3>Edit Profile for {userInfo.name}</h3>
        </div>
        <div className="profile__coverpic">
          <img
            src={`${baseUrl}/api/v1/user/fetchPicture?filename=${
              userInfo.coverPicture.filename
            }&authToken=${localStorage.getItem("authToken")}`}
            className="coverPic"
            alt=""
          />
          <img
            className="manage__user__avatar"
            src={`${baseUrl}/api/v1/user/fetchPicture?filename=${
              userInfo.profile.filename
            }&authToken=${localStorage.getItem("authToken")}`}
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
        <div className="upload_cover">
          <div>
            <label for="file-upload" class="custom-file-upload">
              <CloudUploadIcon />
              <p className="coverpic_label">Change Cover Pic</p>
            </label>
            <input id="file-upload" type="file" />
          </div>
          <div>
            <label for="file-upload" class="custom-file-upload">
              <CloudUploadIcon />
              <p className="coverpic_label">Change Profile Pic</p>
            </label>
            <input id="file-upload" type="file" />
          </div>
        </div>
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
            placeholder="Birth Day"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
