import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchRecipe from './components/searchRecipe';
import SearchCategory from './components/searchCategory';
import randomRecipes from './components/randomRecipes';
import ViewRecipe from './components/viewRecipe';
import RandomRecipe from './components/randomRecipe';


function App() {
  return (
    <Router>
      <div className="container">
        <div className="search-cont">
          <Route path="/" component={SearchRecipe}/>
          <Route exact path="/" component={SearchCategory}/>
        </div>
        <div className="content">
          <Route exact path="/search/:id" component={ViewRecipe}/>
          <Route exact path="/" component={RandomRecipe}/>
          <Route exact path="/" component={RandomRecipe}/>
          <Route exact path="/" component={RandomRecipe}/>
          <Route exact path="/" component={RandomRecipe}/>
          <Route exact path="/" component={RandomRecipe}/>
          <Route exact path="/" component={RandomRecipe}/>
        </div>
      </div>
      </Router>
  );
}

export default App;
