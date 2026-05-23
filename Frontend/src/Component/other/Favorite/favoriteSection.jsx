import React, { useEffect, useState } from 'react'
const API_BASE = 'https://contact-manager-app-uux8.onrender.com'


function FavoriteSection() {
    const [favoriteContact, setfavoriteContact] = useState(null)


    useEffect(() => {
        const fetchingFavoriteChontact = async () => {
            const res = await fetch(`${API_BASE}/myfavorite`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await res.json();
            setfavoriteContact(data);
            console.log(data);
        }

        fetchingFavoriteChontact()
    }, [])

    return (
        <div>
            <div className='w-100 p-4'>
                <section className='w-100 d-flex flex-column shadow rounded-2 px-2 border border-1'>
                    <div className='d-flex p-2 justify-content-between align-items-center'>
                        <div>
                            <h5 className='text-black'>All Contacts</h5>
                        </div>
                        <div className='d-flex flex-wrap gap-2 align-items-center'>
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
                        </div>
                        {
                            favoriteContact?.length > 0 ? favoriteContact.map((v, k) => (
                                <div key={k} className='row py-2 contact-row'>
                                    <h6 className='col w-25'>{v.name}</h6>
                                    <p className='col '>{v.phone}</p>
                                    <p className='d-flex col w-25 flex-wrap'>{v.email}</p>
                                    <p className='col '><i className="fa-regular fa-calendar"></i>07 May 2026</p>
                                </div>
                            )) : <div className='p-5 text-center'><h5 className='fw-bold text-black'>No Favorte Contact!</h5></div>
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FavoriteSection
