import { Link } from "react-router-dom";
import { ListingInterface } from "./interfaces";


function ListingCard({id, title, description, price, location, type, photoUrl, ownerUsername}:ListingInterface){
    return (
        <div>
            <img src={`${photoUrl}`}/>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{type}</p>
            <p>${price}</p>
            <p>{location}</p>
            <p>Hosted by: {ownerUsername}</p>
            <Link to={`/listings/${id}`}>More details</Link>
        </div>
    )

}

export default ListingCard;