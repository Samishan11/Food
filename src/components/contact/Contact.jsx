import axios from 'axios';
import React, { useState } from 'react'
import './contact.css'
const Contact = () => {
    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const Contact = async (e) => {
        try {
            e.preventDefault();
            const con = await axios.post('/contact',{
                username,
                lastname,
                email,
                message
            });
            document.getElementById('contact-form').reset()
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div style={{ marginTop: "100px" }} className='container bg-light pb-5'>
                <div className='primaryColor py-2 my-4 mx-5'>
                    <h1 style={{ fontSize: '2rem' }} className='text-dark mt-5 text-center'>Keep in touch with us?</h1>
                </div>
                {/*  */}
                <div style={{ width: "50vw" }} className="container py-3 bg-white d-block mx-auto">
                    <form id='contact-form' onSubmit={Contact} style={{ fontSize: '1rem' }} className="container validate-form">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">First Name</label>
                                    <input onChange={e=>setUsername(e.target.value)} type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter firstname" />
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Last Name</label>
                                    <input onChange={e=>setLastname(e.target.value)} type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter lastname" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputEmail1">Email*</label>
                            <input onChange={e=>setEmail(e.target.value)} type="email" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputEmail1">Message*</label>
                            <textarea onChange={e=>setMessage(e.target.value)} class="form-control input100" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button className='btn btn-outline-dark d-block mx-auto'>Submit</button>
                    </form>
                </div>
                {/*  */}
            </div>
        </>
    )
}

export default Contact