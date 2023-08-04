import React from 'react'
import profile from '../../assets/profileHolder.webp'
import { useSelector } from 'react-redux'
import { selectProfilePicture } from './userSlice'


const ProfilePicture = ({ width, smallWidth, profilePic }) => {

    const profilePicture = profilePic || useSelector(selectProfilePicture);

    let imgWidth = width || 50;

    return (

        profilePicture ? <img
            src={profilePicture}
            alt="profile image" className={`rounded-[50%] aspect-square object-cover block`} style={{width: imgWidth + 'px'}} /> : <img src={profile} alt="profile image" className={`aspect-square object-cover block`} style={{width: imgWidth + 'px'}} />
    )
}

export default ProfilePicture
