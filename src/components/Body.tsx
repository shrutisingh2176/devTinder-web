import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import Footer from "./Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch , useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { use, useEffect } from "react"


const Body =()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store: any)=> store.user);
    const fetchUser = async() => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view",{
                withCredentials: true,
            });
            dispatch(addUser(res.data));

    } catch (err: any) {
            if (err.status === 401){
          navigate("/login");
        }

            console.error('Error fetching user:', err);
        }   
    }

        useEffect (( ) => {
            if (!userData) {
            fetchUser();}
        },[]);


    return(
        <div className="body">
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )


}
 export default Body