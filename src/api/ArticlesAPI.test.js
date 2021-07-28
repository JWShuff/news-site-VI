
import ArticlesAPI from './ArticlesAPI'
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

it('submits an article by calling addArticle()', () => {
  const articleObject = {
    title: 'test',
    byline: 'title',
    abstract: 'adsf'
  };
  return ArticlesAPI.addArticle(articleObject, 'token')
    .then((json) => {
      console.log(json)
      const requestBody = request._calls[0][1].body;
      const headers = request._calls[0][1].headers;
      expect(headers.Authorization).toEqual('token');
      expect(requestBody).toEqual(JSON.stringify(articleObject));
      expect(json.ok).toEqual(true);

    })
    .catch((err) => {
      throw new Error('Call failed');
    });
});
