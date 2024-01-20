import { ListingInterface } from "../interfaces";

interface ListingDetailContentProps {
  listing: ListingInterface;
}

function ListingDetailContent({ listing }: ListingDetailContentProps) {
  return (
    <>
      <h1 className="text-2xl font-bold text-neutral-800">{listing.title}</h1>
      <p className="text-lg font-medium text-neutral-600"> hosted by {listing.ownerUsername}</p>
      <p className="text-neutral-900 text-lg mt-6">{listing.description}</p>
      <p className="mt-4 text-lg font-medium text-neutral-600">{listing.location}</p>
      <p className="text-lg font-medium text-neutral-600">{listing.type}</p>
      <p className="text-lg font-medium text-neutral-600">${listing.price} / day</p>
    </>
  );
}

export default ListingDetailContent;
