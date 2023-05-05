import MovieGridItem from "./MovieGridItem";
import './searchresults.css'

const SearchResults = ({ query, searchResults }) => {
  return (
    <div className="search_results">
      <h2>Showing results for "{query}"</h2>
      <div className="movie_grid">
        {searchResults && searchResults.map((movie) => (
          <MovieGridItem  className="movie_grid_item" key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;