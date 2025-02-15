import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { setUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";


const SignupPage = () => {
  const dispatch = useDispatch()
  const className = "border-b-1 border-gray-400 py-2 text-sm outline-none";
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const initialData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [userData, setUserData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (userData.password !== userData.confirmPassword) {
      return toast.error("Password and confirm password is not same.")
    }
    setLoading(true)
    try {
      const data = await signup(userData);
      if (data.success) {
        dispatch(setUser(data.user))
        toast.success(data.message)
        setUserData(initialData)
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="p-5">
      <div className="max-w-md w-full mx-auto bg-blue-100 my-12 shadow-2xl p-5">
        <h1 className="text-gray-800 text-2xl  mb-3 font-semibold">Create an account</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Enter your username" className={className} required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Enter your email" className={className} required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Enter your password" className={className} required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className={className} required />
          </div>
          <button className="bg-gray-800 text-white p-2 mt-4 hover:bg-gray-900 cursor-pointer " disabled={loading}>
            {
              loading ? 'Loading...' : 'Signup'
            }
          </button>
        </form>
        <p className="text-sm mt-5">Already have an account ? <Link to={"/login"} className="text-blue-600 hover:underline">Login</Link></p>
      </div>
    </section>
  )
}

export default SignupPage