import axios from 'axios';
import { useState } from 'react';
import './App.css';
import RecipeTile from './RecipeTile';

function App() {

  const [query, setQuery] = useState("")
  const [recipes, setRecipes] = useState([])
  const [healthLabels, setHealthLabel] = useState('vegan')

  function getQuery(e) {
    setQuery(e.target.value)
  }

  const YOUR_APP_ID = "ac92ac00"
  const YOUR_APP_KEY = "d6380fe2b3646f2202ac3b839566ebc3"
  var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`

  async function getRecipes() {
    var result = await axios.get(url)
    setRecipes(result.data.hits)
    console.log(result.data)
  }

  const submit = e => {
    e.preventDefault();
    getRecipes()
  }

  return (
    <div className="app">
      <h1>Food Recipe Plaza </h1>
      <form className='app__searchForm' onSubmit={submit}>
        <input className='app__input' type="text" placeholder='enter ingredient' value={query} onChange={getQuery}></input>
        <input className='app__submit' type='submit' value='Search' />
        <select className='app_healthLabels'>
          <option onClick={() => setHealthLabel('vegan')}>Vegan</option>
          <option onClick={() => setHealthLabel('vegetarian')}>Vegetarian</option>
          <option onClick={() => setHealthLabel('paleo')}>paleo</option>
          <option onClick={() => setHealthLabel('dairy-free')}>dairy-free</option>
          <option onClick={() => setHealthLabel('glutan-free')}>glutan-free</option>
          <option onClick={() => setHealthLabel('wheat-free')}>wheat-free</option>
          <option onClick={() => setHealthLabel('low-sugar')}>low-sugar</option>
          <option onClick={() => setHealthLabel('egg-free')}>egg-free</option>
          <option onClick={() => setHealthLabel('peanut-free')}>peanut-free</option>
          <option onClick={() => setHealthLabel('tree-nut-free')}>tree-nut-free</option>
          <option onClick={() => setHealthLabel('soy-free')}>soy-free</option>
          <option onClick={() => setHealthLabel('fish-free')}>fish-free</option>
          <option onClick={() => setHealthLabel('shellfish-free')}>shellfish-free</option>
          <option onClick={() => setHealthLabel('alcohol-free')}>alcohol-free</option>
        </select>
      </form>
      <div className='app__recipes'>
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe} />
        })}
      </div>
    </div>
  );
}

export default App;
