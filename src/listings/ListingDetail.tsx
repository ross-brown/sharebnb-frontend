import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShareBnbApi from "../api/api";
import { ListingInterface } from "../interfaces";
import { useCurrentUser } from "../contexts";
import { getErrorMsg } from "../utils";
import { ListingDetailSkeleton } from "../skeletons";
import ListingDetailContent from "./ListingDetailContent";
import Button from "../common/Button";
import ListingEditForm from "./ListingEditForm";

function ListingDetail() {
  const { id } = useParams();
  const { hasBookedListing, bookListing, cancelBooking, currentUser } = useCurrentUser();

  const [listing, setListing] = useState<ListingInterface | null>(null);
  const [booked, setBooked] = useState<boolean>();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function getListing() {
      try {
        const listing = await ShareBnbApi.getListing(id!);
        setListing(listing);
        setBooked(hasBookedListing(listing.id));
      } catch (errs) {
        const messages = getErrorMsg(errs);
        console.log(messages);
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
    console.log("handle edit called");
    setIsEditMode(true);
  }

  async function handleClose() {
    //TODO: find a way to not have to force a reload to see updated lising
    setIsEditMode(false);
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
        {isEditMode
          ? <ListingEditForm listingData={listing} onClose={handleClose} />
          :
          <>
            <ListingDetailContent listing={listing} />
            {(currentUser && listing.ownerUsername !== currentUser.username) && (
              <Button color="green" onClick={handleBooking}>
                {booked ? `Cancel reservation` : `Book now!`}
              </Button>
            )}
            {(currentUser && listing.ownerUsername === currentUser.username) && (
              <div className="flex flex-col items-start">
                <Button color="green" onClick={handleEdit}>Edit Listing</Button>
                <Button color="rose" onClick={handleRemove}>Delete Listing</Button>
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
}

export default ListingDetail;
