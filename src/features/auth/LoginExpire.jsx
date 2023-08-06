import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const LoginExpire = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <section className="p-5 rounded-md flex flex-col m-3 gap-4 shadow-lg items-center justify-center border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}>
                <div><h3 style={{ fontFamily: 'var(--secondary-text-font)', color: 'var(--text-200)' }} className="text-center">Your log in session has expired. Log in again to continue futhur.</h3></div>
                <div className="flex items-center justify-center gap-2">
                    <Button variant="outlined">Cancel</Button>
                    <Button component={Link} to="/login" variant="contained" sx={{ color: 'white' }}>
                        Log in
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default LoginExpire
