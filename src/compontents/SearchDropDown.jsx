
import { useEffect } from "react";
import "./searchdropdown.css"


const SearchDropDown = ({ searchResults, handleSearchClick, handleMovieClick }) => {

    const imgUrlStart = "https://image.tmdb.org/t/p/w185";
    const MAX_RESULTS = 6;
    const displayResults = searchResults.slice(0, MAX_RESULTS);
    
    useEffect(() => {
     window.scrollTo(0, 0);
    }, [])
       

    return (
        <div className="search_dropdown">
            {displayResults && displayResults.map((movie, index) => (
                <div key={index} className="dropdown_item" onClick={ () => handleMovieClick(movie)}>
                    <img className="movie_poster" src={imgUrlStart + movie.poster_path} />
                    <p>{movie.title}</p>
                </div>
            ))}
            <button onClick={handleSearchClick} >Show all results...</button>
        </div>
    )
}

export default SearchDropDown;