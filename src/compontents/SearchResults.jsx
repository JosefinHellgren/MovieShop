import MovieGridItem from "./MovieGridItem";

const SearchResults = ({ query, results }) => {
  return (
    <div>
      <h2>Showing results for "{query}"</h2>
      <div className="movie-grid">
        {results.map((movie) => (
          <MovieGridItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};