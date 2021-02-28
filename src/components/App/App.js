import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import Search from '../Search/Search';
import AddFavourite from '../AddFavourite/AddFavourite';
import RemoveFavourite from '../RemoveFavourite/RemoveFavourite';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=9a064664`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('movie-search-favourites'));
    if (movieFavourites) {
			setFavourites(movieFavourites);
		}
  }, []);

  const saveToLocalStore = items => {
    localStorage.setItem('movie-search-favourites', JSON.stringify(items))
  }

  const addFavourite = movie => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStore(newFavouriteList);
  }

  const removeFavourite = movie => {
    const newFavouriteList = [...favourites];
    const itemToDelete = newFavouriteList.indexOf(movie);
    newFavouriteList.splice(itemToDelete, 1);
    setFavourites(newFavouriteList);
    saveToLocalStore(newFavouriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Header header={<h1>Movie search</h1>} />
        <Search 
          placeholder='Type to search...'
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
      </div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
        <Header header={<h3>Movies</h3>} />
      </div>
        <div className='row m-4 list'>
          <MovieList 
            movies={movies}
            AddFavourite={AddFavourite} 
            handleFavouriteClick={addFavourite}
          />
        </div>
			<hr color="#3f3d3e"/>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Header header={<h3>Favourites</h3>} />
      </div>
      <div className='row m-4 list'>
        <MovieList 
          movies={favourites}
          AddFavourite={RemoveFavourite} 
          handleFavouriteClick={removeFavourite}
        />
      </div>  
    </div>
  );
};

export default App;