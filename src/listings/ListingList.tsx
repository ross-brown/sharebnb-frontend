import { ListingInterface, UserListingsAndBookingsInterface } from "../interfaces";
import ListingCard from "./ListingCard";
import { ListingListSkeleton } from "../skeletons";
import "react-loading-skeleton/dist/skeleton.css";

interface ListingListProps {
    listings: UserListingsAndBookingsInterface[] | ListingInterface[] | null;
    title: string;
}

function ListingList({ listings, title }: ListingListProps) {

    return (
        <div className=" mx-auto px-8 lg:px-12 py-8">
            <h2 className="text-xl text-gray-900 2xl:text-center font-bold">{title}</h2>
            {!listings
                ? <ListingListSkeleton />
                : <div className="mt-6 grid gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3
                    2xl:grid-cols-4 2xl:max-w-7xl 2xl:mx-auto">
                    {listings.length === 0
                        ? "No outdoor spaces here..."
                        : listings.map(l => <ListingCard
                            key={l.id}
                            id={l.id}
                            title={l.title}
                            price={l.price}
                            photoUrl={l.photoUrl}
                        />)}
                </div>
            }
        </div>
    );
}

export default ListingList;
