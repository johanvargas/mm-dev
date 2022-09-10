import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ServerError from './servererror.component';
import axios from 'axios';

const Ingredients = props => (
  <tr>
    <td>{props.ingredient.name}</td>
    <td>{props.ingredient.description}</td>
    <td>{props.ingredient.serving}</td>
    <td>{props.ingredient.unit}</td>
    <td>
      <Link to={'/update/' + props.ingredient._id}>edit</Link> 
      | 
     </td>
  </tr>
)

export default class IngredientsList extends Component {
  constructor (props) {
    super (props);
//    this.deleteExercise= this.deleteIngredient.bind(this);
    this.state = { 
      connection: false,
      ingredients: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:17000/ingredients/')
      .then(res => {
        this.setState({ 
          connection: true,
          ingredients: res.data 
        })
      })
      .catch((err) => {
        console.log( "Axios is returning an error: ", err);
        this.setState({ connection: false })
        })
  }

  deleteIngredient(id) {
     axios.delete('http://localhost:17000/ingredients/' + id)
      .then(res => console.log(res.data));
    this.setState({ 
      ingredients: this.state.ingredient.filter(el => el._id !== id) 
    });
  }
  ingredientList () {
    return this.state.ingredients.map(currentingr => {
      return <Ingredients ingredient={currentingr} 
        deleteIngredient={this.deleteIngredient}
        key={currentingr._id}/>
    });
  }
  render() {
    if(this.state.connection) {
      return (
        <div>
          <h3>Logged Ingredients</h3>
          <table className='table'>
            <thead className='thead-light'>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Serving</th>
                <th>Unit</th>
              </tr>
              </thead>
            <tbody>
              {this.ingredientList()}
              </tbody>
            </table>
        </div>
      );
    } else {
      return <ServerError />
    }
  }
}
