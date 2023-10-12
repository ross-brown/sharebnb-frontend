import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShareBnbApi from "./api/api";
import { ListingInterface } from "./interfaces";

function ListingDetail() {
  const { id } = useParams();

  const [listing, setListing] = useState<ListingInterface | null>(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function getListing() {
      try {
        const listing = await ShareBnbApi.getListing(id!);
        setListing(listing);
      } catch (error) {
        setErrors(error);
      }
    }
    getListing();
  }, [id]);


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
    </div>
  );
}

export default ListingDetail;
