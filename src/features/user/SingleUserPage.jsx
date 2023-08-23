import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetUserByIdQuery } from './userApiSlice';
import Loader from '../../components/Loader';

const SingleUserPage = () => {
    const { id } = useParams();
    const { data: user, isLoading, isSuccess, isError } = useGetUserByIdQuery(id);

    console.log(user);


    if (isError) return <h3 className="text-xl p-3" style={{ color: 'var(--text-200)' }}>The requested user can't be fetched.</h3>
    if (isLoading) return <Loader />
    return (
        <div className="wrapper">
            <section className="left-section">

            </section>
            <section className="left-section">
                
            </section>
        </div>
    )
}

export default SingleUserPage
