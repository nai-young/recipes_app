import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class ViewRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: []
    }
  }
  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => {
        this.setState({
          recipe: res.data.meals
        })
      })
  }
  listRecipe = () => {
    return this.state.recipe.map(res => {
      return <div className="view-content">
        <h2 name="recipe-title">{res.strMeal}</h2>
        <img className="view-img" src={res.strMealThumb} alt={res.strMeal} />
        <p>{res.strInstructions}</p>
        <ul>
          <li>Category:</li>
          <strong>{res.strCategory}</strong>
          <li>Area: </li>
          <strong>{res.strArea}</strong>
        </ul>
        <h3>Video Explanation</h3>
        <video width="800" height="300" controls>
          <source src={res.strYoutube} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        
      </div>
    })
  }
  render () {
    return(
      <div className="view-container">
      <div >
        <Link to="/" className="view-link">Back to Home</Link>
      </div>
      {this.listRecipe()}
    </div>
    )
  }
}