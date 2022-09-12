import React from 'react';
import axios from 'axios';

export default function bindIngredient(ingredient) {

  return (
    <div className='d-flex justify-content-between'>
      <h3>{ingredient}</h3>
      <button className='btn btn-secondary' onClick="#">Add This Ingredient</button>
    </div>
    )
}
