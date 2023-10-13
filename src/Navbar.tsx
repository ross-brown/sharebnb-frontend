import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "./contexts";
import SearchForm from "./SearchForm";

interface NavbarProps {
    logout: () => void;
    search: (term: string) => void;
}


function Navbar({ logout, search }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useContext(UserContext);
    const location = useLocation();

    function handleClick() {
        setIsOpen(isOpen => !isOpen);
    }

    function renderSearch() {
        return location.pathname === "/" || /listings\/\d+/g.test(location.pathname);
    }

    function loggedOutNav() {
        return (
            <>
                <NavLink className="mt-1 md:mt-0 text-right block text-neutral-800 text-base font-semibold hover:underline underline-offset-2 hover:text-green-500 hover:cursor-pointer" to="/login">Login</NavLink>
                <NavLink className="block text-right text-neutral-800 text-base font-semibold hover:underline underline-offset-2 hover:text-green-500 hover:cursor-pointer" to="/signup">Sign Up</NavLink>
            </>

        );
    }

    function loggedInNav() {
        return (
            <>
                <NavLink className="mt-1 md:mt-0 block text-right text-neutral-800 text-base font-semibold hover:underline underline-offset-2 hover:text-green-500 hover:cursor-pointer" to="/messages">Messages</NavLink>
                <NavLink className="block text-right text-neutral-800 text-base font-semibold hover:underline underline-offset-2 hover:text-green-500 hover:cursor-pointer" to="/listings/new">Create a Listing</NavLink>
                <NavLink className="block text-right text-neutral-800 text-base font-semibold hover:underline underline-offset-2 hover:text-green-500 hover:cursor-pointer" to="/profile">Profile</NavLink>
                <NavLink className="block text-right text-neutral-800 text-base font-semibold hover:underline underline-offset-2 hover:text-green-500 hover:cursor-pointer" to="/" onClick={logout}>Log out</NavLink>
            </>
        );
    }

    return (
        <header className="lg:flex md:justify-between md:items-center bg-neutral-100 py-4 px-8">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <h1 className=" text-3xl font-bold text-neutral-800 hover:cursor-pointer">Share
                        <span className="text-green-600">B&B</span>
                    </h1>

                </Link>
                {renderSearch() && <SearchForm search={search} />}
                <div className="lg:hidden">
                    <button className="text-neutral-800" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                            {isOpen
                                ? <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                : <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                            }
                        </svg>
                    </button>
                </div>
            </div>
            <nav className={`md:space-x-2 lg:space-x-3 lg:flex ${isOpen ? "block" : "hidden"}`}>
                {currentUser ? loggedInNav() : loggedOutNav()}
            </nav>
        </header>
    );
}

export default Navbar;
