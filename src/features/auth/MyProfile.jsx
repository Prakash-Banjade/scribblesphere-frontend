import React, { useState, useEffect } from "react";
import "../../scss/MyProfile.scss";
import ProfilePic from "../../assets/profileImg.jpg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { useGetMyDetailsQuery } from "../userApiSlice";
import Loader from "../../components/Loader";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";

const MyProfile = () => {
  const name = useSelector(selectCurrentUser);

  const [detailState, setDetailState] = useState({});
  const [bio, setBio] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [qualificationEdit, setQualificationEdit] = useState("");
  const [writesOnEdit, setWritesOnEdit] = useState("");
  const [socialLinksEdit, setSocialLinksEdit] = useState([]);

  const [addressEdit, setAddressEdit] = useState("");

  const myDetails = useGetMyDetailsQuery();

  useEffect(() => {
    if (!myDetails.isLoading) {
      setDetailState(myDetails?.data?.details);
      // console.log(myDetails.data.details)
    }
  }, [myDetails.isLoading]);

  if (myDetails.isLoading) return <Loader />;

  const handleSaveEdit = (e) => {
    e.preventDefault();
  };

  const WritesOn = ({ tags }) => {
    return (
      <li>
        {tags?.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </li>
    );
  };

  const EditForm = () => {
    <form onSubmit={handleSaveEdit}>
      <div className="form-field">
        <label htmlFor="bio">Bio:</label>
        <input
          type="text"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="address">address:</label>
        <input
          type="text"
          id="address"
          value={addressEdit}
          onChange={(e) => setAddressEdit(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="qualification">Bio:</label>
        <input
          type="text"
          id="qualification"
          value={qualificationEdit}
          onChange={(e) => setQualificationEdit(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="writesOn">Bio:</label>
        <input
          type="text"
          id="writesOn"
          value={writesOnEdit}
          onChange={(e) => setWritesOnEdit(e.target.value)}
        />
      </div>

      <Button
        variant="contained"
        sx={{ backgroundColor: "var(--primary-color)" }}
        type="submit"
      ></Button>
    </form>;
  };

  return (
    <main className="myProfile-main">
      <header className="heading">
        <h2>My Profile</h2>
        <p>Manage profile</p>
      </header>
      <section className="profileImg flex-center">
        <img src={ProfilePic} alt="Profile pic" />
      </section>

      <div className="details">
        <header className="heading flex justify-between align-center">
          <h3 className="font-primary color-text-white fw-500">Details</h3>
          <Button
            color="primary"
            sx={{ fontSize: "1rem", display: "flex", alignItems: "center" }}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <EditIcon />
            Edit
          </Button>
        </header>

        <hr />

        {isEditing ? (
          <EditForm />
        ) : (
          <ul>
            <li>{name}</li>
            {detailState?.qualification?.length !== 0 && (
              <li>{detailState.qualification}</li>
            )}
            {detailState?.writesOn?.length !== 0 && (
              <WritesOn tags={detailState.writesOn} />
            )}
          </ul>
        )}
      </div>
    </main>
  );
};

export default MyProfile;
