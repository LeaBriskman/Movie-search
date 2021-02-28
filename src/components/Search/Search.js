import React from 'react';

const Search = ({placeholder, setSearchValue, searchValue}) => {
  return(
    <div className='col col-sm-4'>
      <input 
        className='form-control' 
        placeholder={placeholder} 
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default Search;