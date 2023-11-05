import { Link } from "react-router-dom";

interface ListingCardProps {
    id: string;
    title: string;
    price: string | number;
    photoUrl: string;
}

function ListingCard({ id, title, price, photoUrl }: ListingCardProps) {
    return (
        <Link to={`/listings/${id}`} className="mt-4">
            <div className="w-full rounded-lg overflow-hidden shadow mb-3">
                <img className="object-cover object-center w-full aspect-square"
                    src={`${photoUrl}`} />
            </div>
            <div className="flex flex-col items-baseline justify-between">
                <h3 className="text-xl text-neutral-900">{title}</h3>
                <p className="text-neutral-800">
                    <span className="font-semibold">
                        {"$" + Intl.NumberFormat("en-US").format(price as number)}
                    </span> / day
                </p>
            </div>
        </Link>
    );

}

export default ListingCard;
