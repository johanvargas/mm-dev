import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      duration: Number(0),
      ingredients: Array,
      notes: ''
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.userInput = React.createRef();
  }
 
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDuration (e) {
    this.setState({
      duration: e.target.value
    });
  }

  // array, needs something different.
  onChangeIngredients(e) {
    this.setState({
      ingredients: e.target.value
    });
  }

  onChangeNotes(e) {
    this.setState({
      notes: e.target.value
    });
  }

  onSubmit (e) {
    e.preventDefault();

    const recipe = {
      name: this.state.name,
      description: this.state.description,
      duration: this.state.duration,
      ingredients: this.state.ingredients,
      notes: this.state.notes
    }

    console.log(recipe);

    // backend server is on port 17000
    axios.post('http://localhost:17000/recipes/create', recipe) 
      .then(res => console.log(res.data))
  }

  render() {
    return (
      <div>
        <h3>Create New Recipe</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.name}
              onChange={this.onChangeName} />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.description}
              onChange={this.onChangeDescription} />
          </div>
          <div className="form-group">
            <label>Duration: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.duration}
              onChange={this.onChangeDuration} />
          </div>
          <div className="form-group">
            <label>Notes: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.notes}
              onChange={this.onChangeNotes} />
          </div>
          <div className="form-group">
            <label>Ingredients: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.ingredients}
              onChange={this.onChangeIngredients} />
          </div>
          <div className='form-group'>
            <input type='submit' value='Create User' className='btn btn-primary' />
        </div>
        </form>
      </div>
    );
  }
}
