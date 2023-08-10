import React from 'react'
import Public_navbar from './Public_navbar'
import Public_hero from './Public_hero'
import '../../scss/Public_main.scss'
import Public_trustAndVerified from './Public_trustAndVerified'

const Public_main = () => {
    return (
        <div className="public-wrapper max-w-[1200px] mx-auto px-3">
            <Public_navbar />
            <Public_hero />
            <Public_trustAndVerified />
        </div>
    )
}

export default Public_main
