import { useState, useEffect, useDebugValue } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import "tachyons";
import starboyLogo from "/logo.png";
import Animals from "./components/Animals.tsx";
import NotFound from "./components/NotFound.tsx";

// const localhost: string = "http://localhost:8080/animals/";
const serverUrl: string = "https://animalfarm-server.onrender.com/animals/";

type AnimalProps = {
  id: number;
  type: string;
  name: string;
  age: number;
};

// Custom hook: useAnimalSearch
function useAnimalSearch() {
  const [animals, setanimals] = useState([]);

  // Cache last query
  useEffect(() => {
    // `localStorage` is a key-value store built into the browser
    const lastQuery = localStorage.getItem("lastQuery");
    search(lastQuery || ""); // If no last query, search for all animals
  }, []); // Empty array means run once

  // Search function
  const search = async (q: string) => {
    const response = await fetch(
      // `URLSearchParams` is a built-in JS class to help build query strings
      serverUrl + "?" + new URLSearchParams({ q })
    );
    const data = await response.json();
    setanimals(data);

    // Save last query to cache
    localStorage.setItem("lastQuery", q.toLowerCase().trim());
  };

  useDebugValue(animals ?? "Loading...");

  return { animals, search };
}

const App: React.FC = () => {
  const { animals, search } = useAnimalSearch();

  return (
    <>
      <div>
        <a
          href="https://github.com/skywalkersam"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={starboyLogo} alt="Starboy Logo" className="starboyLogo" />
        </a>
      </div>
      <div>
        <p className="">Starboy Farms Inc.</p>
        <h1 className="title">ANIMAL SEARCH</h1>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search here..."
          className="w-90 mt3 mb3 br3 pa2 bg-transparent outline-0 textColor" // color-inherit
          onChange={(event) => search(event.target.value)}
        ></input>
      </div>

      <div>
        <ul>
          {animals.map((animal: AnimalProps) => (
            // Spread operator to pass all properties of `animal` as props
            <Animals key={animal.id} {...animal}></Animals>
          ))}

          {animals.length === 0 && <NotFound></NotFound>}
        </ul>
      </div>

      <footer className="white-80 mt5">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={appLogo} className="logo" alt="animalFarm logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <small>&copy; Copyright 2024, Starboy Farms Inc.</small>
      </footer>
      <PWABadge />
    </>
  );
};

export default App;
