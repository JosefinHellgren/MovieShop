


//Set up api fetch för filmer
//Visa upp filmerna

import { useEffect, useState } from "react";


const MainPage = () =>{
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



    return(
        <div className="main_container">
           <h1>Popular Movies:</h1>
           {data && data.map((data, index) => (
            <div className="popular_movies_container">
            <p>{data.title}</p>
            <img src={imgUrlStart+data.poster_path}/>
            </div>
            
           ))}
            


        </div>
    )
}

export default MainPage