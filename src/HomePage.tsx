import { useEffect, useState } from "react";
import ListingList from "./ListingList";
import { ListingInterface } from "./interfaces";
import ShareBnbApi from "./api/api";

function HomePage() {
    const [listings, setListings] = useState<ListingInterface[] | null>(null);

    useEffect(function getLisitingsOnMount() {
        console.log("homepage useeffect");
        search();
    }, []);

    async function search(title?: string): Promise<void> {
        const listings = await ShareBnbApi.getListings(title);
        console.log(listings, "listings state");
        setListings(listings);
    }

    if (!listings) return <p>Loading...</p>;

    return <ListingList listings={listings} />;

}

export default HomePage;
