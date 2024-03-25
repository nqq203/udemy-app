import React, { useState } from 'react';
import styled from 'styled-components';

const FilterDropdown = ({ items, setFilteredItems }) => {
  const handleFilterChange = (event) => {
    const value = event.target.value;
    let sortedItems = [...items];

    switch (value) {
      case 'Newest':
        sortedItems.sort((a, b) => b.date - a.date);
        break;
      case 'Oldest':
        sortedItems.sort((a, b) => a.date - b.date);
        break;
      case 'A-Z':
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Z-A':
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'Published':
        sortedItems.sort((a, b) => b.published - a.published);
        break;
      case 'Unpublished':
        sortedItems.sort((a, b) => a.published - b.published);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
  };

  return (
    <FilterDropdownWrapper>
      <select onChange={handleFilterChange} defaultValue="Sort">
        <option value="Sort" disabled>Sort</option>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Published">Published first</option>
        <option value="Unpublished">Unpublished first</option>
      </select>
    </FilterDropdownWrapper>
  );
};

export default FilterDropdown;


const FilterDropdownWrapper = styled.div`
  padding: 5px;
  border: 1px solid var(--color-gray-400);
  font-size: 1rem;
  display: flex;

  select:focus {
    outline: none;
  }

  select > option {
    font-weight: bold;
  }

  select {
    font-weight: bold;
    outline: 0px;
    border: 0px;
    font-size: 16px;
  }
`