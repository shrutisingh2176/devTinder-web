import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import type { AxiosError } from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("bittu1234@gmail.com")
  const [password, setPassword] = useState("Bittu@123")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();
   const [error, setError] = useState("");

  const handleLogin = async () => {
     try { 
      const res = await axios.post(`${BASE_URL}/login`, { 
       emailId,
        password,
      } , { withCredentials: true })  // to send cookies along with the request
          //console.log(res.data);
          dispatch(addUser(res.data))  // dispatching the user data to the redux store , user data is stored in store  
         return navigate("/")  // navigate to home page after successful login
    } catch (err: any) {
      setError(err?.response?.data || "Something went wrong");
    
    }
  }

   const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    }   catch (err: unknown) {
  const error = err as AxiosError<{ message: string }>;

  setError(
    error.response?.data?.message || "Something went wrong"
  );
}
  };

  return (
    
    <div className="flex justify-center my-20  ">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
         <div>

             { !isLoginForm &&(<>
             <label className="form-label">
                <legend className="fieldset-legend" >First Name</legend>
                <input
                 className="input input-bordered w-full max-w-xs h-12 " 
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

               <label className="form-label">
                <legend className="fieldset-legend" >Last Name</legend>
                <input
                 className="input input-bordered w-full max-w-xs h-12 " 
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label> </>)}

              <label className="form-label">
                <legend className="fieldset-legend">Email-Id</legend>
                <input 
                  className="input input-bordered w-full max-w-xs h-12 "
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>

              <label className="form-label">
                <legend className="fieldset-legend" >Password</legend>
                <input
                 className="input input-bordered w-full max-w-xs h-12 " 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
               
               </div>
               <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary"  onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer py-2"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
      
  )
}

export default Login
