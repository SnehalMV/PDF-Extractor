import { useDispatch, useSelector } from "react-redux"
import { logout } from "../utils/store/userSlice";
import { useNavigate } from "react-router-dom";
import instance from "../utils/apiInstance"


const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(store => store.user)
  const isLoggedIn = user.success

  const handleLogout = async () => {
    await instance.post('/logout', {}, { withCredentials: true })
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="flex justify-between items-center p-2 bg-rose-400 ">
      <div className="flex items-center m-2 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p className="text-2xl">PDF Extractor</p>
      
      </div>

      {isLoggedIn &&
        <div className="flex m-2 p-1 text-white items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>

          <p className="mr-4 ml-1 text-sm">{user.username}</p>
          <button className="text-xs bg-red-600 hover:bg-white duration-200 hover:text-red-600 font-semibold  p-1 rounded-md" onClick={handleLogout}>LOGOUT</button>
        </div>
      }

    </div>
  )
}

export default Header