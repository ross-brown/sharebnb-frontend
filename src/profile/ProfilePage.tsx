import { useContext } from "react";
import ListingList from "../listings/ListingList";
import ProfileForm from "./ProfileForm";
import { UserContext } from "../contexts";
import Loading from "../common/Loading";

function ProfilePage() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) return <Loading />;

    return (
        <>
            <div>
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
