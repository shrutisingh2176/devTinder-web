import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import type { RootState } from "../utils/appStore"


  const Feed = () => {
 const dispatch = useDispatch();
 const feed = useSelector((store: RootState) => store.feed);

 const getFeed = async () => {
  if (feed.length>0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch (addFeed(res.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }

 };
  useEffect(() => {
    getFeed();
  }, []);
  

  if (!feed || feed.length === 0) {
    return <h1 className="text-center mt-10">No New Users Found</h1>;
  }

   
  return (
    
    <div className="flex justify-center my-10">
      <UserCard  user={feed[0]} />
    </div>
  )

}

export default Feed
