import { useState } from "react"
import UserCard from "./UserCard"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"

const EditProfile = ({ user }: any) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState("")
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();



 const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err : any) {
      setError(err.response.data);
    }
  };




  return (
    <div className="flex justify-center  my-20 min-h-screen overflow-hidden ">
    <div className="flex justify-center mx-20 ">
      <div className="card bg-base-300 w-96 shadow-sm  max-h-[90vh] overflow-y-auto">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
         <div>
              <label className="form-label">
                <legend className="fieldset-legend">First Name</legend>
                <input 
                  className="input input-bordered w-full max-w-xs h-12 "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-label">
                <legend className="fieldset-legend">Last Name</legend>
                <input 
                  className="input input-bordered w-full max-w-xs h-12 "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-label">
                <legend className="fieldset-legend">Photo URL</legend>
                <input 
                  className="input input-bordered w-full max-w-xs h-12 "
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>

              <label className="form-label">
                <legend className="fieldset-legend">Age</legend>
                <input 
                  className="input input-bordered w-full max-w-xs h-12 "
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>

              <label className="form-label">
                <legend className="fieldset-legend">Gender</legend>
                <input 
                  className="input input-bordered w-full max-w-xs h-12 "
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="form-label">
                <legend className="fieldset-legend">About</legend>
                <input 
                  className="input input-bordered w-full max-w-xs h-12 "
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

               
               </div>
               <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center my-2">
            <button  onClick={saveProfile} className="btn btn-primary">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>

  
   <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
    {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      
    </div>

  )
}

export default EditProfile
