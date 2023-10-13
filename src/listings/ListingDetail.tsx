import { useParams } from "react-router-dom";
import { SetStateAction, useContext, useEffect, useState } from "react";
import ShareBnbApi from "../api/api";
import { ListingInterface, UserListingsAndBookingsInterface } from "../interfaces";
import { UserContext } from "../contexts";
import Loading from "../common/Loading";

function ListingDetail() {
  const { id } = useParams();
  const { hasBookedListing, bookListing, cancelBooking, currentUser, setCurrentUser } = useContext(UserContext);

  const [listing, setListing] = useState<ListingInterface | null>(null);
  const [errors, setErrors] = useState([]);
  const [booked, setBooked] = useState<boolean>();


  useEffect(() => {
    async function getListing() {
      try {
        const listing = await ShareBnbApi.getListing(id!);
        setListing(listing);
        setBooked(hasBookedListing!(listing.id));
      } catch (error) {
        setErrors(error);
      }
    }
    getListing();
  }, [id]);

  function handleBooking() {
    if (booked) {
      cancelBooking!(listing!.id);
      setBooked(false);
      // setCurrentUser!(currentUser => ({
      //   ...currentUser,
      //   data: {
      //     ...currentUser.data,
      //     bookings: (currentUser.data?.bookings || []).filter(b => b.id !== listing!.id),
      //     username: currentUser.data?.username || '',
      //     firstName: currentUser.data?.firstName || '',
      //     lastName: currentUser.data?.lastName || '',
      //     email: currentUser.data?.email || '',
      //     listings: currentUser.data?.listings || []
      //   }
      // }));
    } else {
      bookListing!(listing!.id);
      setBooked(true);
      // setCurrentUser!(currentUser => ({
      //   ...currentUser,
      //   data: {
      //     ...currentUser.data,
      //     bookings: [...(currentUser.data?.bookings || []), listing as UserListingsAndBookingsInterface],
      //     username: currentUser.data?.username || '',
      //     firstName: currentUser.data?.firstName || '',
      //     lastName: currentUser.data?.lastName || '',
      //     email: currentUser.data?.email || '',
      //     listings: currentUser.data?.listings || []
      //   }
      // }));

      // setCurrentUser!(currentUser => ({
      //   ...currentUser,
      //   data: {
      //     ...currentUser.data,
      //     bookings: [...currentUser.data?.bookings, listing],
      //   },
      // }));
    }
  }

  if (!listing) return <Loading />;

  return (
    <div>
      <h1>{listing.title}</h1>
      <p>{listing.location}</p>
      <img src={`${listing.photoUrl}`} width="250px" />
      <p>{listing.type} hosted by {listing.ownerUsername}</p>
      <p>{listing.description}</p>
      <p>${listing.price} / day</p>
      {currentUser &&
        <button onClick={handleBooking}>{booked ? `Cancel reservation` : `Book now!`}</button>
      }
    </div>
  );
}

export default ListingDetail;
