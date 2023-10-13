import { useContext } from "react";
import ListingList from "../listings/ListingList";
import ProfileForm from "./ProfileForm";
import { UserContext } from "../contexts";
import Loading from "../common/Loading";

function ProfilePage() {
    const { currentUser } = useContext(UserContext);
    //idk if this is will screw up other things...
    //add state for bookings
    //add useEffect to fetch all listings and then filter them by hasBooked
    // set the state for bookings to that filtered list and pass down as props

    if (!currentUser) return <Loading />;

    return (
        <>
            <div>
                <h2>Your profile</h2>
                <ProfileForm />
            </div>
            <div>
                <h2>Your listings</h2>
                <ListingList listings={currentUser.listings} />
                <h2>Your bookings</h2>
                <ListingList listings={currentUser.bookings} />
            </div>
        </>
    );
}

export default ProfilePage;
