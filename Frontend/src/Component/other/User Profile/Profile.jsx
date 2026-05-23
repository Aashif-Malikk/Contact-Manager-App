import React, { useEffect, useState } from 'react'
import { ContactStatusFunc } from '../Home'

const API_BASE = 'https://contact-manager-app-uux8.onrender.com'

export function EditMyProfile(props) {
  const [updatedProfile, setupdatedProfile] = useState({
    name: props.name,
    phone: props.phone,
    location: props.location
  });

  const inputHandler = (e) => {
    setupdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value })
  }

  const saveEdits = async () => {
    const res = await fetch(`${API_BASE}/editprofile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(updatedProfile)
    });
    const data = await res.json();
    window.location.reload()
    console.log(data);
  };

  return (
    <div className='card d-flex flex-column flex-md-row justify-content-evenly align-items-center border shadow rounded-4 p-3 px-3 px-md-4 w-100'>
      <img
        style={{ height: '120px', width: '120px' }}
        src="./Keep_contact_safe.avif"
        alt=""
        srcSet=""
        className="card-image object-fit-cover rounded-circle mt-3 mt-md-0"
      />
      <div className="card-body py-2 w-100 w-md-50">
        <input
          type="text"
          name="name"
          id=""
          defaultValue={props.name}
          className='text-black form-control mb-2'
          onChange={inputHandler}
        />
        <p className="card-text text-dark">{props.email}</p>
        <p className='text-black'>Passionate about connecting with people and staying organized</p>
      </div>
      <div className='w-100 w-md-50'>
        <div className='card-body w-100'>
          <div className="row my-3 align-items-center">
            <div className="col-5 col-sm-4 d-flex align-items-center gap-2">
              <i className="fa-solid fa-phone"></i>
              <p className="mb-0">Phone</p>
            </div>
            <div className="col-7 col-sm-8">
              <input
                type="tel"
                name="phone"
                id=""
                defaultValue={props.phone}
                className='text-black form-control'
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="row my-3 align-items-center">
            <div className="col-5 col-sm-4 d-flex align-items-center gap-2">
              <i className="fa-solid fa-location-dot"></i>
              <p className='mb-0'>Location</p>
            </div>
            <div className="col-7 col-sm-8">
              <input
                type="text"
                name="location"
                id=""
                defaultValue={props.location}
                className='text-black form-control'
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="row my-3 align-items-center">
            <div className="col-5 col-sm-4 d-flex align-items-center gap-2">
              <i className="fa-regular fa-envelope"></i>
              <p className='mb-0'>Email</p>
            </div>
            <div className="col-7 col-sm-8 text-black">
              <p className='mb-0 text-truncate'>{props.email}</p>
            </div>
          </div>
        </div>
        <div className='px-3 d-flex justify-content-end'>
          <button onClick={saveEdits} className='btn btn-outline-primary'>Save Edit</button>
        </div>
      </div>
    </div>
  )
}

function Profile() {
  const [myProfile, setmyProfile] = useState()
  const [isEditProfile, setisEditProfile] = useState(false)

  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isLoggedIn')
    window.location.reload()
  }

  useEffect(() => {
    const main = async () => {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      setmyProfile(data);
    };
    main();
  }, []);

  const editProfileFunc = () => {
    setisEditProfile(prev => !prev)
  }

  return (
    <div style={{ backgroundColor: 'rgb(250, 251, 253)', height: '100%' }}>

      {/* Top search bar + name */}
      <div className='w-100 d-flex align-items-center justify-content-between border-bottom p-3 gap-2'>
        <div className='input-group rounded-2 border shadow-sm overflow-hidden' style={{ minWidth: 0, flex: 1 }}>
          <span className="input-group-text bg-light border-0 ps-3">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            className="form-control border-0 bg-light shadow-none"
            type="search"
            placeholder="Search contact...."
            aria-label="Search"
          />
        </div>
        <div className='text-end ps-2 flex-shrink-0'>
          <h5 className='mb-0 d-none d-sm-block'>{myProfile?.name}</h5>
        </div>
      </div>

      {/* Page title + action buttons */}
      <div className="w-100 pt-3 pt-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center px-3 gap-2">
        <div className='px-2 px-md-4'>
          <h5 className='mb-1'>My Profile</h5>
          <p className='mb-0 text-muted' style={{ fontSize: '14px' }}>Manage your personal information and account settings.</p>
        </div>
        <div className='px-2 px-md-4 d-flex flex-wrap gap-2'>
          <button onClick={editProfileFunc} className='btn btn-outline-primary btn-sm'>
            <i className="fa-solid fa-pencil me-1"></i>Edit Profile
          </button>
          <button onClick={logoutHandler} className='btn btn-danger btn-sm'>
            <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Log Out
          </button>
        </div>
      </div>

      {/* Profile card */}
      <div className='w-100 pt-3 px-2 px-md-4'>
        {
          !isEditProfile ? (
            <div className='card d-flex flex-column flex-md-row justify-content-evenly align-items-center border shadow rounded-4 p-3 px-3 px-md-4 w-100'>
              <img
                style={{ height: '120px', width: '120px', flexShrink: 0 }}
                src="./Keep_contact_safe.avif"
                alt=""
                srcSet=""
                className="object-fit-cover rounded-circle mt-2 mt-md-0"
              />
              <div className="card-body py-2 w-100" style={{ minWidth: 0 }}>
                <h5 className="card-title text-black">{myProfile?.name}</h5>
                <p className="card-text text-dark text-truncate">{myProfile?.email}</p>
                <p className='text-black mb-0'>Passionate about connecting with people and staying organized</p>
              </div>
              <div className='card-body w-100' style={{ minWidth: 0 }}>
                <div className="row my-3 align-items-center">
                  <div className="col-5 col-sm-4 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-phone flex-shrink-0"></i>
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-7 col-sm-8 text-black">
                    <p className='mb-0'>{myProfile?.number}</p>
                  </div>
                </div>
                <div className="row my-3 align-items-center">
                  <div className="col-5 col-sm-4 d-flex align-items-center gap-2">
                    <i className="fa-solid fa-location-dot flex-shrink-0"></i>
                    <p className='mb-0'>Location</p>
                  </div>
                  <div className="col-7 col-sm-8 text-black">
                    <p className='mb-0'>{myProfile?.location}</p>
                  </div>
                </div>
                <div className="row my-3 align-items-center">
                  <div className="col-5 col-sm-4 d-flex align-items-center gap-2">
                    <i className="fa-regular fa-envelope flex-shrink-0"></i>
                    <p className='mb-0'>Email</p>
                  </div>
                  <div className="col-7 col-sm-8 text-black" style={{ minWidth: 0 }}>
                    <p className='mb-0 text-truncate'>{myProfile?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EditMyProfile
              name={myProfile?.name}
              phone={myProfile?.number}
              email={myProfile?.email}
              location={myProfile?.location}
            />
          )
        }
      </div>

      {/* Contact stats */}
      <div className='w-100 pt-4 px-2 px-md-4 pb-4'>
        <ContactStatusFunc />
      </div>

    </div>
  )
}

export default Profile