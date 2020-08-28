import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Form, Card, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
library.add(faSearch)

class SearchRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      search: ''
    }
  }
  onChangeSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  }
  deleteRecipes = () => {
    this.setState({recipes: []})
  }
  listRecipes = () => { 
    return this.state.recipes.map(res => {
      return <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={res.strMealThumb} alt={res.strMeal} />
        <Card.Body>
        <Card.Title>{res.strMeal}</Card.Title>
          <Card.Text>{res.strInstructions.substring(0, 200) + '...'}</Card.Text>
          <ul className="list-options">
            <li>Category:</li>
            <strong>{res.strCategory}</strong>
            <li>Area: </li>
            <strong>{res.strArea}</strong>
          </ul>
          <button onClick={this.deleteRecipes} variant="info"><Link to={"/search/" + res.idMeal}  className="details">Details</Link></button>
        </Card.Body>
      </Card>
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    const search = this.state.search
    this.props.history.push('/search')
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res => {
      this.setState({
        recipes: res.data.meals
      })
    })
  }
  render () {
    return (
      <div className="search-name">
          <Form onSubmit={this.onSubmit} className="search-name-cont">
            <Form.Group >
            <Form.Label className="label-name">Search Recipe</Form.Label>
            <InputGroup>
                <Form.Control type="text" className="input-search" name="search" value={this.state.search} onChange={this.onChangeSearch} placeholder="Biscuits"/>
                <Button variant="info" type="submit" className="button-search"><FontAwesomeIcon icon="search" className="icon-search"/></Button>
            </InputGroup>
            </Form.Group>
          </Form>
        <div className="content">
          {this.listRecipes()}
        </div>
      </div>
    )
  }
}

export default withRouter(SearchRecipe)