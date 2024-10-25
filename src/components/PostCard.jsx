import React from 'react'
import { Link } from 'react-router-dom'
import ImagePreview from './ImagePreview'
import Bed from "../assets/bedicon.png"
import Bath from "../assets/bathicon.png"
import Guest from "../assets/Guestincon.jpg"
import Free from "../assets/free.png"
import appwriteService from '../appwrite/config'

function PostCard({
    name, description, price, 
    address, guests, beds, 
    bedrooms, baths, reserved, 
    facilities, amenities, 
    reservedTill, houseImages, $id,
    show=true
} ) {
  return show ? (
  <div className='bg-white w-full flex flex-col justify-items-start rounded-lg shadow-lg p-1 mb-4'>
    <div className='w-full h-64 rounded-xl p-1'>
    <img className="rounded-xl w-full object-scale-down h-64 mb-2" src={appwriteService.previewFile(houseImages[1])} alt="" />
    </div>
    <h1 className='capitalize text-2xl md:text-3xl font-semibold w-full m-4 font-teko'>
      {name}
    </h1>
  </div>
  ) : (
    <div className='bg-white w-full flex flex-col sm:flex-row justify-items-start rounded-lg shadow-lg px-1 py-1 text-gray-700'>
      <div className='w-full h-72 sm:h-64 overflow-hidden rounded-xl p-1'>
        <ImagePreview imgs={houseImages}/>
      </div>
    <Link className="w-full" to={`/post/${$id}`}>
      
    <div className='font-times w-full rounded-xl p-1 ml-3'>
          <div className='mb-3'>
          <h1 className='text-3xl font-bold w-full '>{name}</h1>
          <p className='text-xl sm:text-lg text-gray-600'>{address}</p>
          </div>
          <div className='flex  mb-4'>
            <div className='text-left flex flex-col justify-start items-center w-1/3 shadow-gray-200/50'>
              <img className='object-scale-down h-5 w-5' src={Guest} alt="" />
              <h4 className='text-lg sm:text-sm font-semibold'>
                {guests.toString()} Guests
              </h4>
            </div>
            
            <div className='text-left  flex flex-col justify-start items-center w-1/3 shadow-gray-200/50'>
              <img className='object-scale-down h-5 w-5' src={Bed} alt="" />
              <h4 className='pl-1 text-lg sm:text-sm font-semibold'>
                {beds.toString()} Bedrooms
              </h4>
            </div>
          
            <div className='flex flex-col justify-start items-center w-1/3 shadow-gray-200/50'>
              <img className='object-scale-down h-5 w-5' src={Bath} alt="" />
              <h4 className='pl-1 text-lg sm:text-sm font-semibold'>
                {baths.toString()} Bathrooms
              </h4>
            </div>

          </div>

          <h4 className={reserved ? "bg-red-200 mb-2 width rounded-sm px-2 w-2/4 text-center text-xl sm:text-lg " : 'flex flex-row items-center bg-yellow-100 mb-2 width rounded-sm px-2 w-2/4 text-center text-xl sm:text-lg'}>
          {!reserved && (<img className='object-scale-down h-8 w-8 mr-2' src={Free} alt="" />)}
            {reserved ? 
              <p>Reserved</p>: <p>Free</p>}
          </h4>
          <h1 className='text-xl sm:text-lg rounded-lg mb-4 mt-8 text-left'>
            Price {price} Birr/m
          </h1>
        </div>
    </Link>
    </div>
  )   
}

export default PostCard
