import React from 'react'
import { Link } from 'react-router-dom'

const LoginExpire = () => {
    return (
        <div className="min-h-full min-w-full flex items-center justify-center">
            <section className="p-5 rounded-md flex flex-col gap-4 items-center justify-center border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--line-color)' }}>
                <p>Your log in session has expired. Login again to continue futhur.</p>
                <div className="flex items-center justify-center gap-2">
                    <button className="px-3 py-2 rounded-md border hover:opacity-90 transition-all" type="button" style={{ color: 'var(--text-500)', borderColor: 'var(--text-500)' }}>Cancel</button>
                    <Link to="/login" className="px-3 py-2 rounded-md border hover:opacity-90 transition-all" type="button" style={{ color: 'var(--text-500)', backgroundColor: 'var(--primary-color)', borderColor: 'transparent' }}>Login</Link>
                </div>
            </section>
        </div>
    )
}

export default LoginExpire
