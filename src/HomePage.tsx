import { useEffect, useState, useContext } from "react";
import ListingList from "./listings/ListingList";
import { ListingInterface } from "./interfaces";
import ShareBnbApi from "./api/api";
import { SearchContext } from "./contexts";
import Loading from "./common/Loading";
import SplashPage from "./SplashPage";

function HomePage() {
    const [listings, setListings] = useState<ListingInterface[] | null>(null);
    const searchTerm = useContext(SearchContext);

    useEffect(function getLisitingsOnMount() {
        console.log("homepage useeffect");
        search(searchTerm);
    }, [searchTerm]);

    async function search(title?: string): Promise<void> {
        const listings = await ShareBnbApi.getListings(title);
        console.log(listings, "listings state");
        setListings(listings);
    }

    if (!listings) return <Loading />;

    return (
        <>
            <SplashPage/>
            <ListingList listings={listings} />;
        </>
    );

}

export default HomePage;
