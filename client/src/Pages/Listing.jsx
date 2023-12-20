import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [listing, setListing] = useState(null)
    const params = useParams()

    useEffect(()=>{
        const fetchListings = async()=>{
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json()
                if(data.success === false){
                    setLoading(false)
                    setError(true)
                    return;
                }
                setLoading(false)
                setListing(data)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchListings()
    }, [params.listingId])


  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl text-red-700 font-semibold'>Something went Wrong!</p>}
        {listing && !loading && !error && (
            <>
                <Swiper navigation>
                    {listing.imageUrls.map((url)=> (
                        <SwiperSlide key={url}>
                            <div className="h-[550px]" style={{background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}>

                            </div>
                        
                        </SwiperSlide>
                    ) )}
                </Swiper>
            </>
        )}
    </main>
  )
}
