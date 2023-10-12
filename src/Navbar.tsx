import { useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "./contexts";
import SearchForm from "./SearchForm";

interface NavbarProps {
    logout: () => void;
    search: (term: string) => void;
}


function Navbar({ logout, search }: NavbarProps) {
    const { currentUser } = useContext(UserContext);
    const location = useLocation();

    function renderSearch() {
        return location.pathname === "/";
    }

    function loggedOutNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
            </ul>
        );
    }

    function loggedInNav() {
        return (
            <ul>
                <li>
                    <NavLink to="/messages">Messages</NavLink>
                </li>
                <li>
                    <NavLink to="/listings/new">Create a Listing</NavLink>
                </li>
                <li>
                    <NavLink to="/" onClick={logout}>Log out</NavLink>
                </li>
            </ul>
        );
    }

    return (
        <nav>
            <Link to="/">ShareBnB</Link>
            {renderSearch() && <SearchForm search={search} />}
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}

export default Navbar;
