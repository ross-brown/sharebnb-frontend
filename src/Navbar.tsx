import { Fragment, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { useCurrentUser } from "./contexts";
import { classNames } from "./utils";

import SearchForm from "./SearchForm";
import { MessageSquareText } from 'lucide-react';
import { Menu, Transition } from "@headlessui/react";
import defaultAvatar from "./assets/img/blank-user-avatar.jpg";

interface NavbarProps {
    logout: () => void;
    search: (term: string) => void;
}

function Navbar({ logout, search }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useCurrentUser();
    const location = useLocation();

    const renderSearch = location.pathname === "/" || /listings\/\d+/g.test(location.pathname);

    function handleClick() {
        setIsOpen(isOpen => !isOpen);
    }

    function loggedOutNav() {
        return (
            <></>
        );
    }

    function loggedInNav() {
        return (
            <>
                <NavLink
                    className={({ isActive }) => [
                        isActive ? "font-semibold text-neutral-800" : "font-normal",
                        "block text-right hover:text-neutral-800 text-base underline-offset-2 text-neutral-600 hover:cursor-pointer hover:bg-neutral-200 rounded-full px-4 py-2"
                    ].join(" ")}
                    to="/listings/new"
                >
                    Create a Listing
                </NavLink>
                <NavLink
                    className={({ isActive }) => [
                        isActive ? "text-neutral-800" : "",
                        "flex justify-end text-right hover:text-neutral-800 text-base font-semibold underline-offset-2 text-neutral-600 hover:cursor-pointer hover:bg-neutral-200 rounded-full px-4 py-2"
                    ].join(" ")}
                    to="/messages"
                >
                    <MessageSquareText className="h-6 w-6" />
                </NavLink>
            </>
        );
    }

    return (
        <header className="lg:flex md:justify-between md:items-center bg-neutral-100 py-4 px-10">
            <div className="flex justify-between items-center">
                <Link to="/">
                    <h1 className=" text-3xl font-bold text-neutral-800 hover:cursor-pointer">Share
                        <span className="text-green-600">B&B</span>
                    </h1>
                </Link>
                {renderSearch && <SearchForm search={search} />}
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
            <nav className={`md:space-x-1 lg:space-x-6 lg:flex ${isOpen ? "block" : "hidden"}`}>
                {currentUser ? loggedInNav() : loggedOutNav()}
                <Menu as="div" className="relative ml-3">
                    <div className="flex justify-end">
                        <Menu.Button className="relative flex rounded-full bg-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-neutral-100 hover:drop-shadow-md">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-10 w-10 rounded-full"
                                src={defaultAvatar}
                                alt=""
                            />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {currentUser ?
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                to="/profile"
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Profile
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                to="/"
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                onClick={logout}
                                            >
                                                Sign out
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </>
                                :
                                <>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                to="/login"
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-semibold text-gray-700')}
                                            >
                                                Log in
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                to="/signup"
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Sign up
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </>}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </nav>
        </header>
    );
}

export default Navbar;
