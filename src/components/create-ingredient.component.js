import React, { Component } from 'react';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      serving: Number(0),
      unit: '',
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeServing = this.onChangeServing.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);
  
    this.onSubmit = this.onSubmit.bind(this);

    this.userInput = React.createRef();
  }

  componentDidMount() {
    axios.get('http://localhost:17000/ingredients/')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            //ingredient: res.data.map( ingred => ingredient.name ),
            //ingredient: 'Enter ingredient name here'
          });
        }
      });
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
  
  onChangeServing(e) {
    this.setState({
      serving: e.target.value
    });
  }

  onChangeUnit(e) {
    this.setState({
      unit: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const ingredient = {
      name: this.state.name,
      description: this.state.description,
      serving: this.state.serving,
      unit: this.state.unit
    }

    console.log(ingredient);
    
    axios.post('http://localhost:17000/ingredients/create', ingredient) 
      .then(res => console.log(res.data));

    //window.location = '/';  // prevents a visual on console when active.
  }

  render() {
    return (
      <div>
        <h3>Create New Ingredient</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Name: </label>
            <input type='text'
              required 
              className='form-control'
              value={this.state.name}
              onChange={this.onChangeName}
            />
        </div>
          <div className='form-group'>
            <label>Description: </label>
            <input type='text'
              required 
              className='form-control'
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
         <div className='form-group'>
            <label>Serving: </label>
            <input type='text'
              required 
              className='form-control'
              value={this.state.serving}
              onChange={this.onChangeServing}
            />
          </div>
          <div className='form-group'>
            <label>Unit: </label>
            <div>
              <input type='text'
                required
                className='form-control'
                value={this.state.unit}
                onChange={this.onChangeUnit}
              />
            </div>
          </div>
          <div className='form-group'>
            <input type='submit' value='Create Ingredient' className='btn btn-primary' />
          </div>
        </form>
        </div>
    );
  }
}
