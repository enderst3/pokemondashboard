import React from 'react';
import SelectItemsPerPageButtons from './SelectItemsPerPageButtons';
import PaginationContainer from './PaginationContainer';
import PokeList from './PokeList';

// all the props needed
const PokemonIndexList = ({display, options, selectedValue, allValue, onOptionSelected, listOfPokemon, btnSize, totalPages, activePage, onSelect, openModal}) => {

  // adding a loading screen while waiting for api
  let style ={ display: 'none' }

  if (display) {
    style.display = 'initial'
  } else {
    style.display = 'none'
  }

  return (
    // all the props listed
    <div style={style}>
      <SelectItemsPerPageButtons
        options={options}
        selectedValue={selectedValue}
        allValue={allValue}
        onOptionSelected={onOptionSelected}
      />

      <PokeList
        listOfPokemon={listOfPokemon}
        openModal={openModal}
      />

      <PaginationContainer
        btnSize={btnSize}
        totalPages={totalPages}
        activePage={activePage}
        onSelect={onSelect}
      />
    </div>
  )
}

export default PokemonIndexList;
