import React from 'react'
import vercel from '../../assets/brands/vercel.webp'
import retool from '../../assets/brands/retool.webp'

const Public_trustAndVerified = ({ styles }) => {
    return (
        <section className={`trustAndVerified-wrapper overflow-hidden max-w-full ${styles}`}>
            <header className="heading">
                <h2 className='text-center font-semibold'>Trusted And Verified By</h2>
                <p className="text-center text-xs mt-1">Trusted by world's leading organizations</p>
            </header>

            <section className="brands-wrapper mt-8">
            <div className="organizations flex items-center -space-x-9 justify-center">
                <img src={vercel} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                <img src={retool} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                <img src={vercel} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                <img src={retool} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />

                <div className="duplicate flex items-center -space-x-9 justify-center">
                    <img src={vercel} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                    <img src={retool} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                    <img src={vercel} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                    <img src={retool} alt="vercel_img" className="md:max-w-[250px] max-w-[180px]" />
                </div>
            </div>
            </section>

        </section>
    )
}

export default Public_trustAndVerified
