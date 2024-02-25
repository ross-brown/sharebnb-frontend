import { Fragment } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { useCurrentUser } from "./contexts";
import { classNames } from "./utils";

import SearchForm from "./SearchForm";
import { MessageSquareText } from 'lucide-react';
import { Menu, Transition } from "@headlessui/react";
import defaultAvatar from "./assets/img/blank-user-avatar.jpg";
import logo from "./assets/img/icons8-treehouse-80.png";

interface NavbarProps {
    logout: () => void;
    search: (term: string) => void;
}

function Navbar({ logout, search }: NavbarProps) {
    const { currentUser } = useCurrentUser();
    const location = useLocation();

    const renderSearch = location.pathname === "/" || /listings\/\d+/g.test(location.pathname);

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
        <header className="flex justify-between bg-neutral-100 py-4 sm:px-10 px-6">
            <div className="flex justify-between items-center">
                <Link className="flex" to="/">
                    <img src={logo} alt="ShareBnB logo" className="h-10 w-10" />
                    <h1 className="sm:block ml-3 hidden text-3xl font-bold text-neutral-800 hover:cursor-pointer">Share
                        <span className="text-green-600">B&B</span>
                    </h1>
                </Link>
                {renderSearch && <SearchForm search={search} />}
            </div>
            <nav className={`lg:space-x-6 flex`}>
                <div className="mdlg:flex hidden">
                    {currentUser && loggedInNav()}
                </div>
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {currentUser ?
                                <>
                                    <div className="mdlg:hidden pb-1 mb-1 border-b border-gray-200">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    to={"/messages"}
                                                    className={classNames(active ? 'bg-gray-100 rounded-md' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Messages
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <NavLink
                                                    to={"/listings/new"}
                                                    className={classNames(active ? 'bg-gray-100 rounded-md' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Create a listing
                                                </NavLink>
                                            )}
                                        </Menu.Item>
                                    </div>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                to="/profile"
                                                className={classNames(active ? 'bg-gray-100 rounded-md' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                            >
                                                Profile
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <NavLink
                                                to="/"
                                                className={classNames(active ? 'bg-gray-100 rounded-md' : '', 'block px-4 py-2 text-sm text-gray-700')}
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
