
import { useDispatch, useSelector } from "react-redux";
import MovieGridItem from "./MovieGridItem";
import './searchresults.css'
import { STATUS, actions } from "../features/movies";
import React, { useEffect, useState } from "react";


const SearchResults = ({ query, title, category, handleMovieClick, searchResults }) => {

    const dispatch = useDispatch();
    const moviesObject = useSelector(state => state.movies);
    const [content, setContent] = useState([]);

    useEffect(() => {
        if (category === "search") {
            fetchSearchResults(query, dispatch, category);
        } else {
            setContent(searchResults);
        }
    }, [category, query]);

    useEffect(() => {
        switch (moviesObject.status) {
            case STATUS.NORMAL:
                setContent(null);
                break;
            case STATUS.FETCHING:
                setContent(null);
                break;
            case STATUS.SUCCESS:
                setContent(moviesObject.movies[category]);
                break;
            case STATUS.FAILURE:
                break;
            default:
                setContent(null);
        }
    }, [moviesObject, category, query]);

    async function fetchSearchResults(query, dispatch, category, page = 1) {

        const apiKey = "305f99214975faee28a0f129881c6ec9";
        let URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}}`;

        dispatch(actions.isFetching());

        try {
            let response = await fetch(URL);
            let json = await response.json();
            let movies = json.results;

            if (4 > page) {
                let nextPageMovies = await fetchSearchResults(query, dispatch, category, page + 1);
                movies = movies.concat(nextPageMovies);
            }

            const payload = {
                category,
                movies,
            };

            dispatch(actions.success(payload));
            return movies;
        } catch {
            dispatch(actions.failure());
            return [];
        }
    }

    return (
        <div className="search_results">
            <h2>{title}</h2>
            <div className="movie_grid" key={moviesObject.status}>
                {content && content.map((movie, index) => (
                    <div className="movie_item" key={index}>
                        <MovieGridItem key={movie.id} movie={movie} handleMovieClick={handleMovieClick} />
                    </div>
                ))}
            </div>
        </div>
    );


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

