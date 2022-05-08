import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
const Otp = () => {
    const { state } = useLocation();
    const email = state.email
    const [otp0, setOtp0] = useState('')
    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [msg, setMsg] = useState('')
    const verifyOtp = (e) => {
        e.preventDefault()
        axios.post('/verifyotp', {
            email,
            otp: (otp0 + otp1 + otp2 + otp3)
        }).then(d => {
            if (d.data.success) {
                setMsg(d.data.message)
                window.location = '/'
            }else{
                setMsg(d.data)
            }
        }).catch(e => {
            console.log(e);
        })
    }

    // resend otp code
    const resetform = () => {
        document.getElementById("create-course-form").reset();
    }
    const Resendotp = () => {
        axios.put(`/resend-otp/${email}`).then(d => {
            console.log(d);
            resetform()
            setMsg()
        }).catch(e => {
            console.log(e);
        })
    }
    return (
        <>
            <div style={{ marginTop: "100px" }} className="container">
                <div className="d-flex justify-content-center align-items-center container">
                    <div className="card py-5 px-3">
                        <h5 className="m-0 h4">OPT verification</h5><span className="mobile-text">Enter the code we just send on your email&nbsp;<b className="text-danger"></b></span>
                        <form id="create-course-form" onSubmit={verifyOtp}>
                            <div className="d-flex flex-row mt-5">
                                <input id='opt1' onChange={e => setOtp0(e.target.value)} type="text" className="form-control otp1" autofocus />
                                <input id='opt2' onChange={e => setOtp1(e.target.value)} type="text" className="form-control otp1" />
                                <input id='opt3' onChange={e => setOtp2(e.target.value)} type="text" className="form-control otp1" />
                                <input id='opt4' onChange={e => setOtp3(e.target.value)} type="text" className="form-control otp1" /></div>
                            <button type='submit' className='btn btn-outline-warning my-2 d-block mx-auto'>Verify</button>
                        </form>
                        <p className='text-success my-2 h5 text-center'>{msg}</p>
                        <div className="text-center mt-3"><span className="d-block mobile-text">Don't receive the code?</span><span style={{ cursor: 'pointer' }} onClick={Resendotp.bind(this)} className="font-weight-bold text-danger cursor">Resend</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Otp