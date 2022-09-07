import React, { Component } from 'react';
import axios from 'axios';

export default class EditRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Nothing to see here...',
      error: '' 
    }
  }
  componentDidMount() {
    // prob won't work
    axios.get('http://localhost:5000/recipes/edit' + this.prop.match.param.id)
      .then(response => {
        console.log(response);
        this.setState({
          message: 'Wow, we found something, but can\'t load it yet...'
        })
      })
      .catch(function(err) {
        console.log(err);
        this.setState({
          error: 'Could not connect to db...'
        })
      })
  }
  render() {
    return (
      <div>
        <h3>Editing the Recipe</h3>
        <p>{this.state.message}</p>
      </div>
    )
  }
}
