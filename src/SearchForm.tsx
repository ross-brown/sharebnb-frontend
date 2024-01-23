import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "./assets/img/search-icon.svg";

interface SearchFormProps {
    search: (term: string) => void;
}

function SearchForm({ search }: SearchFormProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { value } = evt.target;
        setSearchTerm(value);
    }

    function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        search(searchTerm);
        navigate("/");
    }

    return (
        <form className="ps-5 relative" onSubmit={handleSubmit}>
            <input aria-label="Search" value={searchTerm} onChange={handleChange} className="w-full py-2 px-3 rounded-3xl shadow-md text-neutral-900 focus:ring
                    focus:ring-green-500 focus:ring-opacity-50 focus:outline-none"></input>
            <button aria-label="Search" className="rounded-full bg-green-600 hover:bg-green-500
                    text-white p-2 absolute right-1 top-1">
                <img src={searchIcon} alt="search icon" className="w-4 h-4" />
            </button>
        </form>
    );
}

export default SearchForm;
