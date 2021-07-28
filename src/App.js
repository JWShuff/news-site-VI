import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AppNav from './components/AppNav/AppNav.js';
import HomePage from './pages/HomePage.js';
import ArticlePage from './pages/ArticlePage.js';
import SectionPage from './pages/SectionPage';
import AddArticlePage from './pages/AddArticlePage';
import LoginPage from './pages/LoginPage'
import UserContext from './contexts/UserContext';

class App extends Component {
  state = {
    filterText: '',
    user:null,
  }

  handleLogin = (user) => {
    this.setState({
      user:user
    })
    console.log(this.state)
  }

  render() { 
    const renderHomePage = (routerProps) => {
      return (
        <HomePage {...routerProps} filterText={this.state.filterText} />
      )
    }
  
     const renderSectionPage = (routerProps) => {
      return (
        <SectionPage {...routerProps} filterText={this.state.filterText} />
      )
    }
    
    const renderLoginPage = (routerProps) => {
      return (
        <LoginPage {...routerProps} handleLogin={this.handleLogin} />
      )
    }
  
    return (
      <div>
        <Router>
          <UserContext.Provider value={{ use: this.state.user }}>
            <AppNav 
              handleNavClick={(clickedItem) => console.log(clickedItem)}
              handleFilterText={(newFilterText) => {
                this.setState({
                  filterText:newFilterText
                })
              }} 
            />
            <div>
              <Route exact path="/" render={renderHomePage} filterText={this.state.filterText}/>
              <Route exact path='/sections/:sectionID' render={renderSectionPage} filterText={this.state.filterText} />
              <Route exact path="/articles/:articleID" component={ArticlePage} />
              <Route exact path='/add-article' component={AddArticlePage} />
              <Route exact path='/login' render={renderLoginPage} />
            </div>
          </UserContext.Provider>
        </Router>
      </div>
    );
  }
}

export default App;