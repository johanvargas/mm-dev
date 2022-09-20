import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class EditIngredient extends Component {
  constructor(props) {
    super(props);

    // name, description, serving, unit
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeServing = this.onChangeServing.bind(this);
    this.onChangeUnit = this.onChangeUnit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.userInput = React.createRef();

    const { id } = this.props.params;

    this.state = {
      new_id: id,
      name: '',
      description: '',
      serving: 0,
      unit: '',
      error: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:17000/ingredients/'+ this.state.new_id)
      .then(response => {
        console.log(response)
        this.setState({
          name: response.data.name,
          description: response.data.description,
          serving: response.data.serving,
          unit: response.data.unit
        })   
      })
      .catch(function (error) {
        console.log(error);
        this.setState({
          error: "Could not pull data, try again!"
        });
      })
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

    // name, description, serving, unit
    const ingredient = {
      name: this.state.name,
      description: this.state.description,
      serving: this.state.serving,
      unit: this.state.unit
    }

    console.log(this.state.new_id);

    axios.post('http://localhost:17000/ingredients/update/' + this.state.new_id, ingredient)
      .then(res => console.log(res.data));

    // window.location = '/';
  }
  render() {
    return (
    <div>
      <h3>Edit Ingredient</h3>
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
          <label>Serving: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.serving}
              onChange={this.onChangeServing}/>
        </div>
        <div className="form-group">
          <label>Unit: </label>
          <div>
            <input
              className="form-control"
              type="text"
              value={this.state.unit}
              onChange={this.onChangeUnit}/>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Ingredient" className="btn btn-primary" />
        </div>
      </form>
    </div>
    );
  }
}

export default (props) => (<EditIngredient {...props} params={useParams()} />)
