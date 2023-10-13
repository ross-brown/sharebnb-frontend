import { useContext } from "react";
import ListingList from "../listings/ListingList";
import ProfileForm from "./ProfileForm";
import { UserContext } from "../contexts";
import Loading from "../common/Loading";

function ProfilePage() {
    const { currentUser } = useContext(UserContext);
    // const [bookings, setBookings] = useState([]);
    //idk if this is will screw up other things...
    //add state for bookings
    //add useEffect to fetch all listings and then filter them by hasBooked
    // set the state for bookings to that filtered list and pass down as props


    if (!currentUser) return <Loading />;

    return (
        <>
            <div className="mt-8">
                <ProfileForm />
            </div>
            <div>
                <ListingList title="Your listings" listings={currentUser.listings} />
                <ListingList title="Your bookings" listings={currentUser.bookings} />
            </div>
        </>
    );
}

export default ProfilePage;
