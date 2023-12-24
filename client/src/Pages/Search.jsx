import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row gap-4'>
        <div className="border-b-2 md:border-r-2 md:min-h-screen p-6">
            <form className='flex flex-col gap-8'>
                <div className='flex gap-2 items-center'>
                    <label className='whitespace-nowrap font-semibold'>Search Term: </label>
                    <input type="search" id="search"
                    placeholder='Search...'
                    className='border rounded-lg p-3 w-full' />
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                    <label className='font-semibold'>Type: </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="all"
                        className='w-5' />
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent"
                        className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale"
                        className='w-5' />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer"
                        className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center flex-wrap'>
                    <label className='font-semibold'>Amenities: </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="parking"
                        className='w-5' />
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="furnished"
                        className='w-5' />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex gap-2 items-center flex-wrap'>
                    <label className='font-semibold'>Sort : </label>
                    <select id="sort_order" className='p-3 rounded-lg'>
                        <option value="">Price Hight to Low</option>
                        <option value="">Price Low to High</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>
                <button className='w-full rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80 p-3'>Search</button>
            </form>
        </div>
        <div className='text-3xl text-slate-700 font-semibold p-3 border-b'>
            <h1>Listing Results</h1>
        </div>
    </div>
  )
}
