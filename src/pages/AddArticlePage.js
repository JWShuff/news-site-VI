import {Component} from 'react'
import { Form, FormGroup, Button, Input, Label } from "reactstrap"
import ArticlesAPI from "../api/ArticlesAPI"
import UserContext from '../contexts/UserContext'

class AddArticlePage extends Component {
  state = {
    isSubmitted:false,
    submissionSuccess:false,
    subMessage: "Please fill out the form."
    }

  handleForm = async (evt, userToken) => {
    evt.preventDefault();
    let articleObject = {
      'title': evt.target.title.value,
      'byline': evt.target.byline.value,
      'abstract': evt.target.abstract.value
    }
    this.setState({
      subMessage: `Submitted, but not successful.`
    })
    try {
      let article = await ArticlesAPI.addArticle(articleObject, userToken)
      console.log(article)
      if (article.title) {
        this.setState({
              isSubmitted:true,
              submissionSuccess: true,
              subMessage:`Success! Article Title: ${article.title}`
            })
            return this.props.history.push(`/articles/${article.id}`)
          } else {
            this.setState({
              isSubmitted: true,
              subMessage:`Error adding article, status text: ${article}`
              })
            
          }
        } catch (error) {
          this.setState({
            subMessage:`Error! JSON returned: ${article}`
          })
        }
  }

  render() { 
    return ( 
      <div>
        <div>
          { !this.state.isSubmitted && !this.state.submissionSuccess ? 
          <h4 className='bg-secondary text-light'> { this.state.subMessage }</h4>
          : <h4 className='bg-danger text-light'>{this.state.subMessage}</h4>
          }
        </div>
         {/* <h4 className='bg-success text-dark'> {this.state.subMessage}</h4> */}
        <UserContext.Consumer>
          {user => (
            user.use ? (
              <Form onSubmit={(event) => this.handleForm(event, user.use.id)}>
                <FormGroup>
                  <Label>
                    Title:
                  </Label>
                  <Input required type='text' name='title' placeholder='Rabid puppies arise from the depths' />
                </FormGroup>
                <FormGroup>
                  <Label>
                    Byline:
                  </Label>
                  <Input required type='text' name='byline' placeholder='By: Dr. So-and-so' />
                </FormGroup>
                <FormGroup>
                  <Label>
                    Abstract:
                  </Label>
                  <Input  type='textarea' name='abstract' placeholder='Article Abstract Goes Here' />
                </FormGroup>
                <Button color='success' type='submit'>Submit Article</Button>
              </Form>
            )
            : (
              <h4>Login Please</h4> 
            )
          )}
        </UserContext.Consumer>
      </div>
     );
  }
}
 
export default AddArticlePage;