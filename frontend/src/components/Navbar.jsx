import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import useFetchUser from "../hooks/useFetchUser";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../api/auth";
import { setUser } from "../redux/slices/userSlice";



const Navbar = () => {
  useFetchUser();
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const data = await logout();
      if (data.success) {
        dispatch(setUser(null));
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto p-5 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold"><span className="text-red-600">Book</span>Lib</h2>
        </div>
        <div className="flex gap-5 items-center">
          <Link to={"/"}>Home</Link>
         
          {
            user ?<>
            <Link to={"/add-book"}>Add Book</Link>
             <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer">Logout</button>
            </> : <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"} className="bg-gray-700 px-4 py-2">Signup</Link>
            </>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar