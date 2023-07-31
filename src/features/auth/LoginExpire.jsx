import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const LoginExpire = ({ message }) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <section className="p-5 rounded-md flex flex-col m-3 gap-4 shadow-lg items-center justify-center border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}>
                <div><h3 style={{fontFamily: 'var(--secondary-text-font)'}} className="text-center">Your log in session has expired. Log in again to continue futhur.</h3>
                    <h4>{message}</h4></div>
                <div className="flex items-center justify-center gap-2">
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" sx={{ color: 'white' }}>
                        <Link to="/login">Login</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default LoginExpire