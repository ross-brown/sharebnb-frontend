import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            <input value={searchTerm} onChange={handleChange} className="w-full py-2 px-3 rounded-3xl shadow-md text-neutral-900 focus:ring
                    focus:ring-green-500 focus:ring-opacity-50 focus:outline-none"></input>
            <button className="rounded-full bg-green-600 hover:bg-green-500
                    text-white p-2 absolute right-1 top-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
            </button>
        </form>
    );
}

export default SearchForm;
