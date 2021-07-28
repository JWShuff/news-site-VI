import React, { Component, useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList/ArticleList.js'
import ArticlesAPI from '../api/ArticlesAPI';

class HomePage extends Component {
  state = {
    articles: [],
    filterText: '',
    searchText: ''
  }

  
  async updateArticles() {
    try {

      console.log('searchtext is: ', this.state.searchText)
      const json = await ArticlesAPI.fetchArticles(this.state.searchText);
      this.setState({
        articles:json
      })
    } catch (error) {
      console.error('error found fetching articles: ', error);
    }
  };
  
  //Loads at render:
  async componentDidMount() {
    this.updateArticles();
  }
  
  
  // updates based on search text
  componentDidUpdate(prevProps, prevState) {
    console.log('prevprops differ')
    if (prevProps.filterText !== this.props.filterText) {
      this.setState({
        searchText: (this.props.filterText)
      })
    }
    if(prevState.searchText !== this.state.searchText) {
      this.updateArticles()
    }
  }

  render() {
    return (
      <div>
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

export default HomePage;

