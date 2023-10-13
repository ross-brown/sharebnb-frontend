import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import NotFound from "./NotFound";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { LoginFormInterface, SignupFormInterface } from "./interfaces";
import ListingForm from "./ListingForm";
import { useContext } from "react";
import { UserContext } from "./contexts";
import MessagePage from "./MessagePage";
import ListingDetail from "./ListingDetail";
import ProfilePage from "./ProfilePage";


interface RoutesListProps {
    login: (data: LoginFormInterface) => void;
    signup: (data: SignupFormInterface) => void;

    //add signup and currectUser
}


function RoutesList({ login, signup }: RoutesListProps) {
    const { currentUser } = useContext(UserContext);


    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings/:id" element={<ListingDetail />} />
            {!currentUser
                ?
                <>
                    <Route path="/login" element={<LoginForm login={login} />} />
                    <Route path="/signup" element={<SignupForm signup={signup} />} />
                </>
                : <>
                    <Route path="/listings/new" element={<ListingForm />} />
                    <Route path="/messages" element={<MessagePage />} />
                    <Route path="/profile" element={<ProfilePage/>} />
                </>
            }
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default RoutesList;
