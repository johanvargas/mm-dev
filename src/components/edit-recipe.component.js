import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

 class EditRecipe extends Component {
  constructor(props) {
    super(props);

    // name, description, duration, notes, ingredients

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    
    this.userInput = React.createRef();
    
    const { id } = this.props.params;

    this.state = {
      new_id: id,
      name: '', 
      description: '',
      duration: Number,
      notes: '',
      ingredients: [],

      message: 'Nothing to see here...',
      error: '' 
    }
  }

  componentDidMount() {
    // prob won't work
    axios.get('http://localhost:17000/recipes/' + this.state.new_id)
      .then(response => {
        this.setState({
          name: response.data.name, 
          description: response.data.description,
          duration: Number(response.data.duration),
          notes: response.data.notes,
          ingredients: [...response.data.ingredients],
          message: 'Wow, we found something, but can\'t load it yet...'
        })
      })
      .catch(function(err) {
        console.log(err);
        this.setState({
          error: 'There seems to be a bug in the system...'
        })
      })
  }
   
   onChangeName(e) {
     this.setState({
       name: e.target.value
     }) 
   }

   onChangeDescription(e) {
     this.setState({
       description: e.target.value
     }) 
   }

   onChangeDuration(e) {
     this.setState({
       duration: e.target.value
     })
   }

   onChangeNotes(e) {
     this.setState({
       notes: e.target.value
     })
   }

   // should be component that can only be removed.
   // onMouseOver, remove button appears
   // onClick, remove items
   // 
   // seperately a add ingredient button should be at the top of list
   // w/ input field, add to ingredients array on submit
   onChangeIngredients(e) {
     console.log(e);
   }

  onSubmit(e) {
     e.preventDefault();

     const recipe = {
       name: this.state.name, 
       description: this.state.description,
       duration: Number(this.state.duration),
       notes: this.state.notes,
       ingredients: Array(this.state.ingredients),
     }

     console.log(recipe);

     axios.post('http://localhost:17000/recipes/update/' + this.state.new_id, recipe)
       .then(res => console.log(res.data));
   }

   render() {
     return (
        <div>
          <h3>Update Recipe</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Name: </label>
              <input ref={this.userInput}
                  required
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChangeName}>
              </input>
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}/>
            </div>
            <div className="form-group">
              <label>Duration: </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}/>
            </div>
            <div className="form-group">
              <label>Notes: </label>
              <div>
                <input
                  className="form-control"
                  type="text"
                  selected={this.state.notes}
                  value={this.state.notes}
                  onChange={this.onChangeNotes}/>
              </div>
            </div>
            <div className="form-group">
              <label>Ingredients: </label>
              {
                this.state.ingredients.map((i, index) => {
                  return <p className="form-control" value={i} onMouseOver={this.onChangeIngredients} key={index}>{i}</p>
                })
              }
            </div>
            <div className="form-group mt-4">
              <input type="submit" value="Update Recipe" className="btn btn-primary" />
            </div>
          </form>
        </div>
    )
  }
}

export default (props) => (<EditRecipe {...props} params={useParams()} />)
