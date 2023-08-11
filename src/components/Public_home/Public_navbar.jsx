import React from 'react'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import useAppTheme from '../../hooks/useAppTheme'

const Public_navbar = () => {
    const { dark, toggleTheme } = useAppTheme();

    return (
        <nav className="public_nav px-3 py-1 z-50 border-b flex items-center justify-between sticky top-0" style={{ borderColor: 'var(--line-color)', background: dark? '#21222299' : '#f2f4f799' }}>
            <section className="left-section flex items-center gap-12">
                <a href="#" className="flex items-center gap-2">
                    <img src={logo} alt="Brand logo" className="block w-[40px]" />
                    <h1 className="font-semibold text-lg text-primary">ScribbleSphere</h1>
                </a>

                <ul className="gap-6 items-center flex" style={{ color: 'var(--text-300)' }}>
                    <li>
                        <Link to="/" className="hover:text-primary">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-primary">
                            Pricings
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-primary">
                            Partners
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="hover:text-primary">
                            Services
                        </Link>
                    </li>

                </ul>

            </section>
            <section className="right-section flex items-center gap-3">
                <Button variant="text" onClick={toggleTheme}>{dark ? 'Light' : 'Dark'}</Button>

                <Button variant="text" component={Link} to="/login">Sign In</Button>
                <Button variant="outlined" component={Link} to="/signup">Sign Up</Button>
            </section>
        </nav>
    )
}

export default Public_navbar
