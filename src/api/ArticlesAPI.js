

const BASE_URL = 'http://localhost:3001/api/articles'

const tryFetch = async (url) => {
  try {
    let response = await fetch(url)
    if (!response.ok) {
      throw response.statusText
    }
    let data = await response.json();
    return data
  } catch (error) {
    console.error(error)
  }
}

const fetchArticleByID = async (articleID) => {
  return await tryFetch(BASE_URL + `/${articleID}`)
}

const fetchArticlesBySection = async (section) => {
  let url = BASE_URL
  url += `?filter={"where":{"section":"${section}"}}`
  return await tryFetch(url)
};

const fetchArticles = async (filterTitle=null) => {
  if (filterTitle == null || filterTitle == '') {
    return await tryFetch(BASE_URL)
  }
  return searchArticles(filterTitle);
};

// helper function to fetch articles with a title query:
const searchArticles = async(query) => {
  const filterUrl = query && query != '' ?
  `${BASE_URL}?filter={"where":{"title":{"ilike":"${query}"}}}`
  : `${BASE_URL}`
  return await tryFetch(filterUrl)
}


const addArticle = async (articleObject) => {
  try {
    let response = await fetch(BASE_URL, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(articleObject)
    })
    let data = await response.json();
    if (data.error) {
      return {
        'message': "there was an error saving the article.",
        'isError': true,
        'statusCode':200
      }
    } else {
      return {
        'message': "Article Successfully Created",
        'isError': false,
        'statusCode': 200
      }
    }
  } catch (error) {
    console.error('Add Article failed: ', error)
  }
}

export default {
  addArticle,
  searchArticles,
  fetchArticles,
  fetchArticlesBySection,
  fetchArticleByID
}