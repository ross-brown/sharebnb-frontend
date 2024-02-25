import { useEffect, useState } from "react";
import ListingList from "../listings/ListingList";
import ProfileForm from "./ProfileForm";
import { useCurrentUser } from "../contexts";
import Loading from "../common/Loading";
import ShareBnbApi from "../api/api";
import { ListingInterface } from "../interfaces";
import DangerZone from "./DangerZone";

function ProfilePage() {
    const { currentUser, hasBookedListing } = useCurrentUser();
    const [bookings, setBookings] = useState<ListingInterface[] | null>(null);

    useEffect(() => {
        async function getBookings() {
            const listings = await ShareBnbApi.getListings("");
            const bookings = listings.filter(l => hasBookedListing(l.id));
            setBookings(bookings);
        }
        getBookings();
    }, []);

    if (!currentUser) return <Loading />;

    return (
        <>
            <ProfileForm />
            <DangerZone />
            <ListingList title="Your listings" listings={currentUser.listings} />
            <ListingList title="Your bookings" listings={bookings} />
        </>
    );
}

export default ProfilePage;
