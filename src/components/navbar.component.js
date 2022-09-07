import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
    <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
      <Link to='/spiegel' className='navbar-brand'>Spiegel</Link>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          <li className='navbar-item'>
            <Link to='/ingredients' className='nav-link'>Ingredients</Link>
          </li>
          <li className='navbar-item'>
            <Link to='/recipes' className='nav-link'>Recipes</Link>
          </li>
          <li className='navbar-item'>
            <Link to='/ingredients/create' className='nav-link'>Create Ingredient</Link>
          </li>
           <li className='navbar-item'>
            <Link to='/recipes/create' className='nav-link'>Create Recipe</Link>
          </li>
           <li className='navbar-item'>
            <Link to='/spiegel' className='nav-link'>Spiegel Menu</Link>
          </li>

        </ul>
      </div>
      </nav>
    );
  }
}
