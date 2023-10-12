import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./userContext";

interface NavbarProps {
    logout: () => void;
}


function Navbar({ logout }: NavbarProps) {
    const { currentUser } = useContext(UserContext)!;


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
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    );
}

export default Navbar;
