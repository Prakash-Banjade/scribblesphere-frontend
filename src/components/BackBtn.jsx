import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { Button } from '@mui/material'

const BackBtn = () => {
    const navigate = useNavigate();

    return (
        <Button variant="text" onClick={() => navigate(-1)} sx={{ width: 'fit', minWidth: 'auto !important' }}>
            <span className='text-2xl' style={{ color: 'var(--text-200)' }}>
                <MdArrowBack />
            </span>
        </Button>
    )
}

export default BackBtn
