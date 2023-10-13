import { ListingInterface, UserListingsAndBookingsInterface } from "../interfaces";
import ListingCard from "./ListingCard";

interface ListingListProps {
    listings: UserListingsAndBookingsInterface[] | ListingInterface[];
}

function ListingList({ listings }: ListingListProps) {

    return (
        <div className=" mx-auto px-8 lg:px-12 py-8">
            <h2 className="text-xl text-gray-900 2xl:text-center">Section heading</h2>
            <p className="mt-2 text-gray-600 2xl:text-center">Some text about this new section.</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8
        2xl:grid-cols-4 2xl:max-w-7xl 2xl:mx-auto">
                {listings.length === 0 && "No outdoor spaces here..."}
                {listings.map(l => <ListingCard
                    key={l.id}
                    id={l.id}
                    title={l.title}
                    price={l.price}
                    photoUrl={l.photoUrl}
                />)}
            </div>
        </div>
    );
}

export default ListingList;
