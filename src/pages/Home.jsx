import { useEffect, useState } from "react";
import NavBar from '../components/NavBar'
import MovieCard from '../components/MovieCard'
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((response) => response.json())
      .then((directorData) => setMovies(directorData));
  }, []);

  return (
    <>
      <header>
        {/* What component should go here? */}
        <NavBar />
      </header>
      <main>
        <h1>Home Page</h1>
        {movies.map(movie => (
          <div key={movie.id}>
              <MovieCard  title={movie.title} />
              <Link to={`/movie/${movie.id}`}>View Info</Link>
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;