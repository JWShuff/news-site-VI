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
      this.setState({
        filterText: this.props.filterText
      })
      const json = await ArticlesAPI.fetchArticles(this.state.filterText);
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
    if(this.props.filterText !== this.state.filterText) {
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

