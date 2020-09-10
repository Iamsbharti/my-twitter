import React, { useState, useEffect } from "react";
import "../../css/Profile.css";
import { Button } from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { baseUrl } from "../../apis/apiUtils";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CakeIcon from "@material-ui/icons/Cake";
import dateFormat from "dateformat";
const ManageProfile = ({
  userInfo,
  handleGoBackToProfile,
  handleSaveProfile,
  uploadPicture,
}) => {
  let [userProfile, setProfile] = useState({});
  const [date, setDate] = useState(dateFormat(userInfo.birthdate, "dd"));
  const [month, setMonth] = useState(dateFormat(userInfo.birthdate, "mm"));
  const [year, setYear] = useState(dateFormat(userInfo.birthdate, "yyyy"));
  const [toggleEditBirthDate, setToggleBirthdate] = useState(true);
  useEffect(() => {
    setProfile(userInfo);
  }, [userInfo]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...userProfile,
      [name]: value,
    });
  };
  /**upload handler */
  const handleFileChange = (event) => {
    uploadPicture(event);
  };
  /**toggle edit birthday button */
  const handleToggle = () => {
    setToggleBirthdate(!toggleEditBirthDate);
  };
  /**save profile */
  const saveProfile = () => {
    console.log("save profile");
    console.log("dateupdates::", date, month, year);
    if (date !== undefined) {
      userProfile = {
        ...userProfile,
        birthdate: new Date(
          year,
          (parseInt(month, 10) - 1).toString(),
          date
        ).toDateString(),
      };
    }
    handleSaveProfile(userProfile);
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
          <Button className="btn" onClick={saveProfile}>
            Save Profile
          </Button>
        </div>
      </div>
      <div className="manage__header__userinfo">
        <div className="upload_cover">
          <div>
            <label htmlFor="file-upload" className="custom-file-upload">
              <CloudUploadIcon />
              <p className="coverpic_label">Upload Cover</p>
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
              <p className="coverpic_label">Upload Profile</p>
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
            value={userProfile.name}
            onChange={handleChange}
            name="name"
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
        <label htmlFor="birthday" className="bday_label">
          <CakeIcon />
          <p className="bday_p">BirthDay</p>
        </label>
        <Button className="edit_bdate_button" onClick={handleToggle}>
          Edit
        </Button>
        <div>
          <input
            type="text"
            value={dateFormat(userProfile.birthdate, "mmmm dS,yyyy")}
            onChange={handleChange}
            name="birthday"
            placeholder="You were born on"
          />
        </div>
        <div hidden={toggleEditBirthDate}>
          <div className="manage__header__birthday">
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name="date"
              placeholder="Date e.g. 26"
            />
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              name="month"
              placeholder="Month e.g. 04"
            />
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              name="year"
              placeholder="Year e.g. 1995"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
