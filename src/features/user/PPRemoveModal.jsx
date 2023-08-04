import React from 'react'
import Modal from '@mui/material/Modal';
import useAppTheme from '../../hooks/useAppTheme';
import { RxCross2 } from 'react-icons/rx'


const PPRemoveModal = ({ open, handleClose, handleRemove }) => {

    const { dark } = useAppTheme();

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="absolute -translate-x-1/2 -transform-y-1/2 left-1/2 top-[10%] rounded-md  md:p-8 sm:p-7 p-5 max-w-[550px] w-[95%] border" style={{ borderColor: 'var(--line-color)', background: 'var(--bg-secondary)' }}>
                <header>
                    <h2 className="font-bold xl:text-2xl md:text-xl text-lg text-primary">Confirm Profile Picture Removal</h2>
                </header>

                <section className="mt-5 flex flex-col">
                    <h3 className="md:text-lg text-base" style={{ color: 'var(--text-300)' }}>Are you sure you want to remove your profile picture?</h3>
                    <small className="text-xs mt-1" style={{ color: 'var(--text-400)' }}><strong>Note:</strong> Removing your profile picture will revert to the default avatar.</small>

                    <div className="flex gap-3 justify-end items-center mt-5">
                        <button className={`px-3 py-2 rounded-md text-[#1E90FF] transition-all ${dark? 'hover:bg-[#232323]' : 'hover:bg-slate-100'}`} onClick={handleClose}>Cancel</button>
                        <button className={`px-3 py-2 rounded-md text-red-500 transition-all ${dark? 'hover:bg-[#f7bfbf22]' : 'hover:bg-[#f7bfbf55]'}`} onClick={() => {
                            handleRemove();
                            handleClose();
                        }}>Remove</button>
                    </div>
                </section>

                <button className="closeIcon absolute -top-[13px] -right-[13px] grid place-items-center rounded-[50%] w-[30px] h-[30px]" style={{ background: 'var(--bg-primary)', color: 'var(--text-200)' }} onClick={handleClose} title="Close">
                    <RxCross2 />
                </button>
            </div>
        </Modal>
    )
}

export default PPRemoveModal
