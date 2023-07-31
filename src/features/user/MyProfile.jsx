import React, { useState, useEffect } from "react";
import "../../scss/MyProfile.scss";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../../assets/profileImg.jpg";
import { useGetMyDetailsQuery } from "../user/userApiSlice";
import Loader from "../../components/Loader";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import EditForm from "./ProfileEditingForm";
import useAuth from "../../hooks/useAuth";
import { MdKeyboardBackspace } from "react-icons/md";
import useAppTheme from "../../hooks/useAppTheme";

const MyProfile = () => {
  const { fullname } = useAuth();

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

  const navigate = useNavigate();
  const {dark} = useAppTheme();


  return (
    <>
      <button className={`text-2xl mb-5 rounded-md  ${dark ? 'hover:bg-gray-500' : 'hover:bg-slate-300'} transition-all`} style={{ color: 'var(--text-200)' }} onClick={() => navigate(-1)} title="Back">
        <MdKeyboardBackspace />
      </button>
      <div className="myProfile-main">
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
              <li>{fullname}</li>
              {detailState?.qualification?.length !== 0 && (
                <li>{detailState.qualification}</li>
              )}
              {detailState?.writesOn?.length !== 0 && (
                <WritesOn tags={detailState.writesOn} />
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
