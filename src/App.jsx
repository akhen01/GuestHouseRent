import { useEffect, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,  logout } from './store/AuthSlice'
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getcurrentuser()
        .then((userData) => {
            if (userData) dispatch(login({ userData }));
            else dispatch(logout());
        })
        .finally(() => setLoading(false));
}, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between ">
        <div className="w-full block">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
        <div className="w-full block">
            <Footer />
        </div>
    </div>
) : null;
}

export default App
