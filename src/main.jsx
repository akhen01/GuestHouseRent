import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import store from './store/store.js'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {Home, Login, Signup, AddPost, EditPost, Post, AllPosts} from './pages/index.js'
import Protected from './components/Protected.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>)
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>)
      },
      {
        path: "/post/:slug",
        element: (
          <Protected authentication={true}>
            <Post />
          </Protected>)
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>)
      },
      {
        path: "/add-post/",
        element: (
          <Protected authentication={true}>
            <AddPost />
          </Protected>)
      },
      {
        path: "/all-posts/",
        element: (
          <Protected authentication={true}>
            <AllPosts />
          </Protected>)
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
