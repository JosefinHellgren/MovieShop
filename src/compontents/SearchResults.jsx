import { useDispatch, useSelector } from "react-redux";
import MovieGridItem from "./MovieGridItem";
import './searchresults.css'
import { STATUS, actions } from "../features/movies";
import React, { useEffect, useState } from "react";

const SearchResults = ({ query, title, category, handleMovieClick, searchResults, toggleUserIconVisibility }) => {

    const dispatch = useDispatch();
    const moviesObject = useSelector(state => state.movies);
    const [content, setContent] = useState([]);

     useEffect(() => {
        console.log("toggle usericon")
         toggleUserIconVisibility(true);
     }, [])

    useEffect(() => {
        console.log("hallåå")
        if (category === "search") {
            console.log("search")
            fetchSearchResults(query, dispatch, category);
        } else {
            console.log("ej search")
            setContent(searchResults);
        }
    }, [category, query]);

    useEffect(() => {
        switch (moviesObject.status) {
            case STATUS.NORMAL:
                console.log("status.normal")
                setContent(null);
                break;
            case STATUS.FETCHING:
                console.log("status.fetching")
                setContent(null);
                break;
            case STATUS.SUCCESS:
                console.log("status.success")
                setContent(moviesObject.movies[category]);
                break;
            case STATUS.FAILURE:
                console.log("status.fail")
                break;
            default:
                setContent(null);
        }
    }, [moviesObject, category, query]);

    async function fetchSearchResults(query, dispatch, category, page = 1) {

        const apiKey = "305f99214975faee28a0f129881c6ec9";
        let URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}}`;

        dispatch(actions.isFetching());
        console.log("fetching")

        try {
            let response = await fetch(URL);
            let json = await response.json();
            let movies = json.results;

            console.log("succeed")
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
};


export default SearchResults;

