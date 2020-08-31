import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './components/Recipe';
import Popup from './components/Popup';

const App = () => {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  const APP_ID = 'c7bb63e4';
  const APP_KEY = 'ee6f690013aa60368b9182e057c3d8b8';
  const API_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect( () => {
    GetRecipes();
  }, [query]);

  const GetRecipes = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.status == 200) {
        const data = await response.json();
        setRecipes(data.hits);
        yolo();
      }
    } catch(err) {
      return (
        <div>
          <h1>skrrrr</h1>
          <Popup message={err} />
        </div>
      )
      
    }
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const yolo = () => {
    console.log("bingo");
    return(
      <div>
        <h1 style="font-size: 56px;">skrrrrr</h1>
      </div>
    )
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" value={search} type="text" onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipe-box">
        {recipes.map(recipe => (
          <Recipe
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}

            onClick={<Popup message={recipe.recipe.label} />}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
