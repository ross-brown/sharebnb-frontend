import { useContext, useEffect, useState } from "react";
import ListingList from "../listings/ListingList";
import ProfileForm from "./ProfileForm";
import { UserContext } from "../contexts";
import Loading from "../common/Loading";
import ShareBnbApi from "../api/api";
import { ListingInterface } from "../interfaces";

function ProfilePage() {
    const { currentUser, hasBookedListing } = useContext(UserContext);
    const [bookings, setBookings] = useState<ListingInterface[]>([]);

    useEffect(() => {
        async function getListings() {
            const data = await ShareBnbApi.getListings("");
            const bookings = data.filter(l => hasBookedListing!(l.id));
            setBookings(bookings);
        }
        getListings();
    }, []);

    if (!currentUser) return <Loading />;

    return (
        <>
            <div className="mt-8">
                <ProfileForm />
            </div>
            <div>
                <ListingList title="Your listings" listings={currentUser.listings} />
                <ListingList title="Your bookings" listings={bookings} />
            </div>
        </>
    );
}

export default ProfilePage;
