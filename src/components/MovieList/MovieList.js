import React from 'react';

const MovieList = ({movies, AddFavourite, handleFavouriteClick}) => {

	return (
		<>
			{movies.map((movie, index) => (
				<div key={index} className='image-container d-flex justify-content-start m-3 item'>
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => handleFavouriteClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<AddFavourite />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
