import React, { useState } from "react";

interface SearchFormProps {
    search: (term: string) => void;
}

function SearchForm({ search }: SearchFormProps) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { value } = evt.target;
        setSearchTerm(value);
    }

    function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        search(searchTerm);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={searchTerm} onChange={handleChange}></input>
            <button>Search</button>
        </form>
    );
}

export default SearchForm;