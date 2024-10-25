import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import Bath from '../assets/bathicon.png'
import Bed from '../assets/bedicon.png'
import Guest from '../assets/Guestincon.jpg'

function Post() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuther = userData.$id === "66d04b27000b32bfc2cc"
  const [date, setDate] = useState("")

  const scrollContainerRef = useRef(null);
  let scrollInterval;

  const startScrolling = (direction) => {
    if (scrollContainerRef.current) {
      scrollInterval = setInterval(() => {
        scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -10 : 10, behavior: 'smooth' });
      }, 50);
    }
  };

  const stopScrolling = () => {
    clearInterval(scrollInterval);
  };
  
  useEffect(() => {
    if(slug){
      appwriteService.getPost(slug).then((post)=> {
        setPost(post)
        const dates = new Date(post.reservedTill.date); // Convert to Date object
        setDate(dates.toLocaleDateString())
      })
    }else {
      navigate("/")
    }
  }, [slug, navigate])
      

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if(status){
        try {
          post.houseImages.map((ids) => {
            appwriteService.deleteFile(ids)
          })
          navigate("/")
        } catch (error) {
          console.log(error)
        }
      }
    })
  }
  const deleteImage = async(id) => {
    try {
      let ids = id
      await appwriteService.deleteFile(ids).then((status) => {
        if(status){
          console.log(id)
          appwriteService.updatePost(post.$id, {houseImages : post.houseImages.pop()})
          navigate("/")
        }
      })
    } catch (error) {
      console.log(error)
    }
    
    
  }
  return (
    <div className='py-8'>
      <Container>
        <div ref={scrollContainerRef} className='w-full flex justify-center mb-4 relative border rounded-xl p-2 overflow-x-auto no-scrollbar items-center'>
        
          <button
            onMouseEnter={() => startScrolling('left')}
            onMouseLeave={stopScrolling}
             className="bg-transparent lg:bg-gray-200 lg:hover:bg-gray-500 lg:text-white py-4 px-6 rounded-full ml-4" >
                &lt;
          </button>

          {post?.houseImages &&(
            post.houseImages.map((ids) => (
              <div className="mb-4" key={ids}>
                <img src={appwriteService.previewFile(ids)} alt="" />
                {
                  isAuther && (
                  <Button className="bg-red-800" onClick={()=>deleteImage(ids)}>
                    Delete File
                  </Button>
                  )
                }
              </div>
            )))
          }
          {
            isAuther && (
              <div className="absolute-right-6 top-6">
                <Link to={`/edit-post/${post?.$id}`}>
                  <Button bgColor='bg-green-500' className="mr-3">Edit</Button>
                </Link>
                <Button bgColor='bg-red-500' onClick={deletePost}>
                  Delete Post
                </Button>
              </div>
            )
          }
          <button
              onMouseEnter={() => startScrolling('right')}
              onMouseLeave={stopScrolling} 
              className="bg-transparent lg:bg-gray-200 lg:hover:bg-gray-500 lg:text-white py-4 px-6 rounded-full mr-4">
                &gt;
              </button>
        </div>
        <div className='bg-white w-full flex flex-col justify-items-start rounded-lg shadow-lg px-1 py-1'>    
        <div className='w-full rounded-xl p-1 ml-3'>
          <div className='mb-3'>
          <h1 className='text-2xl md:text-3xl font-bold w-full capitalize '>{post?.name}</h1>
          <p className='text-xl'>{post?.address}</p>
          </div>
          <div className='flex w-full mb-4'>
            <div className='flex flex-col justify-start items-center w-1/3  shadow-lg shadow-gray-200/50'>
              <img className='object-scale-down h-5 w-5' src={Guest} alt="" />
              <h4 className='text-sm font-semibold'>
                {post?.guests.toString()} Guests
              </h4>
            </div>
            
            <div className='flex flex-col justify-start items-center w-1/3  shadow-lg shadow-gray-200/50'>
              <img className='object-scale-down h-5 w-5' src={Bed} alt="" />
              <h4 className='pl-1 text-sm font-semibold'>
                {post?.beds.toString()} Bedrooms
              </h4>
            </div>
          
            <div className='flex flex-col justify-start items-center w-1/3  shadow-lg shadow-gray-200/50'>
              <img className='object-scale-down h-5 w-5' src={Bath} alt="" />
              <h4 className='pl-1 text-sm font-semibold'>
                {post?.baths.toString()} Bathrooms
              </h4>
            </div>

          </div>

          <h4 className={post?.reserved ? "bg-red-200 shadow-md mb-1 rounded-lg " : 'bg-yellow-100 mb-2 width rounded-sm px-2 w-2/4 text-center'}>
            {post?.reserved ? "Reserved" : "Free"}
          </h4>
          <h1 className='text-lg rounded-lg mb-4 mt-8 text-left'>
            Price: {post?.price} Birr/m
          </h1>
        </div>
        <hr />

        <div className='w-full rounded-xl p-1 ml-3'>
          <hr />
        <p className='py-8 text-lg rounded-lg mb-4 mt-8 text-fill'>
          {post?.description}
        </p>
        <hr />
        <h1 className='text-lg rounded-lg mb-4 mt-8 text-left'>
          Ameneties: {post?.amenities}
        </h1>
        <h1 className='text-lg rounded-lg mb-4 mt-8 text-left'>
            Facilities: {post?.facilities}
          </h1>
        </div>
    </div>
      </Container>
    </div>
  )
}


export default Post
