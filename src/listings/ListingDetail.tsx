import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ShareBnbApi from "../api/api";
import { ListingInterface } from "../interfaces";
import { UserContext } from "../contexts";
import Loading from "../common/Loading";
import { getErrorMsg } from "../utils";

function ListingDetail() {
  const { id } = useParams();
  const { hasBookedListing, bookListing, cancelBooking, currentUser } = useContext(UserContext);

  const [listing, setListing] = useState<ListingInterface | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [booked, setBooked] = useState<boolean>();


  useEffect(() => {
    async function getListing() {
      try {
        const listing = await ShareBnbApi.getListing(id!);
        setListing(listing);
        setBooked(hasBookedListing!(listing.id));
      } catch (errs) {
        const messages = getErrorMsg(errs);
        setErrors(messages);
        console.log(errors);
      }
    }
    getListing();
  }, [hasBookedListing, id]);

  function handleBooking() {
    if (booked) {
      cancelBooking!(listing!.id);
      setBooked(false);
    } else {
      bookListing!(listing!.id);
      setBooked(true);
    }
  }

  if (!listing) return <Loading />;

  return (
    <div className="grid grid-cols-2 p-4">
      <div className="p-4">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">

          <img className="object-cover object-center w-full aspect-square" src={`${listing.photoUrl}`} />
        </div>

      </div>
      <div className="p-4">

        <h1 className="text-2xl font-bold text-neutral-800">{listing.title}</h1>
        <p className="text-lg font-medium text-neutral-600"> hosted by {listing.ownerUsername}</p>
        <p className="text-neutral-900 text-lg mt-6">{listing.description}</p>
        <p className="mt-4 text-lg font-medium text-neutral-600">{listing.location}</p>
        <p className="text-lg font-medium text-neutral-600">{listing.type}</p>
        <p className="text-lg font-medium text-neutral-600">${listing.price} / day</p>
        {(currentUser && listing.ownerUsername !== currentUser.username) &&
          <button onClick={handleBooking} className=" mt-12 block px-5 py-3 rounded-lg
        bg-green-600 hover:bg-green-500 focus:outline-none
        focus:ring focus:ring-offset-2 focus:ring-green-400
        focus:ring-opacity-50 active:bg-green-700
        text-white shadow-lg uppercase tracking-wider
        font-semibold text-sm sm:text-base">{booked ? `Cancel reservation` : `Book now!`}</button>
        }
      </div>
    </div>
  );
}

export default ListingDetail;
