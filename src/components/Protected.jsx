import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication=true}) {
    const [loading, setLoading] = useState(true)

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoading(false)
    }, [authentication, authStatus, navigate])

  return loading ? null : <>{children}</>
}

export default Protected
