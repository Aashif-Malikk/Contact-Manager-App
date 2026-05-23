import React, { useState } from 'react'
const API_BASE = 'https://contact-manager-app-uux8.onrender.com'


function AddContact() {
    const [contactDetail, setcontactDetail] = useState({})
    const [msg, setmsg] = useState('')

    const inpHandler = (e) => {
        setcontactDetail({ ...contactDetail, [e.target.name]: e.target.value })
    }

    const contactHandler = async (e) => {
        e.preventDefault()

        await fetch(`${API_BASE}/addContact`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(contactDetail)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.msg)
                setmsg(data.msg)
            })
    }


    return (
        <div style={{ backgroundColor: 'rgb(250, 251, 253)', height: '100%' }}>
            <div className="w-100 pt-4 d-flex justify-content-between px-3">
                <div className='profile-name w-50 px-4 align-content-center'>
                    <h5 className='fw-bold'>Add Contact</h5>
                    <p>Enter the deatil of contact you want to add.</p>
                </div>
            </div>
            <div className='px-4'>

                <div className='d-flex flex-column justify-content-evenly align-items-center border shadow rounded-4 px-4 w-100 w-md-75'>

                    <form className='py-3 w-100' onSubmit={contactHandler}>
                        <div className="m-3">
                            <label htmlFor="contact-name" className="form-label fw-semibold">
                                Full Name
                            </label>
                            <div className='input-group rounded-2 bg-light border border-1 shadow-sm overflow-hidden w-100'>
                                <span className="input-group-text bg-transparent border-0 ps-3">
                                    <i className="fa-regular fa-user"></i>
                                </span>
                                <input
                                    name='contactName'
                                    id="contact-name"
                                    className="form-control border-0 rounded-1 bg-transparent shadow-none"
                                    maxLength={20}
                                    type='text'
                                    // onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter Name"
                                    onChange={inpHandler}
                                />
                            </div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="contact-number" className="form-label fw-semibold">
                                Number
                            </label>
                            <div className='input-group rounded-2 bg-light border border-1 shadow-sm overflow-hidden w-100'>
                                <span className='input-group-text bg-transparent border-0 ps-3'>
                                    <i className="fa-solid fa-phone"></i>
                                </span>
                                <input
                                    name='contactNumber'
                                    id="contact-number"
                                    className="form-control border-0 rounded-3 bg-transparent shadow-none"
                                    maxLength={10}
                                    type='tel'
                                    // onChange={(e) => setTitle(e.target.value)}
                                    placeholder="9186XXXXXX"
                                    onChange={inpHandler}
                                />
                            </div>

                        </div>
                        <div className="m-3">
                            <label htmlFor="contact-email" className="form-label fw-semibold">
                                Email
                            </label>
                            <div className='input-group rounded-2 bg-light border border-1 shadow-sm overflow-hidden w-100'>
                                <span className='input-group-text bg-transparent border-0 ps-3'>
                                    <i className="fa-regular fa-envelope"></i>
                                </span>
                                <input
                                    name='contactEmail'
                                    id="contact-email"
                                    type='email'
                                    className="form-control border-0 rounded-3 bg-transparent shadow-none"
                                    maxLength={30}
                                    // onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter your email"
                                    onChange={inpHandler}
                                />
                            </div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="contact-note" className="form-label fw-semibold">
                                Notes (Optional)
                            </label>
                            <textarea
                                name='contactNote'
                                id="contact-note"
                                className="form-control rounded-2 shadow-sm border"
                                maxLength={100}
                                placeholder="Add any additional notes about this contact"
                            >
                            </textarea>
                        </div>
                        <div className='w-100 px-2 px-sm-5 justify-content-end d-flex m-3'>
                            <button type='submit' className="btn btn-primary"><i className="fa-solid fa-users me-2"></i>Save Contact</button>
                        </div>
                    </form>
                    <p>{msg}</p>
                </div>
            </div>
        </div>
    )
}

export default AddContact
