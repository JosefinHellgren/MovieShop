import MovieGridItem from "./MovieGridItem";

const SearchResults = ({ query, searchResults }) => {
  return (
    <div>
      <h2>Showing results for "{query}"</h2>
      <div className="movie-grid">
        {searchResults && searchResults.map((movie) => (
          <MovieGridItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;