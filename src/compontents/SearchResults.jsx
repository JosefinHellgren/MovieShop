import { useEffect } from "react";
import MovieGridItem from "./MovieGridItem";
import './searchresults.css'

const SearchResults = ({ title, searchResults, handleMovieClick, toggleUserIconVisibility }) => {  

  useEffect(() => {
    toggleUserIconVisibility(true);
  },[])

  return (
    <div className="search_results">
      <h2>{title}</h2>
      <div className="movie_grid">
        {searchResults && searchResults.map((movie, index) => (
            <div className="movie_item" key={index}>
          <MovieGridItem key={movie.id} movie={movie} handleMovieClick={handleMovieClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

