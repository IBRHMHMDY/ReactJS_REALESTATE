
export default function CreateListing() {
  return (
    <main className="mx-auto max-w-4xl my-3">
      <h1 className="text-center font-semibold p-3 text-4xl my-7">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input type="text" id="name" placeholder="Name" 
          className="border rounded-lg p-3" required/>
          <textarea id="description" placeholder="Description"
          className="border rounded-lg p-3"></textarea>
          <input type="text" id="address" placeholder="Address" 
          className="border rounded-lg p-3" required/>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5"/>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5"/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5"/>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5"/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5"/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input type="number" id="bathrooms" min='1' max='10'
              className="border rounded-lg border-gray-300 p-3" required />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="bedrooms" min='1' max='10'
              className="border rounded-lg border-gray-300 p-3" required />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="regularPrice" min='1' max='10'
              className="border rounded-lg border-gray-300 p-3" required />
              <div className="flex flex-col items-center">
                <p className="font-semibold">Regular Price</p>
                <span className="text-sm">($ / Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" id="discountPrice" min='1' max='10'
              className="border rounded-lg border-gray-300 p-3" required />
              <div className="flex flex-col items-center">
                <p className="font-semibold">Discount Price</p>
                <span className="text-sm">($ / Month)</span>
              </div> 
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images: 
            <span className="font-normal text-gray-600 ml-2">
              the first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input className="border border-gray-300 rounded w-full p-3 gap-4" type="file" id="images" accept="image/*" multiple />
            <button className="border border-green-700 text-green-700 rounded-lg p-3 uppercase hover:bg-green-200">upload</button>
          </div>
        <button className="border bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Create listing</button>
        </div>
      </form>
    </main>
  )
}
