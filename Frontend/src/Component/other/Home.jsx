import React, { useState } from 'react'
import { useEffect } from 'react';
import './Home.css'
import { API_BASE } from '../../apiConfig'


const contactStatus = [
  {
    icon: "fa-solid fa-user-group",
    number: 248,
    label: "Total Contacts",
    growth: "+12 this month",
    iconColor: "primary",
    bg: "bg-primary-subtle",
  },

  {
    icon: "fa-solid fa-users",
    number: 18,
    label: "Groups",
    growth: "+2 this month",
    iconColor: "success",
    bg: "bg-success-subtle",
  },

  {
    icon: "fa-regular fa-star",
    number: 32,
    label: "Favorites",
    growth: "+5 this month",
    iconColor: "purple",
    bg: "bg-light",
  },

  {
    icon: "fa-regular fa-clock",
    number: 15,
    label: "Recently Added",
    growth: "+3 this week",
    iconColor: "warning",
    bg: "bg-warning-subtle",
  },
];

export function ContactStatusFunc() {
  return (
    <div className="row g-4">

      {
        contactStatus.map((item, index) => (
          <div className="col-lg-3 col-md-6" key={index}>
            <div className="card border shadow-sm rounded-4 p-3">
              <div className="d-flex align-items-center gap-3">

                {/* ICON */}
                <div className={`rounded-circle d-flex justify-content-center align-items-center ${item.bg}`} style={{ width: "65px", height: "65px", fontSize: "24px", }}>
                  <i className={`${item.icon} text-${item.iconColor}`}></i>
                </div>

                {/* TEXT */}
                <div>
                  <h2 className="fw-bold mb-0">{item.number}</h2>
                  <p className="text-secondary mb-1">  {item.label}</p>
                  <small className="text-success fw-semibold">  ↑ {item.growth}</small>
                </div>

              </div>
            </div>

          </div>

        ))
      }

    </div>
  )
}

function Home() {
  const [allAddedContact, setallAddedContact] = useState(null)
  const [userDetail, setuserDetail] = useState(null)

  useEffect(() => {
    const fetchingChontact = async () => {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      setallAddedContact(data.addedContact);
      console.log(data.addedContact);
      setuserDetail(data)
    }

    fetchingChontact()
  }, [])

  const setFavorite = async (favoriteID, currentFavorite) => {

    const updatedFavorite = !currentFavorite;

    const res = await fetch(`${API_BASE}/myfavorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        favoriteID,
        isFavorite: updatedFavorite,
      }),
    }
    );

    const data = await res.json();

    console.log(data);

  };


  return (
    <div className='px-3'>
      <div className='w-100 d-flex justify-content-between border-bottom py-3'>
        <div className='w-50 input-group rounded-2 border shadow-sm overflow-hidden w-100'>
          <span className="input-group-text bg-transparent border-0 ps-3">
            <i className="fa-solid fa-magnifying-glass" aria-label></i>
          </span>
          <input
            className="form-control border-0 bg-transparent shadow-none"
            type="search"
            placeholder="Search contact...."
            aria-label="Search"
          />
        </div>
        <div className='profile-name w-50 text-end px-4 align-content-center'>
          <h5>{userDetail?.name}</h5>
        </div>
      </div>
      <div className='w-100 p-4'>
        <div>
          <div className='w-100 d-flex flex-wrap justify-content-between gap-2'>
            <div>
              <h5 className='text-black fw-bold'>Welcome back, {userDetail?.name}</h5>
              <p>Here what's happening with your contact today.</p>
            </div>
            <div className='d-flex gap-2 justify-content-center align-items-center'>
              <button className='btn shadow-sm border-3 border-light bg-transparent'><i className="fa-solid fa-arrow-up"></i>Import</button>
              <a href='addContact' className='btn btn-primary border border-light text-white text-decoration-none'><i className="fa-solid fa-plus"></i>Add Contact</a>
            </div>
          </div>
        </div>
      </div>

      <div className='w-100 px-4'>
        {<ContactStatusFunc />}
      </div>

      <div className='w-100 p-4'>
        <section className='w-100 d-flex flex-column shadow rounded-2 px-2 border border-1'>
          <div className='d-flex p-2 justify-content-between align-items-center'>
            <div>
              <h5 className='text-black'>All Contacts</h5>
            </div>
            <div className='d-flex gap-2 align-item-center'>
              <button className='btn border border-2 bg-transparent'>All Contact<i className="fa-solid fa-angle-down"></i></button>
              <button className='btn border border-2 bg-transparent'><i className="fa-solid fa-filter"></i>Filter</button>
              <button className='btn bg-transparent '><i className="fa-solid fa-ellipsis-vertical"></i></button>
            </div>
          </div>

          <div className='p-2'>
            <div className="row align-items-center border-bottom contact-table-header">
              <p className="col">Name</p>
              <p className="col">Phone</p>
              <p className="col">Email</p>
              <p className="col">Added On</p>
              <p className="col">Actions</p>
            </div>
            {
              allAddedContact?.length > 0 ? allAddedContact.map((v, k) => (
                <div key={k} className='row py-2 contact-row'>
                  <h6 className='col w-25'>{v.name}</h6>
                  <p className='col '>{v.phone}</p>
                  <p className='d-flex col w-25 flex-wrap'>{v.email}</p>
                  <p className='col '><i className="fa-regular fa-calendar"></i>07 May 2026</p>
                  <a style={{ cursor: 'default' }} href="" className='text-decoration-none col text-black'>
                    <i className="fa-solid fa-pencil btn text-black"></i>
                    <button onClick={(e) => {
                      setFavorite(v._id, v.favorite)
                    }} className='btn bg-transparent text-black'>
                      {v.favorite ? <i className="fa-solid fa-star"></i> : <i className='fa-regular fa-star'></i>}
                    </button>
                  </a>
                </div>
              )) : <div className='p-5 text-center'><h5 className='fw-bold text-black'>No Contect were added yet!</h5></div>
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
