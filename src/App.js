import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component';
import IngredientList from './components/ingredient-list.component';
import CreateIngredient from './components/create-ingredient.component';
import CreateRecipe from './components/create-recipe.component';
import EditIngredient from './components/edit-ingredient.component';

function App() {
  return (
  <BrowserRouter>
    <div className='container'>
      <Navbar/>
      <br/>
      <Routes>
        <Route path="/" exact element={<IngredientList />} />
        <Route path="/edit/:id" element={<EditIngredient />} />
        <Route path="/create" element={<CreateIngredient />} />
        <Route path="/recipes" element={<CreateRecipe />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
