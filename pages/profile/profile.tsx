import { auth } from "firebase/clientApp";
import { IProfile } from "lib/types/Profile";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  const [ user, loading, error ] = useAuthState(auth);
  const [ profile, setProfile ] = useState({} as IProfile)

  useEffect(() => {

    if (user) {
      setProfile({
        email: user.email,
        displayName: user.displayName,
      })
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <div>
      {profile.displayName}
    </div>
  );
}

export default Profile;