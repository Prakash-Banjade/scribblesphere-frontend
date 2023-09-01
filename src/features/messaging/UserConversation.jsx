import React from 'react'
import { useParams } from 'react-router-dom'

const UserConversation = () => {

    const { id } = useParams();

    return (
        <div>
            {id}
        </div>
    )
}

export default UserConversation
