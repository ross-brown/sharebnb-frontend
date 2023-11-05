// import { useEffect, useState, useContext } from "react";
import ListingList from "./listings/ListingList";
import { ListingInterface } from "./interfaces";
// import ShareBnbApi from "./api/api";
// import { SearchContext } from "./contexts";
import SplashPage from "./SplashPage";

interface HomePageProps {
    listings: ListingInterface[] | null;
}

function HomePage({ listings }: HomePageProps) {
    // const [listings, setListings] = useState<ListingInterface[] | null>(null);
    // const searchTerm = useContext(SearchContext);

    // useEffect(function getLisitingsOnMount() {
    //     console.log("homepage useeffect");
    //     search(searchTerm);
    // }, [searchTerm]);

    // async function search(title?: string): Promise<void> {
    //     const listings = await ShareBnbApi.getListings(title);
    //     console.log(listings, "listings state");
    //     setListings(listings);
    // }

    return (
        <>
            <SplashPage />
            <ListingList title="Check out our spaces" listings={listings} />;
        </>
    );

}

export default HomePage;
