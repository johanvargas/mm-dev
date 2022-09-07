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

function App() {
  return (
  <BrowserRouter>
    <div className='container'>
      <Navbar/>
      <br/>
      <Routes>

        <Route path="/ingredients" exact element={<IngredientList />} />
        <Route path="/ingredients/create" element={<CreateIngredient />} />
        <Route path="/ingredients/edit/:id" element={<EditIngredient />} />

       
        <Route path="/recipes" exact element={<RecipeList />} />
        <Route path="/recipes/create" element={<CreateRecipe />} />
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
