import React from 'react'
import Modal from '@mui/material/Modal';
import { RxCross2 } from 'react-icons/rx'
import useAppTheme from '../../hooks/useAppTheme';
import { AiOutlineDelete } from 'react-icons/ai'
import { GoSearch } from 'react-icons/go'


const NewConversationModal = ({ open, setOpen, connections }) => {

    const { dark } = useAppTheme();
    const handleClose = () => setOpen(false)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="absolute -translate-x-1/2 -transform-y-1/2 left-1/2 top-[10%] rounded-md  md:p-8 sm:p-7 p-5 max-w-[550px] w-[95%] border" style={{ borderColor: 'var(--line-color)', background: 'var(--bg-secondary)' }}>
                <header>
                    <h2 className="font-bold xl:text-2xl md:text-xl text-lg text-primary">Add to conversation</h2>
                </header>

                <section className="search border rounded-[100px] overflow-hidden flex gap-2 my-4 px-4 items-center focus-within:outline-primary outline-1 outline outline-transparent " style={{ borderColor: 'var(--line-color)', background: 'var(--bg-primary)' }}>
                    <button type="button" className={`text-lg focus:outline-none text-gray-400`} disabled title={"Search connections"}>
                        <GoSearch />
                    </button>

                    <input type="search" className={`sm:p-2.5 p-1.5 rounded-md text-sm resize-none w-full bg-transparent focus:outline-none`} style={{ color: 'var(--text-200)' }} placeholder="Search connection" />
                </section>

                <ul className="flex flex-col gap-2">
                    {connections}
                </ul>

                <button className="closeIcon absolute -top-[13px] -right-[13px] grid place-items-center rounded-[50%] w-[30px] h-[30px]" style={{ background: 'var(--bg-primary)', color: 'var(--text-200)' }} onClick={handleClose} title="Close">
                    <RxCross2 />
                </button>
            </div>
        </Modal>
    )
}

export default NewConversationModal
