import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShareBnbApi from "../api/api";
import { ListingInterface } from "../interfaces";
import { useCurrentUser } from "../contexts";
import { getErrorMsg } from "../utils";
import { ListingDetailSkeleton } from "../skeletons";

function ListingDetail() {
  const { id } = useParams();
  const { hasBookedListing, bookListing, cancelBooking, currentUser } = useCurrentUser();

  const [listing, setListing] = useState<ListingInterface | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [booked, setBooked] = useState<boolean>();


  useEffect(() => {
    async function getListing() {
      try {
        const listing = await ShareBnbApi.getListing(id!);
        setListing(listing);
        setBooked(hasBookedListing(listing.id));
      } catch (errs) {
        const messages = getErrorMsg(errs);
        setErrors(messages);
        console.log(errors);
      }
    }
    getListing();
  }, [hasBookedListing, id]);

  function handleBooking() {
    if (!listing) return;

    if (booked) {
      cancelBooking(listing.id);
      setBooked(false);
    } else {
      bookListing(listing.id);
      setBooked(true);
    }
  }

  function handleRemove() {
    console.log("Removed clicked");
  }

  function handleEdit() {
    console.log("Clicked Edit button");
  }

  if (!listing) return <ListingDetailSkeleton />;

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 p-4">
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
          <button
            onClick={handleBooking}
            className="mt-12 block px-5 py-3 rounded-lg
          bg-green-600 hover:bg-green-500 focus:outline-none
            focus:ring focus:ring-offset-2 focus:ring-green-400
            focus:ring-opacity-50 active:bg-green-700
          text-white shadow-lg uppercase tracking-wider
            font-semibold text-sm sm:text-base"
          >
            {booked ? `Cancel reservation` : `Book now!`}
          </button>
        }
        {(currentUser && listing.ownerUsername === currentUser.username) && (
          <div className="flex flex-col items-start gap-y-6 mt-6">
            <button
              onClick={handleEdit}
              className="block px-5 py-3 rounded-lg
              bg-green-600 hover:bg-green-500 focus:outline-none
                focus:ring focus:ring-offset-2 focus:ring-green-400
                focus:ring-opacity-50 active:bg-green-700
              text-white shadow-lg uppercase tracking-wider
                font-semibold text-sm sm:text-base"
            >
              Edit Listing
            </button>
            <button
              onClick={handleRemove}
              className="block px-5 py-3 rounded-lg
              bg-rose-600 hover:bg-rose-500 focus:outline-none
                focus:ring focus:ring-offset-2 focus:ring-rose-400
                focus:ring-opacity-50 active:bg-rose-700
              text-white shadow-lg uppercase tracking-wider
                font-semibold text-sm sm:text-base"
            >
              Delete Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingDetail;
