import { useEffect, useState } from "react";
import NavBar from '../components/NavBar'

function Actors() {
  const [actors, setActors] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/actors")
    .then(res => res.json())
    .then(data => setActors(data))
    .catch(error => console.error(error))
  })

  return (
    <>
      <header>
        {/* What component should go here? */}
        <NavBar />
      </header>
      <main>
        <h1>Actors Page</h1>
        {/* Actor info here! */}
        {actors.map(actor => (
          <article key={actor.id}>
            <h2>{actor.name}</h2>
            <ul>
              {actor.movies.map(movie => (
                <li key={movie}>{movie}</li>
              ))}
            </ul>
          </article>
        ))}
      </main>
    </>
  );
};

export default Actors;