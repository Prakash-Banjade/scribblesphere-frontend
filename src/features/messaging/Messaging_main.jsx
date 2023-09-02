import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import useLayoutContext from '../../hooks/useLayoutContext';
import { useAddToConversationMutation } from '../user/userApiSlice';
import useSnackbarShow from '../../hooks/useSnackbarShow';

const Messaging_main = () => {
    const { activeTab, setActiveTab, selectedUser } = useLayoutContext();

    const [addToConversation, { isLoading, isError }] = useAddToConversationMutation();
    const [err, setErr] = useState(null)

    const showSnackbar = useSnackbarShow();

    const navigate = useNavigate();

    const handleAddToConversationClick = async () => {
        try {
            console.log('hey')
            const response = await addToConversation(selectedUser).unwrap();
            console.log(response)
            if (response.status === 'success') {
                navigate(selectedUser)
                setActiveTab(1)
            }

        } catch (e) {
            console.log(e)
            showSnackbar(e.data?.message, 'error')
            setErr(e.message)
        }
    }

    return activeTab === 2 ? (
        <div className="wrapper flex items-center justify-center p-3 h-full">

            <Button variant="contained" size="large" sx={{ borderRadius: '100px', minWidth: '232px' }} disabled={isLoading} onClick={() => {
                handleAddToConversationClick();
            }}>{isLoading ? 'Loading...' : 'Add to conversation'}</Button>


        </div>
    ) : <div className="wrapper">



    </div>
}

export default Messaging_main
