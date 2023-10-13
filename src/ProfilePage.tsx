import { useContext } from "react";
import ListingList from "./ListingList";
import ProfileForm from "./ProfileForm";
import { UserContext } from "./contexts";

function ProfilePage() {
    const { currentUser } = useContext(UserContext);


    return (
        <>
            <ProfileForm />
            <h1>Your listings</h1>
            <ListingList listings={currentUser!.listings}/>
            <h1>Your bookings</h1>
            <ListingList listings={currentUser!.bookings}/>
        </>
    );
}

export default ProfilePage;