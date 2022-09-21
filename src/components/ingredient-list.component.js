import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ServerError from './servererror.component';
import axios from 'axios';

// delete needs a confirm state
const Ingredients = props => (
  <tr>
    <td>{props.ingredient.name}</td>
    <td>{props.ingredient.description}</td>
    <td>{props.ingredient.serving}</td>
    <td>{props.ingredient.unit}</td>
    <td>
      <Link to={'/ingredients/update/' + props.ingredient._id}>edit</Link> 
      &nbsp;|&nbsp;
      <a href="#" onClick={() => { props.deleteIngredient(props.ingredient._id)}}>delete</a>
      &nbsp;|&nbsp;
      <Link to={'/ingredients/create/'}>create</Link> 
    </td>
  </tr>
)

export default class IngredientsList extends Component {
  constructor (props) {
    super (props);
    this.state = { 
      connection: false,
      ingredients: [],
      count: 0
    };
  }

  componentDidMount() {
    axios.get('http://localhost:17000/ingredients/')
      .then(res => {
        this.setState({ 
          connection: true,
          ingredients: res.data,
          count: this.getTotal()
        })
      })
      .catch((err) => {
        console.log( "Axios is returning an error: ", err);
        this.setState({ connection: false })
        })
  }

  deleteIngredient(id) {
     axios.delete('http://localhost:17000/ingredients/delete/' + id)
      .then(res => console.log(res.data));
    this.setState({ 
      ingredients: this.state.ingredients.filter(el => el._id !== id) 
    });

    window.location="/";
  }

  ingredientList() {
    return this.state.ingredients.map(currentingr => {
      return <Ingredients ingredient={currentingr} 
        deleteIngredient={this.deleteIngredient}
        key={currentingr._id}/>
    });
  }

  getTotal() {
    axios.get('http://localhost:17000/ingredients/count/')
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

  render() {
    if(this.state.connection) {
      return (
        <div>
          <h3>Logged Ingredients</h3>
          <div className="container">
            <div className="alert alert-success row">
              <h4 className="col-11">Total Ingredients Available</h4>
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
