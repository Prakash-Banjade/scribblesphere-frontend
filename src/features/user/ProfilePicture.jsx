import React from 'react'
import profile from '../../assets/profileHolder.webp'


const ProfilePicture = ({ width, smallWidth, src }) => {

    const profilePicture = src || profile;

    let imgWidth = width || 50;

    return (

        <img
            src={profilePicture}
            alt="profile image" className={`rounded-[50%] aspect-square object-cover block`} style={{ width: imgWidth + 'px' }} />
    )
}

export default ProfilePicture
