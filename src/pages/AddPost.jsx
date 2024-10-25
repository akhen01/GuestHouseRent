import React from 'react'
import Container from '../components/container/Container'
import PostForm from '../components/PostForm'
import { useSelector } from 'react-redux'

function AddPost() {
  const userData = useSelector((state) => state.auth.userData)
  const isAuther = userData.$id === "66d04b27000b32bfc2cc"
  
  if(isAuther) 
    {
    return (
      <Container> 
      <PostForm />
    </Container>
  )
  }else {
  <h1>Sorry You are not autherized to view this page!!</h1>
  }
}

export default AddPost
