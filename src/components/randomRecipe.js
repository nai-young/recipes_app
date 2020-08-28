import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import '../App.css'

export default class RandomRecipe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recipe: []
    }
  }

  componentDidMount () {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => {
      this.setState({
        recipe: res.data.meals
      })
    })
  }
  listRecipe = () => {
    return this.state.recipe.map(res => {
      return <div key={res.idMeal}>
        <Card style={{ width: '20rem', marginBottom: '2rem' }}>
          <Card.Img variant="top" src={res.strMealThumb} alt={res.strMeal} className="card-img"/>
          <Card.Body>
          <Card.Title>{res.strMeal}</Card.Title>
            <Card.Text>{res.strInstructions.substring(0, 200) + '...'}</Card.Text>
            <ul className="list-options">
              <li>Category: <strong>{res.strCategory}</strong></li>
              <li>Area: <strong>{res.strArea}</strong></li>
            </ul>
            <Link to={"/search/" + res.idMeal} className="details">Details</Link>
          </Card.Body>
        </Card>
      </div>
    })
  }
  render () {
    return (
      <div>
          { this.listRecipe() }
      </div>
    )
  }
}