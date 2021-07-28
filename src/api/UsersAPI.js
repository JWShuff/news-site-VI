

const BASE_URL="http://localhost:3001/api/users/login?include=user";

const login = async (credentialsObject) => {
  try {
    let response=await fetch(BASE_URL, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body:JSON.stringify(credentialsObject)
    }) 
    if(!response.ok) throw response.statusText;
    let data = await response.json();
    return (data);
  } catch (error) {
    console.error('Login Failed with the following message: ', error)
  }
}

const addArticle = async (articleObject, token) => {
  try {
    let response = await fetch(BASE_URL, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
      },
      method: 'POST',
      body: JSON.stringify(articleObject)
    })
    if (!response.ok) throw response.statusText;
    let data = await response.json();
    return (data);
  } catch (error) {
    console.error('Add Article failed: ', error)
  }
}

export default {
  login: login
}
