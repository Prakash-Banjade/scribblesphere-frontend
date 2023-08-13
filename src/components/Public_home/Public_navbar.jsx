import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { Button, IconButton, Switch } from '@mui/material'
import useAppTheme from '../../hooks/useAppTheme'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const Public_navbar = () => {
    const { dark, toggleTheme } = useAppTheme();
    const [small, setSmall] = useState(false)
    const [xs, setXs] = useState(false)
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.matchMedia("(max-width: 800px)").matches;
            const isXsMobile = window.matchMedia("(max-width: 500px)").matches;
            setSmall(isMobile);
            setOpen(false)
            setXs(isXsMobile)
        };

        // Call the event handler initially
        handleResize();

        // Add the event listener for resize events
        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="public_nav px-3 py-1 z-50 border-b flex items-center justify-between sticky top-0" style={{ borderColor: 'var(--line-color)', background: dark ? '#212222ee' : '#f2f4f7ee' }}>
            <section className="left-section flex items-center gap-12">
                <div className="flex items-center gap-1">
                    <a href="#" className="flex items-center gap-2">
                        <img src={logo} alt="Brand logo" className="block w-[40px]" />
                        {!xs && <h1 className="font-semibold text-lg text-primary">ScribbleSphere</h1>}
                    </a>
                </div>

                <ul className={`gap-6 items-center flex ${small ? `flex-col absolute top-full min-w-[200px] right-[10px] items-stretch px-0 py-2 rounded-md border gap-0 transition-transform shadow-lg ${!open ? '-translate-y-[10px] pointer-events-none opacity-0' : 'translate-y-0 pointer-events-auto opacity-100'}` : ''}`} style={{ color: 'var(--text-300)', borderColor: small ? 'var(--line-color)' : '', background: small ? 'var(--bg-secondary)' : '' }}>
                    <li className={small ? `${dark ? 'hover:bg-[#454545]' : 'hover:bg-slate-100'}` : ''}>
                        <Link to="/" className={`hover:text-primary block transition-all ${small ? 'py-2 px-3' : ''}`}>
                            About
                        </Link>
                    </li>
                    <li className={small ? `${dark ? 'hover:bg-[#454545]' : 'hover:bg-slate-100'}` : ''}>
                        <Link to="/" className={`hover:text-primary block transition-all ${small ? 'py-2 px-3' : ''}`}>
                            Pricings
                        </Link>
                    </li>
                    <li className={small ? `${dark ? 'hover:bg-[#454545]' : 'hover:bg-slate-100'}` : ''}>
                        <Link to="/" className={`hover:text-primary block transition-all ${small ? 'py-2 px-3' : ''}`}>
                            Partners
                        </Link>
                    </li>
                    <li className={small ? `${dark ? 'hover:bg-[#454545]' : 'hover:bg-slate-100'}` : ''}>
                        <Link to="/" className={`hover:text-primary block transition-all ${small ? 'py-2 px-3' : ''}`}>
                            Services
                        </Link>
                    </li>
                    {!small && <li className={small ? `${dark ? 'hover:bg-[#454545]' : 'hover:bg-slate-100'}` : ''}>
                        <IconButton onClick={toggleTheme} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
                            {
                                !dark ? <MdDarkMode /> : <MdLightMode />
                            }
                        </IconButton>
                    </li>}
                    {small && <li className={small ? `${dark ? 'hover:bg-[#454545]' : 'hover:bg-slate-100'}` : ''}>
                        <div className="flex gap-1 items-center px-3">
                            <span>Dark</span>
                            <Switch checked={!dark} onChange={toggleTheme} />
                            <span>Light</span>
                        </div>
                    </li>}


                </ul>

            </section>
            <section className="right-section flex items-center gap-3">
                <Button variant="text" color="secondary" sx={{ whiteSpace: 'nowrap' }} component={Link} to="/login">Sign In</Button>
                <Button variant="outlined" color="secondary" sx={{ whiteSpace: 'nowrap' }} component={Link} to="/signup">Sign Up</Button>
                {small && <IconButton onClick={() => setOpen(prev => !prev)}><RxHamburgerMenu /></IconButton>}

            </section>
        </nav>
    )
}

export default Public_navbar
