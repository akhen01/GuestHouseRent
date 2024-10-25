import React, { useEffect, useState, useRef } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
import Background from "../assets/welcomebackground.jpg"
import PostCard from '../components/PostCard'

function Home() {
  const [posts, setPosts] = useState([])
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
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])
  return(
    <div className="w-full items-center justify-center text-center py-8">

            {/* welcome with image */}
      <div>

        <div className='flex flex-col md:-mb-12'>
            <img className="-mt-8 -mb-20 lg:mb-0" src={Background} alt="" />
            <h1 className='text-4xl md:text-8xl md:-mt-32 mb-6 text-white font-bold font-teko '>
                WELCOME TO BRAND NAME
            </h1>
        </div>

          {/* What and Why We do it */}
        <div className='flex flex-col font-hind'>
            <div className='w-full mt-4 bg-yellow-100 rounded-t-3xl border-b-2 pb-6 pt-4'>
                
                <h1 className=' text-lg sm:text-xl md:text:text-2xl font-bold text-center font-teko mb-2'>
                    Welcome to our secure and trustworthy home rental website. 
                </h1>
                <p className='my-4 px-2 text-justify font-hind'>
                    We pride ourselves on offering rentals that are not only affordable but also impeccably clean and well-maintained. 
                    Our platform focus on trust, competitive pricing, and cleanliness, we aim to create a cozy and welcoming environment for all our tenants. 
                    Our vision is to expand our rental chains across Africa, bringing our exceptional service and cozy homes to more communities. 
                    
                </p>
                <Link to="/all-posts" className='bg-white text-yellow-700 text-md rounded-xl p-2 shadow-black border-2 border-black hover:bg-black'>
                    Join us on this journey and find your perfect home today!
                </Link>
                {/* our percs */}
            </div>
            <div className='w-full mt-2 mb-8'>
                <ul className="flex flex-col sm:flex-row text-left my-2 w-full">
                    <li className='w-full sm:w-1/2 m-2 sm:border-r-2 border-b-2 sm:border-b-0 pb-6 font-teko font-semibold'>
                        <p className='text-8xl text-yellow-300 '>1</p>
                        <h1 className='text-xl'>
                        Your comfort and peace of mind are our top priorities.
                        </h1>
                    </li>
                    <li className='w-full sm:w-1/2 m-2 font-teko font-semibold'>
                    <p className='text-8xl text-yellow-300'>2</p>
                    <h1 className='text-xl'>
                        Every listing is verified for authenticity, providing you with a seamless and stress-free rental experience.
                    </h1>
                    </li>
                </ul>
            </div>
            <hr />
            {/* vision */}
            <h1 className='text-3xl font-extrabold m-4 font-teko'>
                Our Grand vision is to expand our rental chains across <p className='text-yellow-600 text-5xl'>Africa</p> 
            </h1>
        </div>
      </div>
      
      <hr />
      {/* list of homes */}
      <div className='m-4'>
          <h1 className='text-4xl font-bold font-serif'>Our Popular Listings</h1>
          <div ref={scrollContainerRef} className='mt-6 flex overflow-x-auto no-scrollbar lg:justify-between items-center lg:flex-row  p-4'>
            <button
            onMouseEnter={() => startScrolling('left')}
            onMouseLeave={stopScrolling}
             className="bg-transparent lg:bg-gray-200 lg:hover:bg-gray-500 lg:text-white py-2 px-4 rounded-full ml-4" >
                &lt;
            </button>
            {posts && (
              posts.map((post) => (
                <div key={post.$id}>
                  <PostCard {...post} show={true}/>
                </div>
              ))
            )}
              
              <button
              onMouseEnter={() => startScrolling('right')}
              onMouseLeave={stopScrolling} 
              className="bg-transparent lg:bg-gray-200 lg:hover:bg-gray-500 lg:text-white py-2 px-4 rounded-full mr-4">
                &gt;
              </button>
          </div>
      </div>

    </div>
  )
}

export default Home
