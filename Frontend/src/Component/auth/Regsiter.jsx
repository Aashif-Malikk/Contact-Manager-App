import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../../apiConfig'

function Regsiter() {
    const [user, setuser] = useState({})
    const [msg, setmsg] = useState('')

    const inpHandler = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        await fetch(`${API_BASE}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setmsg(data.msg)
            })
    }

    return (
        <div className=''>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-6 align-content-center">
                        <img className='h-75 w-100' src="/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg" />
                        {/* <div className='w-100 h-100 object-fit-cover' style={{backgroundImage:'Phone_SignUp.png'}}></div> */}
                    </div>
                    <div className="col-md-6 py-5">
                        <h2>Create Your Account</h2>
                        <p>Sign Up to get start with Nexa Contacts</p>
                        <form action="" onSubmit={submitHandler}>
                            <div className='my-3 w-75'>
                                <label htmlFor="signup-name" className="form-label fw-bold px-2">
                                    Full Name
                                </label>
                                <div className='input-group rounded-pill bg-light border border-1 shadow-sm overflow-hidden w-100'>
                                    <span className="input-group-text bg-transparent border-0 ps-3">
                                        <i className="fa-regular fa-user"></i>
                                    </span>
                                    <input
                                        name='name'
                                        onChange={inpHandler}
                                        className="form-control border-0 rounded-3 bg-transparent shadow-none"
                                        type="text"
                                        placeholder="Enter your name..."
                                    />
                                </div>
                            </div>
                            <div className='my-3 w-75'>
                                <label htmlFor="signup-email" className="form-label fw-bold px-2">
                                    Email
                                </label>
                                <div className='input-group rounded-pill bg-light border border-1 shadow-sm overflow-hidden w-100'>
                                    <span className="input-group-text bg-transparent border-0 ps-3">
                                        <i className="fa-regular fa-envelope"></i>
                                    </span>
                                    <input
                                        name='email'
                                        onChange={inpHandler}
                                        className="form-control border-0 rounded-3 bg-transparent shadow-none"
                                        type="email"
                                        placeholder="Enter your email..."
                                    />
                                </div>
                            </div>
                            <div className='my-3 w-75'>
                                <label htmlFor="signup-password" className="form-label fw-bold px-2">
                                    Password
                                </label>
                                <div className='input-group rounded-pill bg-light border border-1 shadow-sm overflow-hidden w-100'>
                                    <span className="input-group-text bg-transparent border-0 ps-3">
                                        <i className="fa-solid fa-lock"></i>
                                    </span>
                                    <input
                                        name='password'
                                        onChange={inpHandler}
                                        className="form-control border-0 rounded-3 bg-transparent shadow-none"
                                        type="password"
                                        placeholder="Enter your password..."
                                    />
                                </div>
                            </div>
                            <div>
                                <button type='submit' className='w-75 btn btn-success text-white rounded-4'>Sign Up</button>
                            </div>
                            {/* <p>already have an account? <span><Link to='auth/login'>Log in</Link></span></p> */}
                            <span className="small text-secondary">
                                Already have an account?{' '}
                                <Link to="/auth/login" className="fw-semibold text-decoration-none pp-link-muted">
                                    Log in
                                </Link>
                            </span>
                        </form>
                        <p>{msg}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Regsiter
