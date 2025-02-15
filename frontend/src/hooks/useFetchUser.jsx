import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchUser } from "../api/auth"
import { setUser } from "../redux/slices/userSlice"



const useFetchUser = () => {
   const dispatch = useDispatch()
    useEffect(()=>{
        const getUserFromServer = async() => {
            try{
                const data = await fetchUser();
                if(data.success){
                    dispatch(setUser(data.user))
                }else{
                    dispatch(setUser(null))
                }
            }catch(error){
                console.log(error)
            }
        }
        getUserFromServer()
    })
}

export default useFetchUser