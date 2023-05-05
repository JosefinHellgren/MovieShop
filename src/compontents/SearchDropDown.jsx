
import "./searchdropdown.css"


const SearchDropDown = ({ searchResults, handleSearchClick, handleMovieClick }) => {

    const imgUrlStart = "https://image.tmdb.org/t/p/w185";
    const MAX_RESULTS = 7;
    const displayResults = searchResults.slice(0, MAX_RESULTS);

    return (
        <div className="search_dropdown">
            {displayResults && displayResults.map((movie) => (
                <div className="dropdown_item" onClick={ () => handleMovieClick(movie)}>
                    <img className="movie_poster" src={imgUrlStart + movie.poster_path} />
                    <p>{movie.title}</p>
                </div>
            ))}
            <button onClick={handleSearchClick} >Show all results...</button>
        </div>
    )
}

export default SearchDropDown;