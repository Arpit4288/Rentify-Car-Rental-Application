import React from 'react'
import { Button, Dropdown, Form, ToggleButton } from 'react-bootstrap';
import { useCarSerch } from '../../Context/userCarContext';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';

const FilterSearchComponent = () => {

    const { searchKeyword,
        setSearchKeyword,
        availableOnly,
        setAvailableOnly,
        selectedFilter,
        setSelectedFilter,
        priceRange,
        setPriceRange } = useCarSerch();

    // const [searchInput, setSearchInput] = useState('');
    // const [isAvailableOnly, setIsAvailableOnly] = useState(false);
    const [selectedDropdownOption, setSelectedDropdownOption] = useState("Maker");
    // const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);
    // const handleSearchInputChange = (e) => {
    //     setSearchInput(e.target.value);
    // };


    return (
        <>
            <div className="home-filter text-shadow">
                <div className='filter-left' style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center', width: '35%' }}>
                    <Form style={{ marginRight: '1.5rem' }}>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={availableOnly}
                            onChange={() => setAvailableOnly(!availableOnly)}
                            style={{ marginLeft: '2rem' }}
                        />
                        <strong className='text-center'>Available Only</strong>
                    </Form>
                    <div className="price-range">
                        <input
                            variant='success'
                            type="range"
                            min="0"
                            max="10000"
                            step="100"
                            value={priceRange[1]}
                            onChange={(e) => {
                                setPriceRange([priceRange[0], parseInt(e.target.value)]);
                            }}
                        />
                        <div className="price-labels">
                            <strong className='text-success'>{priceRange[0]} INR - </strong>
                            <strong className='text-success'>{priceRange[1]} INR</strong>
                        </div>
                    </div>
                </div>
                <div className='filter-right search-input-shadow' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '40%' }}>
                    <InputGroup className="mb-0 ">
                        <Form.Control aria-label="Text input with dropdown button" style={{backgroundColor: '#FFF6E0', border: '1px solid #98885f'}} value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />

                        <DropdownButton
                            variant="outline-dark"
                            title={selectedFilter}
                            id="input-group-dropdown-2"
                            align="end"
                        >
                            <Dropdown.Item onClick={() => {
                                setSelectedFilter("Maker")
                                setSearchKeyword("");
                            }} href="#">Maker</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                setSelectedFilter("Model");
                                setSearchKeyword("");
                            }} href="#">Model</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </div>
            </div>
        </>
    )
}

export default FilterSearchComponent;