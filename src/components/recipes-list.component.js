import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ServerError from './servererror.component';
import axios from 'axios';

const Recipes = props => (
  <tr>
    <td>{props.recipe.name}</td>
    <td>{props.recipe.description}</td>
    <td>{props.recipe.duration}</td>
    <td>{props.recipe.notes}</td>
    <td>{props.recipe.ingredients.map((i, index) => {
      return <p key={index}>{i}</p>
    })}</td>
    <td>
      <Link to={'/recipes/update/' + props.recipe._id}>edit</Link> 
      &nbsp;|&nbsp;
      <a href="#" onClick={() => { props.deleteRecipe(props.recipe._id) }}>delete</a>
    </td>
  </tr>
)

export default class RecipesList extends Component {
  constructor (props) {
    super (props);
//    this.deleteExercise= this.deleterecipe.bind(this);
    this.state = {
      connection: false,
      recipes: [],
      count: this.getTotal()
    };
  }

  componentDidMount() {
    axios.get('http://localhost:17000/recipes/')
      .then(res => {
        this.setState({ recipes: res.data, connection: true })
      })
      .catch((err) => {
        console.log( "Axios is returning an error: ", err);
        this.setState({ connection: false })
      })
  }

  recipeList() {
    return this.state.recipes.map(currentrecip => {
      return <Recipes recipe={currentrecip} 
        deleteRecipe={this.deleteRecipe}
        key={currentrecip._id}/>
    });
  }

  getTotal() {
    axios.get('http://localhost:17000/recipes/count/')
      .then(res => {
        this.setState({
          count: res.data
        })
      })
      .catch((err) => {
        console.log("Axios error ", err);
        this.setState({ connection: false })
      })
  }

  deleteRecipe(id) {
    axios.delete('http://localhost:17000/recipes/delete/' + id)
      .then(res => console.log(res.data));
    this.setState({
      recipes: this.state.recipes.filter(el => el._id !== id)
    })
  }

  render() {
    if (this.state.connection) {
      return (
        <div>
          <h3>Logged Recipes</h3>
          <div className="container">
            <div className="alert alert-success row">
              <h4 className="col-11">Total Recipes Available</h4>
              <div className="col-1">
                <h4>{this.state.count}</h4>
              </div>
            </div>
          </div>
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
      );
    } else {
      return <ServerError />;
    }
  }
}
