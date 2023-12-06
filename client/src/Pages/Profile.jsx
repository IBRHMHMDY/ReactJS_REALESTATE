import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'

export default function Profile() {
  const {currentUser} = useSelector((state)=> state.user)
  const fileRef = useRef(null)
  const [imageFile, setImageFile] = useState(undefined)
  const [uploadPerc, setUploadPerc] = useState(0)
  const [uploadFileError, setUploadFileError] = useState(false)
  const [formData, setFormData] = useState({})
  
  // console.log(formData);
  // console.log('Upload is ' + progressPercentage + '% Done');
  // console.log(uploadFileError);
  
  useEffect(()=>{
    if(imageFile){
      // console.log(imageFile);
      handleUploadFile(imageFile)
    }
  }, [imageFile])
  

  const handleUploadFile = (image)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef,image)

    uploadTask.on('state_changed', (snapshot)=> {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadPerc(Math.round(progress))
    },
    (error) => {
      setUploadFileError(true)
    },
    ()=> {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
        setFormData({...formData, avatar: downloadUrl})
      })
    });

  }

  // Firebase Storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-7'>
        <input 
          onChange={(e)=> setImageFile(e.target.files[0])} 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"/>
        <img src={formData.avatar || currentUser.avatar} alt="Profile"
            onClick={()=> fileRef.current.click()} 
            className="rounded-full w-24 h-24 object-cover self-center mt-2 cursor-pointer"/>
        {uploadFileError ? 
          (<p className="text-red-700 text-center">Error Image Upload</p>) :
          uploadPerc > 0 && uploadPerc < 100 ?
          (<p className="text-slate-700 text-center">Uploading {uploadPerc}%</p>) :
          uploadPerc === 100 ? 
          (<p className="text-green-900 text-center">Image Successfully Uploaded!</p>) : ''
        }
        <input type="text" className='p-3 rounded-lg border' placeholder='UserName' id="username" />
        <input type="text" className='p-3 rounded-lg border' placeholder='Email' id="email" />
        <input type="text" className='p-3 rounded-lg border' placeholder='Password' id="password" />
        <button 
          className='text-white bg-slate-700 p-3 rounded-lg hover:opacity-95 disabled:opacity-80 uppercase'>
          Update
        </button>
      </form>
      <div className="flex justify-between items-center">
        <button className="text-red-700 font-semibold p-3 mt-3">Delete Account</button>
        <button className='text-red-700 font-semibold p-3 mt-3'>SignOut</button>
      </div>
    </div>
  )
}
