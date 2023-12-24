import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../Components/ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([])
    const [searchData, setSearchData] = useState({
        searchTerm : '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    
    console.log(listings);
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        const typeFromURL = urlParams.get('type');
        const parkingFromURL = urlParams.get('parking');
        const furnishedFromURL = urlParams.get('furnished');
        const offerFromURL = urlParams.get('offer');
        const sortFromURL = urlParams.get('sort');
        const orderFromURL = urlParams.get('order');

        if(searchTermFromURL || typeFromURL || parkingFromURL || furnishedFromURL || offerFromURL || sortFromURL || orderFromURL){
            setSearchData({
                searchTerm: searchTermFromURL || '',
                type: typeFromURL || 'all',
                parking: parkingFromURL=== 'true' ? 'true' : 'false',
                furnished: furnishedFromURL=== 'true' ? 'true' : 'false',
                offer: offerFromURL=== 'true' ? 'true' : 'false',
                sort: sortFromURL || 'createdAt',
                order: orderFromURL || 'desc'
            });
        }

        const fetchListings = async()=>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data)
            setLoading(false)
        }
        fetchListings();
    }, [location.search])


    const handleChange = (e)=> {
        if(e.target.id === 'searchTerm'){
            setSearchData({...searchData, searchTerm: e.target.value})
        }
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSearchData({...searchData, type: e.target.id})
        }
        if(e.target.id === 'rent' || e.target.id === 'sale' && e.target.id === 'all'){
            setSearchData({...searchData, type: e.target.id})
        }
        if(e.target.id === 'all' && e.target.id !== 'rent' && e.target.id !== 'sale'){
            setSearchData({...searchData, type: 'all'})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSearchData({...searchData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'createdAt'
            const order = e.target.value.split('_')[1] || 'desc'
            setSearchData({...searchData, sort, order});
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', searchData.searchTerm);
        urlParams.set('type', searchData.type);
        urlParams.set('parking', searchData.parking);
        urlParams.set('furnished', searchData.furnished);
        urlParams.set('offer', searchData.offer);
        urlParams.set('sort', searchData.sort);
        urlParams.set('order', searchData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
  return (
    <div className='flex flex-col md:flex-row gap-4'>
        <div className="border-b-2 md:border-r-2 md:min-h-screen p-6">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex gap-2 items-center'>
                    <label className='whitespace-nowrap font-semibold'>Search Term: </label>
                    <input type="search" id="searchTerm"
                    placeholder='Search...'
                    className='border rounded-lg p-3 w-full'
                    value={searchData.searchTerm} 
                    onChange={handleChange}/>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                    <label className='font-semibold'>Type: </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="all"
                        className='w-5'
                        value={searchData.type || 'all'}
                        onChange={handleChange} />
                        <span>All</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent"
                        className='w-5'
                        value={searchData.type === 'rent'}
                        onChange={handleChange} />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale"
                        className='w-5'
                        value={searchData.type === 'sale'}
                        onChange={handleChange} />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer"
                        className='w-5' 
                        value={searchData.offer}
                        onChange={handleChange}/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center flex-wrap'>
                    <label className='font-semibold'>Amenities: </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="parking"
                        className='w-5' 
                        value={searchData.parking}
                        onChange={handleChange}/>
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="furnished"
                        className='w-5'
                        value={searchData.furnished}
                        onChange={handleChange} />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center flex-wrap'>
                    <label className='font-semibold'>Sort : </label>
                    <select id="sort_order" className='p-3 rounded-lg'
                    defaultValue={'createdAt_desc'}
                    onChange={handleChange}>
                        <option value="regularPrice_desc">Price Low to High</option>
                        <option value="regularPrice_asc">Price Hight to Low</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button className='w-full rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80 p-3'>Search</button>
            </form>
        </div>
        <div className='text-3xl text-slate-700 font-semibold p-3 border-b'>
            <h1>Listing Results</h1>
            <div className="flex flex-wrap w-full">
            {!loading && listings.length === 0 && (
                <p className='text-slate-700 text-xl text-center w-full m-auto p-7'>No Listing Found</p>
            )}
            {
                loading && (
                    <p className='w-full text-slate-700 text-center p-7 text-2xl'>Loading...</p>
                )
            }{
                !loading && listings && (
                    listings.map((listing)=> (
                        <ListingItem key={listings._id} listing={listing} />
                    ))
                )
            }

            </div>
        </div>
    </div>
  )
}
