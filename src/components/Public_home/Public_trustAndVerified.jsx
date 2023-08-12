import React from 'react'
import vercel from '../../assets/brands/vercel.webp'
import retool from '../../assets/brands/retool.webp'

const Public_trustAndVerified = () => {
    return (
        <section className="trustAndVerified-wrapper mt-[150px]">
            <header>

                <h2 className='text-center font-semibold'>Trusted And Verified By</h2>
                <p className="text-center text-xs mt-1" style={{color: 'var(--text-500)'}}>Trusted by world's leading organizations</p>
            </header>

            <div className="organizations flex mt-9 items-center flex-wrap justify-center">
                <img src={vercel} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                <img src={retool} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                <img src={vercel} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                <img src={retool} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
            </div>

        </section>
    )
}

export default Public_trustAndVerified
