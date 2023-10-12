import { ListingInterface } from "./interfaces";
import ListingCard from "./ListingCard";

interface ListingListProps {
    listings: ListingInterface[];
}

function ListingList({listings}:ListingListProps){
    return (
        <div>
            {listings.map(l => <ListingCard
            key={l.id}
            id={l.id}
            title={l.title}
            description={l.description}
            type={l.type}
            price={l.price}
            photoUrl={l.photoUrl}
            ownerUsername={l.ownerUsername}
            location={l.location}
            />)}
        </div>
    )
}

export default ListingList;