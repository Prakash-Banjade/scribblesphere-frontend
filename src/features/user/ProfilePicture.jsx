import React from 'react'
import profile from '../../assets/profileHolder.webp'
import { useNavigate } from 'react-router-dom'


const ProfilePicture = ({ width, smallWidth, src, alt, userId}) => {

    const profilePicture = src || profile;
    const navigate = useNavigate();

    let imgWidth = width || 50;

    return (
        <img
            src={profilePicture}
            alt={alt ? alt : "profile image"} className={`rounded-[50%] aspect-square object-cover block`} style={{ width: imgWidth + 'px' }} role={userId ? 'button' : 'img'} onClick={() => {
                if (userId) navigate(`/authors/${userId}`)
            }} />
    )
}

export default ProfilePicture
