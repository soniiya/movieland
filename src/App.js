import React,{useEffect,useState} from 'react';
import './App.css';
import searchicon from './search.svg';
import Moviecard from './Moviecard'

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=1fea7ea9';

// const movie1={
//   "Title": "Italian Spiderman",
//   "Year": "2007",
//   "imdbID": "tt2705436",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BYjFhN2RjZTctMzA2Ni00NzE2LWJmYjMtNDAyYTllOTkyMmY3XkEyXkFqcGdeQXVyNTA0OTU0OTQ@._V1_SX300.jpg"
// }

const App = () =>{
const [movies, setMovies] = useState([]);
const [searchterm, setSearchterm] =useState('');

  const searchmovies = async (title)=>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data= await response.json();

    setMovies(data.Search);
  }
  useEffect(()=>{
    searchmovies('movies') //automatically render "movies" on first refresh(default) app
  },[]);

  return (
    <div className="app">
    <h1>MovieLand</h1>

    <div className='search'>
      <input 
      placeholder='Search for movies'
      value={searchterm}
      onChange= {(e)=> {
          setSearchterm(e.target.value)
      }}
      />
      <img 
        src={searchicon}
        alt="search"
        onClick={()=> searchmovies(searchterm)}
      />
    </div>

    {
      movies?.length > 0 
      ? ( <div className='container'>
          {movies.map((movie) =>{
            return(
            <Moviecard 
              Title = {movie.Title}
              Year = {movie.Year}
              imdbID = {movie.imdbID}
              Type= {movie.Type}
              Poster = {movie.Poster}
          />
          )})
          }
        </div>
      ):(
          <div className='container'>
            <h2>No Movies found.</h2>
          </div>
      )
    }
    </div>
  );
}

export default App;
