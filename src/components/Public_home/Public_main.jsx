import React, { useCallback } from 'react'
import Public_navbar from './Public_navbar'
import Public_hero from './Public_hero'
import '../../scss/Public_main.scss'
import Features from './Features'
import useAppTheme from '../../hooks/useAppTheme'
import Rich_TextEditor from './Rich_TextEditor'
import Counter from './Counter'

import AOS from 'aos';
import 'aos/dist/aos.css';


AOS.init({
});

const Public_main = () => {
    const { dark, toggleTheme } = useAppTheme();

    useCallback(() => {
        if (!dark) toggleTheme();
    }, [dark, toggleTheme])

    return (
        <div className="public-wrapper max-w-[1200px] mx-auto sm:px-3">
            <Public_navbar />
            <Public_hero />
            <Counter count={1} variant={1} />
            <Features />
            <Counter count={2} variant={2} />
            <Rich_TextEditor />
        </div>
    )
}

export default Public_main
