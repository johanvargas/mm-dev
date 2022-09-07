import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';

import IngredientList from './components/ingredient-list.component';
import CreateIngredient from './components/create-ingredient.component';
import EditIngredient from './components/edit-ingredient.component';

import RecipeList from './components/recipes-list.component';
import CreateRecipe from './components/create-recipe.component';
import EditRecipe from './components/edit-recipe.component';

import Spiegel from './components/spiegel.component';

function App() {
  return (
  <BrowserRouter>
    <div className='container'>
      <Navbar/>
      <br/>
      <Routes>

        <Route path="/ingredients" exact element={<IngredientList />} />
        <Route path="/ingredients/create" element={<CreateIngredient />} />
        <Route path="/ingredients/update/:id" element={<EditIngredient />} />

       
        <Route path="/recipes" exact element={<RecipeList />} />
        <Route path="/recipes/create" element={<CreateRecipe />} />
        <Route path="/recipes/update/:id" element={<EditRecipe />} />
        
        <Route path="/spiegel" element={<Spiegel />} />

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
