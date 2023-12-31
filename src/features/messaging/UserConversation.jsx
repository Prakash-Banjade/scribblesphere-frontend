import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { IoMdSend } from 'react-icons/io'
import useAppTheme from '../../hooks/useAppTheme'
import { useSocket } from '../../context/SocketProvider'
import useMessageTimestamp from '../../hooks/useMessageTimeStamp'
import { useGetConversationQuery, useGetUserByIdQuery } from '../user/userApiSlice'
import Loader from '../../components/Loader'
import ProfilePicture from '../user/ProfilePicture'
import SpinnerLoader from '../../components/SpinnerLoader'

const UserConversation = () => {

    const { dark } = useAppTheme();
    const { id } = useParams();
    const { socket } = useSocket();

    const { data: user, isLoading: isUserLoading, isError: isUserError } = useGetUserByIdQuery(id)
    const { data: conversations, isLoading: convLoading, isError: isConvErr, refetch } = useGetConversationQuery(id);

    const location = useLocation();
    const [messages, setMessages] = useState([])

    const timeStamp = useMessageTimestamp();

    useEffect(() => {
        if (textRef.current) textRef.current.focus()

        const onReceiveMsg = data => {
            setMessages(prev => [...prev, data]) // state will not persist if id changes
        }

        socket.on('receive_msg', onReceiveMsg)

        return () => {
            socket.off('receive_msg', onReceiveMsg)
        }

    }, [])

    // sending message seen
    useEffect(() => {
        socket.emit('msg_seen', id, data => {
            console.log(data)
        })
    }, [id, messages])

    useEffect(() => {
        if (conversations?.messages && !isConvErr) setMessages(conversations.messages)
    }, [convLoading, conversations])

    // useEffect(() => {
    //     refetch();
    // }, [id])


    const [text, setText] = useState('')
    const textRef = useRef();
    const lastMsgRef = useCallback(node => {
        if (node) node.scrollIntoView({ smooth: true })
    }, [])

    const handleSubmit = (e, data) => {
        e.preventDefault();
        console.log('clicked')
        if (!text && !data) return;

        socket.emit('send_msg', id, data || text, data => {
            console.log(data)
            setMessages(prev => [...prev, data.data])
        })
        setText('')
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault();
            setText(prev => prev + '\n');
            console.log(text.split('\n'))
            return;

        } else if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e)
            return;
        }
    }


    const hiBtn = (
        <button type="button" title="Send 'Hi!'" className="text-center mt-auto mx-auto rounded-md px-3 py-2 focus:outline-none hover:outline-primary hover:outline hover:outline-1" style={{ color: 'var(--text-100)', background: 'var(--bg-primary)' }} onClick={e => handleSubmit(e, 'Hi!')}>Say Hi!</button>
    )

    const messagesList = messages.length === 0 ? hiBtn : (
        messages.map((conv, ind) => {
            let showTimeStamp;
            if (ind === 0) {
                showTimeStamp = true;
            } else {
                const difference = new Date(conv.createdAt) - new Date(messages[ind - 1]?.createdAt)
                showTimeStamp = Math.ceil(difference / 60000) > 5
            }

            const time = timeStamp(conv.createdAt)
            let showImg = ind === 0 && !conv?.self ? true : !conv?.self && messages[ind - 1]?.self

            const userImg = showImg && <img
                src={user?.profile?.url}
                alt={user?.fullname} className={`rounded-[50%] aspect-square object-cover block sm:w-[40px] w-[25px]`} role="button" onClick={() => navigate(`/authors/${user?._id}`)} />

            const margin = conv?.self !== messages[ind - 1]?.self;


            return (
                <section className={`${ind === 0 ? 'mt-auto' : ''} w-full flex flex-col`} key={conv._id}>
                    {showTimeStamp && <span className="text-xs  text-center self-center my-4" style={{ color: 'var(--text-500)', minWidth: '100% !important' }}>{time}</span>}
                    <div
                        className={` ${conv.self ? 'self-end' : 'self-start'} ${!showImg ? 'sm:ml-[48px] ml-[32px]' : ''} ${margin? 'mt-5' : ''} flex items-center gap-1.5`}
                        ref={ind === messages.length - 1 ? lastMsgRef : null}
                        title={time}
                    >
                        {showImg && <span className="mt-1">{userImg}</span>}

                        <p className="px-3 py-2 text-sm rounded-3xl" style={{ color: conv.self ? 'white' : 'var(--text-200)', background: conv.self ? 'var(--conversation-bg-self)' : 'var(--bg-primary)' }}>{conv.text}</p>
                    </div>
                </section>
            )
        })
    )


    if (isUserLoading || convLoading) return <div className="h-full flex items-center justify-center"><SpinnerLoader /></div>

    return (
        <div className="h-full relative flex flex-col gap-5">
            <section className="messages gap-[2px] p-2 flex flex-col items-start mt-auto grow max-h-[87%] overflow-auto">
                {messagesList}
            </section>

            <form className="textBox border shadow-lg rounded-[100px] overflow-hidden flex gap-2 pr-2 items-center focus-within:outline-primary outline-1 outline outline-transparent  w-full" style={{ borderColor: 'var(--line-color)', background: 'var(--bg-primary)' }} onSubmit={e => handleSubmit(e)}>
                <textarea ref={textRef} rows={text.split('\n').length > 5 ? 5 : text.split('\n').length} className='sm:p-4 p-3 rounded-md resize-none w-full bg-transparent focus:outline-none' style={{ color: 'var(--text-200)' }} value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown} placeholder="Write message..." />
                <button type="submit" className={`text-2xl px-2 py-1 focus:outline-none rounded-lg ${dark ? 'text-gray-300 bg-[#222]' : 'text-gray-800 bg-slate-200'} focus:text-primary`} title="Send">
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}

export default UserConversation
