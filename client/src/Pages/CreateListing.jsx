import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useState } from "react"
import { app } from "../firebase"

export default function CreateListing() {

  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageURLs: []
  });
  const [imageUploadError, setImageUploadError] = useState(false)
  const handleImageSubmit = (e)=> {
    if(files.length > 0 && files.length + formData.imageURLs.length < 7){
      const arrFiles = []
      for (let i = 0; i < files.length; i++) {
        arrFiles.push(storeImage(files[i]))
      }
      Promise.all(arrFiles).then(urls => {
        setFormData({
          ...formData, imageURLs: formData.imageURLs.concat(urls)
        })
        setImageUploadError(false)
      }).catch(err => {
        setImageUploadError('Image Upload fialed (2 mb max per Image', err)
      })
    }else{
      setImageUploadError('You can upload 6 images per Lisitng')
    }
  }
  const storeImage = async(file) => {
    return new Promise((resolve,reject)=>{
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on("state_changed",
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% Done`)
      }, (error)=>{
        reject(error)
      },()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          resolve(downloadURL)
        });
      })
    })
  }

  const handleImageRemove = (index)=> {
    setFormData({
      ...formData,
      imageURLs: formData.imageURLs.filter((_,i)=> i !== index),
    })
  }
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
            <input type="file" onChange={(e)=> setFiles(e.target.files)} className="border border-gray-300 rounded w-full p-3 gap-4" id="images" accept="image/*" multiple />
            <button type="button" onClick={handleImageSubmit} 
              className="border border-green-700 text-green-700 rounded-lg p-3 uppercase hover:shadow-lg hover:opacity-95 disabled:opacity-80">upload</button>
          </div>
            <p className="text-red-700">{imageUploadError && imageUploadError}</p>
            {
              formData.imageURLs.length > 0 && formData.imageURLs.map((url, index) => (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <img key= {url} src={url} alt="listing Images" className="object-fit w-20 h-20 rounded-lg"/>
                  <button type="button" onClick={() => handleImageRemove(index)} className="text-red-700 hover:opacity-95">Delete</button>
                </div>
              ))
            }
          <button className="border bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Create listing</button>
        </div>
      </form>
    </main>
  )
}
