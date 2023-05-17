
import "./searchdropdown.css"


const SearchDropDown = ({ query, searchResults, handleSearchClick, handleMovieClick }) => {

    const imgUrlStart = "https://image.tmdb.org/t/p/w185";
    const MAX_RESULTS = 6;
    const displayResults = searchResults.slice(0, MAX_RESULTS);
    const category = "search"

    const handleCategoryClick = () => {
        handleSearchClick(query, searchResults, category);
    }

    return (
        <div className="search_dropdown">
            {displayResults && displayResults.map((movie, index) => (
                <div key={index} className="dropdown_item" onClick={ () => handleMovieClick(movie)}>
                    <img className="movie_poster" src={imgUrlStart + movie.poster_path} />
                    <p>{movie.title}</p>
                </div>
            ))}
            <button onClick={handleCategoryClick} >Show all results...</button>
        </div>
    )
}

export default SearchDropDown;