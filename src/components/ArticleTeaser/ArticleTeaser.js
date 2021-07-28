import React, { Component } from 'react';
import { ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';

const ArticleTeaser = (props) => {
  

  const { id, title, created_date: createdDate } = props;
  return (
    <div>
      <ListGroupItemHeading >
        <Link  to={`/articles/${id}`}>{title}</Link>
      </ListGroupItemHeading>
      <ListGroupItemText>{ createdDate }</ListGroupItemText>
    </div>
  )

}

export default ArticleTeaser;


// Functional solution:
// function ArticleTeaser({ id, title, created_date: createdDate }) {
//   return (
//     <div>
//       <ListGroupItemHeading>
//         <Link to={`/articles/${id}`}>{title}</Link>
//       </ListGroupItemHeading>
//       <ListGroupItemText>{createdDate}</ListGroupItemText>
//     </div>
//   );
// }
