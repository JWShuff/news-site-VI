import React, { Component } from 'react';
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser.js';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ArticleList = (props) => {
  
  const { articles } = props;
  return (
    <ListGroup className='shadow'>
      { articles.map((article, index) => (
        <ListGroupItem  key={index}>
          <ArticleTeaser { ...article } />
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default ArticleList;