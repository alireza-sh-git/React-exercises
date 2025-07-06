import { useEffect, useState, useRef } from "react";

import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const apiKey = "1b383ab8";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");

  const [watched, setWatched] = useLocalStorageState([], "watched");

  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  useKey("Escape", () => setSelectedId(null));

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} setSelectedId={setSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setWatched={setWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef();

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Numresults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, setSelectedId }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} setSelectedId={setSelectedId} />
      ))}
    </ul>
  );
}

function Movie({ movie, setSelectedId }) {
  return (
    <li onClick={() => setSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(1);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(0);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, setWatched }) {
  const onDeleteWatched = function (id) {
    setWatched((prev) => prev.filter((el) => el.imdbID !== id));
  };

  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function SelectedMovie({ selectedId, setSelectedId, setWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  function handleRate(rating) {
    const watchedId = watched.find((el) => el.imdbID === selectedId);
    if (!watchedId) {
      setWatched((prev) => [
        ...prev,
        {
          imdbID: selectedId,
          Title: title,
          year,
          Poster: poster,
          runtime: runtime.split(" ").at(0),
          imdbRating,
          userRating: rating,
        },
      ]);
    } else {
      console.log("You have already rated this");
      setWatched((prev) =>
        prev.map((el) =>
          el.imdbID === selectedId ? { ...el, userRating: rating } : el
        )
      );
    }
    setSelectedId(null);
  }

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://omdbapi.com/?i=${selectedId}&apikey=${apiKey}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong with fetching the movies");
        }
        const data = await res.json();
        console.log(data);
        if (data.Response === "False")
          throw new Error("No movies found based on the search query");
        setMovie(data);
      } catch (error) {
        console.log(error.message);
      }
    }

    fetchMovie();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => setSelectedId(null)}>
          &larr;
        </button>
        <img src={poster} alt="movie poster" />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>{imdbRating}</p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
          <button className="btn-add" onClick={() => handleRate(userRating)}>
            + Add to list
          </button>
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>starring {actors}</p>
        <p>directed by {director}</p>
      </section>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loader</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">error: {message}</p>;
}
