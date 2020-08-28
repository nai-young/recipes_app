import React, { Component } from 'react'
import randomRecipe from './randomRecipe'

export default class randomRecipes extends Component {
  render() {
    return (
      <div>
        <randomRecipe/>
        <randomRecipe/>
        <randomRecipe/>
        <randomRecipe/>
        <randomRecipe/>
        <randomRecipe/>
      </div>
    )
  }
}