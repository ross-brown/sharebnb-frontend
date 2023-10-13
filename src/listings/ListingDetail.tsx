import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShareBnbApi from "../api/api";
import { ListingInterface } from "../interfaces";
import { UserContext } from "../contexts";

function ListingDetail() {
  const { id } = useParams();
  const { hasBookedListing, bookListing, cancelBooking, currentUser } = useContext(UserContext);

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
    } else {
      bookListing!(listing!.id);
      setBooked(true);
    }
  }

  if (!listing) return "Loading...";

  return (
    <div>
      <h1>{listing.title}</h1>
      <img src={`${listing.photoUrl}`} width="250px" />
      <p>{listing.description}</p>
      <p>{listing.type}</p>
      <p>${listing.price}</p>
      <p>{listing.location}</p>
      <p>Hosted by: {listing.ownerUsername}</p>
      {currentUser &&
      <button onClick={handleBooking}>{booked ? `Cancel reservation` : `Book now!`}</button>
      }
    </div>
  );
}

export default ListingDetail;
