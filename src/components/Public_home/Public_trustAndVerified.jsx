import React from 'react'
import Trust_Brands from './Trust_Brands'
import vercel from '../../assets/brands/vercel.svg'
import retool from '../../assets/brands/retool.svg'

const Public_trustAndVerified = () => {
    return (
        <section className="trustAndVerified-wrapper mt-10">
            <header>

                <h2 className='text-center font-semibold'>Trusted And Verified By</h2>
                <p className="text-center mt-1">Trusted by world's leading organizations</p>
            </header>

            <div className="organizations">
                <img src={vercel} alt="vercel trusted" className='max-w-[100px]' />
                <img src={retool} alt="retool trusted" className='max-w-[100px]' />
            </div>

        </section>
    )
}

export default Public_trustAndVerified
