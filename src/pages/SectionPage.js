import React, { useEffect, useState } from 'react';
import ArticlesAPI from '../api/ArticlesAPI';
import ArticleList from '../components/ArticleList/ArticleList.js';

const SectionPage = (props) => {
  const [articles, setArticles] = useState([])


  // Helper Methods
  const updateSectionArticles = async () => {
    try {
      // Load articles that match the section
      const sectionID = props.match.params.sectionID
      const sectionArticles = await ArticlesAPI.fetchArticlesBySection(sectionID);
      setArticles(sectionArticles);
    } catch (e) {
      console.error('error fetching section articles: ', e);
    }
  }

  const filterSectionArticles = async () => {
    try {
      // Load articles that match the section
      const sectionID = props.match.params.sectionID
      const sectionArticles = await ArticlesAPI.fetchArticlesBySection(sectionID);
      if(props.filterText == '') {
        updateSectionArticles();
      }
      else {
        const filterArticles = []
        for (let i=0; i < sectionArticles.length; i++) {
          if (sectionArticles[i].title.includes(props.filterText)) {
            filterArticles.push(sectionArticles[i])
          }
        }
        setArticles(filterArticles)
      }
    } catch (e) {
      console.error('error fetching section articles: ', e);
    }
  }

  // Life cycles:
  useEffect(() => {
    updateSectionArticles();
  }, [])

  useEffect(() => {
    updateSectionArticles();
  }, [props.match.params.sectionID])

  // Filters the section's articles by the text using a helper function.
  useEffect(() => {
    filterSectionArticles();
  }, [props.filterText])

  return (
    <div>
      {articles ? <ArticleList articles={ articles }/> :
        <span>404: Articles Not Found</span>
      }
    </div>
  );
}

export default SectionPage;

