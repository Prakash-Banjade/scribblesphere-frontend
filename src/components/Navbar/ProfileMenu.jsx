import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";

const ProfileMenu = ({ anchorEl, handleClose, email, open }) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem
        onClick={handleClose}
        className="accountName"
      >
        <em>{email}</em>
      </MenuItem>
      <MenuItem onClick={handleClose} >
        <AccountCircleIcon sx={{ fontSize: "1.4rem" }} />
        <Link to="/" style={{color: '#232323'}}>Change profile picture</Link>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <CreateIcon sx={{ fontSize: "1.4rem" }} />
        <Link to="/articles/create" style={{color: '#232323'}}>Write article</Link>
      </MenuItem>
      <MenuItem
        className="logout"
        onClick={() => {
          handleClose();
          handleLogout();
        }}
      >
        <LogoutIcon sx={{ fontSize: "1.4rem" }} />
        Log out
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
