import { ListingInterface, UserListingsAndBookingsInterface } from "../interfaces";
import ListingCard from "./ListingCard";

interface ListingListProps {
    listings: UserListingsAndBookingsInterface[] | ListingInterface[];
}

function ListingList({ listings }: ListingListProps) {

    return (
        <div>
            {listings.length === 0 && "No outdoor spaces here..."}
            {listings.map(l => <ListingCard
                key={l.id}
                id={l.id}
                title={l.title}
                price={l.price}
                photoUrl={l.photoUrl}
            />)}
        </div>
    );
}

export default ListingList;
