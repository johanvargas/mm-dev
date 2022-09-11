import React, { Component } from 'react';
import axios from 'axios';
import bindIngredient from './bindingredient.component';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      duration: Number(0),
      ingredients: [],
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
      console.log("search is working on it!")
      const res = await axios.get('http://localhost:17000/ingredients/text/' + val);
      console.log("res is : ", res);
      const ingreds = res.data[0]['name'];  
      console.log("ingreds is : ", ingreds);

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
    let ingreds = <h3>no ingredients yet</h3>;
    if(this.state.ingreds) {
      ingreds = <h3>{this.state.ingreds}</h3>;
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
              onChange={this.onChangeName}
              placeholder='enter name of recipe'/>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.description}
              onChange={this.onChangeDescription}
              placeholder='enter a useful description of how to prepare the recipe'/>
          </div>
          <div className="form-group">
            <label>Duration: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.duration}
              onChange={this.onChangeDuration} 
              placeholder='how long will this take to make?'/>
          </div>
          <div className="form-group">
            <label>Notes: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.notes}
              onChange={this.onChangeNotes}
              placeholder='userful notes for the chef'/>
          </div>
          <div className="form-group">
            <label>Ingredients: </label>
            <input type="text"
              required
              className='form-control'
              value={this.state.value}
              onChange={e => this.onChangeHandler(e)}
              placeholder='type ingredient to add'/>
          </div>
            {this.renderIngredients()}
          <div className='form-group'>
            <input type='submit' value='Create Recipe' className='btn btn-primary' />
        </div>
        </form>
      </div>
    );
  }
}
