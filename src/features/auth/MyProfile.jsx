import React, { useState, useEffect } from "react";
import "../../scss/MyProfile.scss";
import ProfilePic from "../../assets/profileImg.jpg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { useGetMyDetailsQuery } from "../userApiSlice";
import Loader from "../../components/Loader";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditForm from "./ProfileEditingForm";

const MyProfile = () => {
  const name = useSelector(selectCurrentUser);

  const [detailState, setDetailState] = useState({});

  const [isEditing, setIsEditing] = useState(false);


  const myDetails = useGetMyDetailsQuery();

  useEffect(() => {
    if (!myDetails.isLoading) {
      setDetailState(myDetails?.data?.details);
    }
  }, [myDetails.isLoading]);

  if (myDetails.isLoading) return <Loader />;

  const WritesOn = ({ tags }) => {
    return (
      <li>
        {tags?.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </li>
    );
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
          <h3 className="font-primary color-text-white fw-500">
            {isEditing ? "Edit you details here" : "Details"}
          </h3>
          {!isEditing && (
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
          )}
        </header>

        <hr />

        {isEditing ? (
          <EditForm details={detailState} />
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
