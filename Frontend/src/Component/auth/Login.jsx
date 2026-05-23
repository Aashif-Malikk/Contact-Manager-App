import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const API_BASE = 'https://contact-manager-app-uux8.onrender.com'

function Login() {
    // let isloggedin = localStorage.getItem("isloggedin")
    let navigate = useNavigate()
    // console.log(isloggedin);

    // if (!isloggedin) {
    //     navigate("/")
    // }


    const [msg, setmsg] = useState('')
    const [user, setuser] = useState({})

    const inpHandler = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(async data => {
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("isLoggedIn", "true")
                    setmsg(data.msg)
                    await navigate("/home")
                    window.location.reload()
                } else {
                    setmsg(data.msg || data.error || "Login failed")
                }
            })
    }

    return (
        <div className=''>
            <div className='container'>
                <div className='row m-3'>
                    <div className="col-md-6 align-content-center">
                        <img className='h-100 w-100' src="/secure-login-and-sign-up-concept-illustration-vector.jpg" />
                        {/* <div className='w-100 h-100 object-fit-cover' style={{backgroundImage:'Phone_SignUp.png'}}></div> */}
                    </div>
                    <div className="col-md-6 py-5">
                        <h2>Login to Your Account</h2>
                        <p>Welcopme Back please enter your details</p>
                        <form action="" onSubmit={submitHandler}>
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
                                <button className='w-75 btn btn-primary text-white rounded-4'>Login</button>
                            </div>
                            <span className="small text-secondary">
                                Already have an account?{' '}
                                <Link to="/auth/signup" className="fw-semibold text-decoration-none pp-link-muted">
                                    Sign up
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

export default Login
