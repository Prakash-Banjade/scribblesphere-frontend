import React, { useCallback } from 'react'
import Public_navbar from './Public_navbar'
import Public_hero from './Public_hero'
import '../../scss/Public_main.scss'
import Features from './Features'
import useAppTheme from '../../hooks/useAppTheme'

const Public_main = () => {
    const { dark, toggleTheme } = useAppTheme();

    useCallback(() => {
        if (!dark) toggleTheme();
    }, [dark, toggleTheme])

    return (
        <div className="public-wrapper max-w-[1200px] mx-auto sm:px-3">
            <Public_navbar />
            <Public_hero />
            <Features />
        </div>
    )
}

export default Public_main
