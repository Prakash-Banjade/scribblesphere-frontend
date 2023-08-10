import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@mui/material'
import { useRegisterMutation, useGenerateOtpMutation } from './authApiSlice';
import loading from '../../assets/signInLoading.gif'

const inputLength = 6;
const initialState = {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: '',
}

const OTP_EXPIRATION = 300

const OtpInput = ({ email, pwd, fullname, setSuccess, setErrMsg, setIsOTP }) => {
    const [otpInput, setOtpInput] = useState(initialState)
    const [sentMsg, setSentMsg] = useState(false)

    const [register, { isLoading }] = useRegisterMutation();
    const [generateOtp, generateOtpState] = useGenerateOtpMutation();


    const focusNext = () => setCurrentIndex((currentIndex + 1) % inputLength)
    const focusPrev = () => setCurrentIndex((currentIndex - 1 + inputLength) % inputLength)
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentInputRef = useRef();

    useEffect(() => {
        currentInputRef.current.focus();
        setSentMsg(false);
    }, [currentIndex])

    const handleOTPInputChange = e => {
        const { name, value } = e.target;
        setOtpInput(prev => ({
            ...prev,
            [name]: value.slice(0, 1),
        }))

        setSentMsg(false);
        if (currentIndex === inputLength - 1) return;
        if (value.length === 1) focusNext();

    }

    const handleKeyDown = e => {
        switch (e.key) {
            case 'ArrowRight': {
                e.preventDefault();
                if (currentIndex === inputLength - 1) return;
                focusNext();
                break;
            }
            case 'ArrowLeft': {
                e.preventDefault();
                if (currentIndex === 0) return;
                focusPrev();
                break;
            }

            case 'Backspace': {
                if (e.target.value.length === 0 && currentIndex !== 0) {
                    e.preventDefault();
                    focusPrev();
                    break;
                }
            }

            default: {

            }
        }

    }

    const handlePasteOtp = (e) => {
        const pastedText = e.clipboardData.getData('text');
        const numberText = Number(pastedText)

        if (isNaN(numberText)) return; // checking if the paste text is number


        const numArr = String(numberText).split('').slice(0, 6) // converting to array of length 6

        setOtpInput({ // setting the value
            first: Number(numArr[0]),
            second: Number(numArr[1]),
            third: Number(numArr[2]),
            forth: Number(numArr[3]),
            fifth: Number(numArr[4]),
            sixth: Number(numArr[5]),
        })
        setCurrentIndex(5) // setting the focus in the last input
    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const otp = Number(Object.keys(otpInput).map(input => otpInput[input]).join(''))

        try {
            const response = await register({ email, otp }).unwrap();
            if (response.status === 'success') {
                setSuccess(true);
                setOtpInput(initialState)
                return;
            }
            throw response;
        } catch (e) {
            console.log(e)
            if (e.data?.message) return setErrMsg(e.data.message)
            setErrMsg(e.message)
        }
    }

    const resend = async (e) => {
        try {
            const response = await generateOtp({ email, pwd, fullname }).unwrap();
            if (response?.status === 'success') {
                setIsOTP(true);
                setSentMsg(true)
            }
        } catch (e) {
            console.log(e)
            if (e.data?.message) return setErrMsg(e.data.message)
            setErrMsg(e.message)

        }
    }

    useEffect(() => {
        setErrMsg('')
    }, [otpInput])

    // timer countdown logic
    const [seconds, setSeconds] = useState(OTP_EXPIRATION);
    useEffect(() => {
        setSeconds(OTP_EXPIRATION)
    }, [])

    useEffect(() => {
        if (seconds > 0) {
            const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [seconds]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    return (
        <div className="opt-wrapper">
            <h2 className="text-center uppercase text-2xl lg:mb-12 md:mb-8 sm:mb-5 mb-3" style={{color: 'var(--text-200)'}}>Verification</h2>

            <p className="text-center text-sm" style={{ color: 'var(--text-300)' }}>A 6 digits OTP has been sent to <strong>{email}</strong> Use the OTP below to verify the email.</p>

            <form className="opt-input-section mt-5 mx-auto flex flex-col justify-center items-center" onSubmit={handleOtpSubmit}>

                <label htmlFor="firstOtpDigit" className="" style={{ color: 'var(--text-200)' }}>Enter OTP here</label>


                <div className="opt-inputs flex gap-3 items-center my-3 mb-10">
                    {
                        Object.keys(otpInput).map((input, ind) => (
                            <input type="number" key={ind} name={input} value={otpInput[input]} className="opt-num sm:w-[4ch] w-[3ch] text-center sm:px-3 sm:py-2 px-2 py-1 sm:text-xl text-base rounded-md border focus:outline-primary" max="9" onChange={handleOTPInputChange} onKeyDown={handleKeyDown} ref={currentIndex === ind ? currentInputRef : null} onFocus={() => setCurrentIndex(ind)} onPaste={handlePasteOtp} />
                        ))
                    }

                </div>

                <Button type="submit" variant="contained" disabled={Object.keys(otpInput).some(input => otpInput[input] === '') || isLoading} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    {isLoading && <img src={loading} alt="loading spinner" className="w-[20px] h-[20px]" />}
                    {isLoading ? 'Verifying...' : 'Verify'}
                </Button>
            </form>

            <section className='resend-otp flex items-center gap-2 justify-center mt-4'>
                {seconds > 0 && <div className="flex items-center justify-center gap-1 text-sm" style={{ color: 'var(--text-200)' }}>
                    <p>Resend In: </p>
                    <span>{formatTime(seconds)}</span>
                </div>}
                <Button disabled={seconds > 0} sx={{ color: '#1e90ff', fontWeight: 500, '&:disabled': {color: 'var(--text-500)'} }} onClick={resend}>{generateOtpState.isLoading? 'Sending...' : 'Resend'}</Button>
            </section>

            {sentMsg && <p className="text-center text-xs mt-5 text-primary font-semibold">A new OTP has been sent successfully.</p>}

            <p className="text-center italic text-xs mt-5" style={{ color: 'var(--text-200)' }}>Don't share the OTP with anyone. OTP expires in 5 minutes.</p>

        </div>
    )
}

export default OtpInput
