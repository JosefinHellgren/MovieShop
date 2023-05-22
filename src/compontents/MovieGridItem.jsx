import "./moviegriditem.css"

const MovieGridItem = ({ movie, handleMovieClick, useBackDrop }) => {

    const imgUrlStart = "https://image.tmdb.org/t/p/original";
    const imageSource = useBackDrop ? movie.backdrop_path : movie.poster_path;
    const movieStyle = useBackDrop ? { width: '100%', paddingTop: "80px" } : {};

    return (
        <div className="movie_grid_item" onClick={() => handleMovieClick(movie)}>
            <img
                className="movie_poster"
                src={imgUrlStart + imageSource}
                style={movieStyle}
            />
            <div className="movie_info"
                onClick={() => handleMovieClick(movie)}>
                <h6 className="movie_title">{movie.title}</h6>
                <p className="movie_release">{movie.release_date}</p>
                <p className="movie_rating">{movie.vote_average}</p>
            </div>
        </div>
    )
}

export default MovieGridItem