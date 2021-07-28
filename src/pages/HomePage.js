import { Component, useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList/ArticleList.js'
import ArticlesAPI from '../api/ArticlesAPI';

class HomePage extends Component {
  state = {
    articles:[],
    filterText:'',
    searchText:''
  }

  
  async updateArticles() {
    try {
      setState({
        searchText: this.props.filterText
      })
      const json = await ArticlesAPI.fetchArticles(searchText);
      setState ({
        articles:json
      })
    } catch (error) {
      console.error('error found fetching articles: ', error);
    }
  };
  
  // updates based on search text
  componentDidUpdate(prevProps, prevState) {
    if(this.props.filterText !== prevProps.filterText) {
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

