import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFound from "./common/NotFound";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import { ListingInterface, LoginFormInterface, SignupFormInterface } from "./interfaces";
import ListingForm from "./listings/ListingForm";
import { useCurrentUser } from "./contexts";
import MessagePage from "./messages/MessagePage";
import ListingDetail from "./listings/ListingDetail";
import ProfilePage from "./profile/ProfilePage";

interface RoutesListProps {
    login: (data: LoginFormInterface) => Promise<void>;
    signup: (data: SignupFormInterface) => Promise<void>;
    addListing: (data: ListingInterface) => void;
    removeListing: (id: string) => void;
    listings: ListingInterface[] | null;
}

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in.
 *
 * Non-matched routes render a NotFound page.
 */

function RoutesList({ login, signup, addListing, removeListing, listings }: RoutesListProps) {
    const { currentUser } = useCurrentUser();


    return (
        <Routes>
            <Route path="/" element={<HomePage listings={listings} />} />
            <Route path="/listings/:id" element={<ListingDetail removeListing={removeListing} />} />
            {!currentUser
                ?
                <>
                    <Route path="/login" element={<LoginForm login={login} />} />
                    <Route path="/signup" element={<SignupForm signup={signup} />} />
                </>
                : <>
                    <Route path="/listings/new" element={<ListingForm addListing={addListing} />} />
                    <Route path="/messages" element={<MessagePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </>
            }
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RoutesList;
