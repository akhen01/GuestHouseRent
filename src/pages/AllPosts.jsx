import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"
import { Link } from 'react-router-dom'
function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      setPosts(posts.documents)
    })
  }, [])
  return (
    <div className='w-full py-8'>
      <h1 className='text-gray-700 text-5xl text-center font-times font-extrabold mb-4'>Listings...</h1>
      <hr />
      <span></span>
      <div className='ml-2 w-full'>
            <h1 className='text-md'>
                {posts ? posts.length : 0} homes available
            </h1>
            <Link className='text-yellow-700 text-md hover:underline'>
                Learn about our standards
            </Link>
        </div>
        <div className="bg-yellow-100 flex flex-wrap">
        {posts.map((post) => (
          <div className='p-2 w-full sm:w-1/2' key={post.$id}>
            <PostCard {...post} show={false}/>
          </div>
        ))}
        </div>
    </div>
  )
}

export default AllPosts
