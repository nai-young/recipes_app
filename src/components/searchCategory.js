import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';

class SearchCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      categories: [],
      catId: ''
    }
  }
  componentDidMount () {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => {
        this.setState({
          categories: res.data.categories
        })
      })
  }
   listRecipes = () => {
     return this.state.recipes.map(res => {
      return <Card key={res.idMeal} style={{ width: '30rem' }}>
        <Card.Img variant="top" src={res.strMealThumb} alt={res.strMeal} />
        <Card.Title >{res.strMeal}</Card.Title>
        <Button variant="info"><Link to={"/" + res.idMeal} className="details">Details</Link></Button>
      </Card>
    })
  }  
  getCategory = () => {
    //this.props.history.push('/categories')
    const cat = this.props.match.params.id
    console.log(cat)
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
      .then(res => {
        this.setState({
          recipes: res.data.meals
        })
      })
  } 
  listCategories = () => {
    return this.state.categories.map(category => {
      return <li key={category.idCategory}>
        <Link to={"/categories/" + category.strCategory}
          onClick={this.getCategory} 
          className="categ-link">
            {category.strCategory}
        </Link>
      </li>
    })
  } 
  render () {
    return (
      <div>
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

export default withRouter(SearchCategory)