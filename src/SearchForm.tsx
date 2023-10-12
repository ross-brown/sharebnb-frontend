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
        <form onSubmit={handleSubmit}>
            <input value={searchTerm} onChange={handleChange}></input>
            <button>Search</button>
        </form>
    );
}

export default SearchForm;
