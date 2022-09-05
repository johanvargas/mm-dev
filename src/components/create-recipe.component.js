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
      notes: '',
      
      ingreds: null,
      value: '',

    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeIngredients = this.onChangeHandler.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.userInput = React.createRef();

    // search by id for
    this.search = async val => {
      const res = await axios.get('http://localhost:17000/ingredients/' + val);
      console.log(res);

      const ingreds = await res.data.name;

      this.setState({
        ingreds
      });
    }
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
 // onChangeIngredients(e) {
 //   this.setState({
 //     ingredients: e.target.value
 //   });
 // }
  onChangeNotes(e) {
    this.setState({
      notes: e.target.value
    });
  }

  onChangeHandler(e) {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  }

  renderIngredients() {
    let ingreds = <h1>no ingredients yet</h1>;
    if(this.state.ingreds) {
      ingreds = <p>{this.state.ingreds}</p>;
    }

    return ingreds;
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
              value={this.state.value}
              onChange={e => this.onChangeHandler(e)}
              placeholder='type ingredient to add'
            />

          </div>
            {this.renderIngredients()}
          <div className='form-group'>
            <input type='submit' value='Create User' className='btn btn-primary' />
        </div>
        </form>
      </div>
    );
  }
}
