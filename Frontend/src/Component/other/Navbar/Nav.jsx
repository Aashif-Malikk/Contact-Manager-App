import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Nav.css'

function Nav({ onClose }) {
    const safeSync = 'https://plus.unsplash.com/premium_photo-1681487748082-839c7c0ee0c4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D'

    const linkClass = ({ isActive }) =>
        `nav-link text-decoration-none text-sucess fw-bold fw-semibold pp-link px-lg-2 ${isActive ? 'active' : ''}`
    const linkClass2 = ({ isActive }) =>
        `d-flex gap-1 align-items-center m-2 ${isActive ? "nav-link active" : "nav-link"}`

    return (
        <div>
            {!localStorage.getItem("isLoggedIn") && (
                <nav className='m-2 shadow p-3 d-flex flex-wrap rounded justify-content-between align-items-center gap-2'>
                    <div className='heading px-2'>
                        <h4 className='fw-bold'>Nexa<span className='text-success'>Contacts</span></h4>
                    </div>
                    <div>
                        <div className='navbar-nav d-flex flex-row flex-wrap align-items-center gap-3'>
                            <NavLink style={{ color: 'black' }} className={linkClass} to='/home'>Home</NavLink>
                            <NavLink style={{ color: 'black' }} className={linkClass} to='/profile'>Profile</NavLink>
                            <NavLink style={{ color: 'black' }} className={linkClass} to='/addContact'>Add Contact</NavLink>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap align-items-center gap-2'>
                        <div className='input-group rounded-pill bg-light border-1 shadow-sm overflow-hidden' style={{ minWidth: 180 }}>
                            <span className="input-group-text bg-transparent border-0 ps-3">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                className="form-control border-0 bg-transparent shadow-none"
                                type="search"
                                placeholder="Search…"
                                aria-label="Search"
                            />
                        </div>
                        <Link to='/auth/login' className='btn btn-outline-primary rounded border fw-bold'>Login</Link>
                        <Link to='/auth/signup' className='btn rounded border border-success btn-success fw-bold'>SignUp</Link>
                    </div>
                </nav>
            )}

            {localStorage.getItem("isLoggedIn") && (
                <div className='w-100' style={{ backgroundColor: 'rgb(250, 251, 253)', height: '100vh', overflowY: 'auto' }}>
                    <nav className='d-flex flex-column w-100 border-end h-100'>
                        <div className='d-flex justify-content-between align-items-start px-4 pt-4'>
                            <div className='heading'>
                                <h4 className='fw-bold'>Nexa<span className='text-success'>Contacts</span></h4>
                                <p>Your Contact Simplified</p>
                            </div>
                            {/* Close button — mobile only */}
                            <button
                                className="btn d-md-none p-0"
                                onClick={onClose}
                                style={{ fontSize: 20, lineHeight: 1 }}
                                aria-label="Close sidebar"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className='w-100 px-3'>
                            <div className='navbar-nav-2 navbar-nav d-flex flex-column'>
                                <NavLink to="/home" className={linkClass2} onClick={onClose}><i className="fa-regular fa-house"></i> Home</NavLink>
                                <NavLink to="/addContact" className={linkClass2} onClick={onClose}><i className="fa-regular fa-address-book"></i> Add Contacts</NavLink>
                                <NavLink to="/profile" className={linkClass2} onClick={onClose}><i className="fa-regular fa-circle-user"></i>Profile</NavLink>
                                <NavLink to="/myfavorite" className={linkClass2} onClick={onClose}><i className="fa-regular fa-star"></i>Favorite</NavLink>
                            </div>
                        </div>
                        <div className='w-100 p-3 d-none d-sm-block'>
                            <section style={{ backgroundImage: `url(${safeSync})` }} className='hero-wrap rounded-2 text-white position-relative h-100 w-100 overflow-hidden'>
                                <div className='hero-overlay d-flex flex-column justify-content-center align-items-center w-100'>
                                    <h4 className='text-center px-4 pt-4'>Keep your Contact Safe & Sync</h4>
                                    <p className='text-center px-4'>Enable backup to never lose your data</p>
                                    <button className='btn btn-primary my-3'>Enable Backup</button>
                                </div>
                            </section>
                        </div>
                    </nav>
                </div>
            )}
        </div>
    )
}

export default Nav