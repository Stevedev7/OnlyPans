import { useSelector } from "react-redux"
import { RootState } from "../../store"
import Error from "../Error"
import UserProfile from "./components/UserProfile";

const Profile = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <>
      {
        isAuthenticated ? <div className="container mt-5">
        <UserProfile />
      </div> :
        <Error status={401} message={"Please Login"} />
      }
    </>
  )
}

export default Profile