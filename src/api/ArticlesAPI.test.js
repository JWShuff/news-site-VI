
import ArticlesAPI from './ArticlesAPI'
import UsersAPI from './UsersAPI'
import fetchMock from 'fetch-mock'
require('isomorphic-fetch')

afterEach(() => {
  fetchMock.restore()
})

it('calls ArticlesAPI.fetchArticleByID(1)', (done) => {
  fetchMock.get('http://localhost:3001/api/articles/1', { success: true })
  ArticlesAPI.fetchArticleByID(1)
    .then((json) => {
      expect(json.success).toEqual(true)
      done()
    })
    .catch((err) => {
      throw new Error('Call failed')
    })
})

it('calls ArticlesAPI.fetchArticles()', (done) => {
  fetchMock.get('http://localhost:3001/api/articles', { success: true })
  ArticlesAPI.fetchArticles()
    .then((json) => {
      expect(json.success).toEqual(true)
      done()
    })
    .catch((err) => {
      throw new Error('Call failed')
    })
})

it('calls ArticlesAPI.fetchArticlesBySection(\'opinion\')', (done) => {
  fetchMock.get('http://localhost:3001/api/articles?filter={"where":{"section":"opinion"}}', { success: true })
  ArticlesAPI.fetchArticlesBySection('opinion')
    .then((json) => {
      expect(json.success).toEqual(true)
      done()
    })
    .catch((err) => {
      throw new Error('Call failed')
    })
})

it('submits an article by calling addArticle()', async () => {
  const userObject = {email: 'john@doe.com', password: 'opensesame'};
  const articleObject = {
    title: 'test',
    byline: 'title',
    abstract: 'adsf'
  };
  let user = await UsersAPI.login(userObject)
  
  let token = user.id
  console.log(token)
  try {
    let json = await ArticlesAPI.addArticle(articleObject, token)
    console.log(json)
    expect(json.title).toEqual('test');
  } catch(err) {
      throw new Error('Call failed');
    };
});
