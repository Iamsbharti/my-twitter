import React, { useState, useEffect } from "react";
import "../../css/Profile.css";
import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { baseUrl } from "../../apis/apiUtils";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";

const ManageProfile = ({
  userInfo,
  handleGoBackToProfile,
  handleSaveProfile,
  handleUpdatePictures,
}) => {
  const [userProfile, setProfile] = useState({});
  const [fileType, setFileType] = useState("");
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
  /**upload handler */
  const handleFileChange = (event) => {
    console.log(event.target);
    setFileType(event.target.name);
    uploadPicture(event);
  };
  const uploadPicture = (event) => {
    console.log("uplaoding file");
    let data = new FormData();
    let types = event.target.name;
    data.append("userId", userInfo.userId);
    data.append("type", event.target.name);
    data.append("file", event.target.files[0]);
    let config = {
      method: "post",
      url: `${baseUrl}/api/v1/user/fileUpload?authToken=${localStorage.getItem(
        "authToken"
      )}`,
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log("data::", response.data);
        if (response.data.message === "File Extension Not Allowed") {
          toast.error(response.data.message);
        }
        if (response.data.status === 200) {
          toast.success(`File upload Sucess`);
          updatePicture(types, response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.success(`File Upload Error`);
      });
  };
  /**update picture */
  const updatePicture = (fileType, uploadedfile) => {
    console.log("updating picture:", fileType, uploadedfile);
    const userInfo = {
      type: fileType,
      file: uploadedfile,
    };
    handleUpdatePictures(userInfo);
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
            <label htmlFor="file-upload" className="custom-file-upload">
              <CloudUploadIcon />
              <p className="coverpic_label">Change Cover Pic</p>
            </label>
            <input
              id="file-upload"
              type="file"
              name="coverPicture"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label htmlFor="profile-upload" className="custom-file-upload">
              <CloudUploadIcon />
              <p className="coverpic_label">Change Profile Pic</p>
            </label>
            <input
              id="profile-upload"
              type="file"
              name="profile"
              onChange={handleFileChange}
            />
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
