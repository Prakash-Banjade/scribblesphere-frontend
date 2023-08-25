import React, { useState } from 'react'
import { useToggleFollowMutation } from './userApiSlice';
import { SlUserFollow, SlUserFollowing, SlUserUnfollow } from 'react-icons/sl'
import { Button } from '@mui/material'
import DeleteModal from '../../components/DeleteModal';

const FollowBtn = ({ user, color }) => {
    const [toggleFollow, toggleFollowState] = useToggleFollowMutation();


    const handleToggleFollow = async () => {
        const response = await toggleFollow(user._id);
        // console.log(response);
    }

    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    return (
        <div>
            <Button variant={user.isFollowing ? 'contained' : 'outlined'} color={color ? color : "info"} size="small" sx={{ padding: '5px 15px', borderRadius: '100px', borderWidth: !user.isFollowing ? '2px' : '', minWidth: '136px', textTransform: 'none', fontFamily: 'var(--primary-text-font)', fontSize: '14px', }} startIcon={user.isFollowing ? <SlUserFollowing /> : <SlUserFollow />} onClick={user?.isFollowing? handleOpen : handleToggleFollow} disabled={toggleFollowState.isLoading}>
                {user.isFollowing ? 'Following' : 'Follow'}
            </Button>

            <DeleteModal open={open} handleClose={handleClose} func={handleToggleFollow} title={"Unfollow"} note={`You will no longer receive updates from ${user.fullname}`} message={"Are you sure to unfollow?"} />
        </div>
    )
}

export default FollowBtn
