import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recipes = props => (
  <tr>

    <td>{props.recipe.name}</td>
    <td>{props.recipe.description}</td>
    <td>{props.recipe.duration}</td>
    <td>{props.recipe.notes}</td>
    <td>{props.recipe.ingredients}</td>
    <td>
      <Link to={'/edit/' + props.recipe._id}>edit</Link> 
      | 
     </td>
  </tr>
)

export default class RecipesList extends Component {
  constructor (props) {
    super (props);
//    this.deleteExercise= this.deleterecipe.bind(this);
    this.state = { recipes: []};
  }

  componentDidMount() {
    axios.get('http://localhost:17000/ingredients/')
      .then(res => {
        this.setState({ recipes: res.data })
      })
      .catch((err) => {
        console.log( "Axios is returning an error: ", err);
        })
  }

  deleteRecipe(id) {
     axios.delete('http://localhost:17000/ingredients/' + id)
      .then(res => console.log(res.data));
    this.setState({ 
      recipes: this.state.recipe.filter(el => el._id !== id) 
    })
  }

  recipeList() {
    return this.state.ingredients.map(currentrecip => {
      return <Recipes ingredient={currentrecip} 
        deleteRecipe={this.deleteRecipe}
        key={currentrecip._id}/>
    })
  }
  render() {
    return (
      <div>
        <h3>Logged Recipes</h3>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Notes</th>
              <th>Ingredients</th>
            </tr>
            </thead>
          <tbody>
            {this.recipeList()}
            </tbody>
          </table>
      </div>
    )
  }
}
