


//Set up api fetch för filmer
//Visa upp filmerna

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const MainPage = (props) =>{

    let navigate = useNavigate();


    const [data,setData]= useState([]);
    const apiKey = "305f99214975faee28a0f129881c6ec9";
    const imgUrlStart = "https://image.tmdb.org/t/p/w185";

    //fetch movies
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`)
        .then((response) => response.json())
       .then((data) =>{
        console.log(data.results);
        setData(data.results)
       })
        .catch((error) => {
            console.log(error);
        })


    },[])

    const handleMovieClick = (movie) => {
        props.setMovie(movie);
        navigate("/movieinfo/")
    }



    return(
        <div className="main_container">
           <h1>Popular Movies:</h1>
           {data && data.map((movie, index) => (
            <div className="popular_movies_container" onClick={() => handleMovieClick(movie)}>
            <p>{movie.title}</p>
            <img src={imgUrlStart+movie.poster_path}/>
            </div>
            
           ))}
        </div>
    )
}

export default MainPage