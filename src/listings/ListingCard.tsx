import { Link } from "react-router-dom";

interface ListingCardProps {
    id: string;
    title: string;
    price: number;
    photoUrl: string;
}

function ListingCard({ id, title, price, photoUrl }: ListingCardProps) {
    return (
        <div>
            <img src={`${photoUrl}`} width="250px" />
            <h3>{title}</h3>
            <p>{"$" + Intl.NumberFormat("en-US").format(price)} / day</p>
            <Link to={`/listings/${id}`}>More details</Link>
        </div>
    );

}

export default ListingCard;
