import "./moviegriditem.css"

const MovieGridItem = ({movie, handleButtonClick, handleMovieClick}) => {

    const imgUrlStart = "https://image.tmdb.org/t/p/w185";

    return (
        <div className="movie_grid_item" onClick={() => handleMovieClick(movie)}>
            <img
                className="movie_poster"
                src={imgUrlStart + movie.poster_path}
                
            />
            <h6 className="movie_title">{movie.title}</h6>
            <button className="payment_button" onClick={() => handleButtonClick(movie)}>
                59kr
            </button>
        </div>
    )
}

export default MovieGridItem