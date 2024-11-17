import React from 'react'
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';

const CarContext = createContext();

export function useCarSerch() {
    return useContext(CarContext);
}

export const CarProvider = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [availableOnly, setAvailableOnly] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Maker");
    const [priceRange, setPriceRange] = useState([0, 10000]); // Set your desired default price range

    return (
        <CarContext.Provider
            value={{
                searchKeyword,
                setSearchKeyword,
                availableOnly,
                setAvailableOnly,
                selectedFilter,
                setSelectedFilter,
                priceRange,
                setPriceRange,
            }}
        >
            {children}
        </CarContext.Provider>
    );
};