import { useState } from "react"
import axios from "axios"

const Login = () => {
  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try { 
      const res = await axios.post("http://localhost:7777/login", { 
       emailId,
        password,
      } , { withCredentials: true })  // to send cookies along with the request
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return (
    
    <div className="flex justify-center my-20  ">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
         <div>
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
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
      
  )
}

export default Login
