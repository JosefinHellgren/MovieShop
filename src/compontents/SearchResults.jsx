import MovieGridItem from "./MovieGridItem";
import './searchresults.css'

const SearchResults = ({ query, searchResults, handleMovieClick, handleButtonClick }) => {
  return (
    <div className="search_results">
      <h2>Showing results for "{query}"</h2>
      <div className="movie_grid">
        {searchResults && searchResults.map((movie, index) => (
            <div className="movie_item" key={index}>
          <MovieGridItem key={movie.id} movie={movie} handleMovieClick={handleMovieClick} handleButtonClick={handleButtonClick}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;

