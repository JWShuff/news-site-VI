import UsersAPI from './UsersAPI';
import fetchMock from 'fetch-mock';
require('isomorphic-fetch');

afterEach(() => {
  fetchMock.restore();
})

it('logs in', async () => {
  const userObject = {email: 'john@doe.com', password: 'opensesame'};
  try {
    let user = await UsersAPI.login(userObject)
    expect(user.ttl).toEqual(1209600);
      } catch(err) {
        throw new Error('Call failed');
      };
});