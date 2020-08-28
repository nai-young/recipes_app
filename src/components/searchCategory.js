import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Card, Button, InputGroup, FormControl } from 'react-bootstrap';

/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
library.add(faSearch) */

export default class searchRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      // category: '',
      categories: [],
      catId: ''
    }
  }
  /* onChangeSearch = (e) => {
    this.setState({
      category: e.target.value
    })
  } */
   listRecipes = () => {
    return this.state.recipes.map(res => {
      return <Card style={{ width: '30rem' }}>
        <Card.Img variant="top" src={res.strMealThumb} alt={res.strMeal} />
        <Card.Title >{res.strMeal}</Card.Title>
        <Button variant="info"><Link to={"/" + res.idMeal} className="details">Details</Link></Button>
      </Card>
    })
  } 
  /* onSubmit = (e) => {
    e.preventDefault()
    const category = this.state.category
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => {
        this.setState({
          recipes: res.data.meals
        })
        console.log(res.data)
      })
  } */
  componentDidMount () {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => {
        this.setState({
          categories: res.data.categories
        })
      })
  }
  listCat = (catName) => {
    const cat = catName
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
      .then(res => {
        console.log(res.data.meals)
        this.setState({
          recipes: res.data.meals
        })
      }) 
  } 

   listCategories = () => {
    return this.state.categories.map(category => {
      return <li key={category.idCategory}><a className="categ-link">{category.strCategory}</a></li>
    }) 
  } 
  render () {
    return (
      <div>
          {/* <Form onSubmit={this.onSubmit}>
          <Form.Group >
            <Form.Label>Search category</Form.Label>
          <InputGroup >
            <FormControl type="text" name="category" value={this.state.search} onChange={this.onChangeSearch} placeholder="Breakfast"/>
            <Button variant="info" type="submit"><FontAwesomeIcon icon="search"/></Button>
          </InputGroup>
          </Form.Group>
          </Form> */}
          <div className="categories-cont">
            <h3>Categories:</h3>
            <ul>
              {this.listCategories()}
            </ul>
          </div>
        <div className="search-recipes">
          {this.listRecipes()}
        </div>
      </div>
    )
  }
}
