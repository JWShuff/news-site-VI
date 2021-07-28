import {Component} from 'react'
import { Form, FormGroup, Button, Input, Label } from "reactstrap"
import ArticlesAPI from "../api/ArticlesAPI"
import UserContext from '../contexts/UserContext'

class AddArticlePage extends Component {
  state = {
    isSubmitted:false,
    submissionSuccess:false,
    subMessage: ""
    }

  handleForm = async (evt) => {
    evt.preventDefault();
    let articleObject = {
      'title': evt.target.title.value,
      'byline': evt.target.byline.value,
      'abstract': evt.target.abstract.value
    }
    this.setState({
      isSubmitted:true,
    })
    try {
      let article = await ArticlesAPI.addArticle(articleObject, userContext.user.id)
          if (article.title == articleObject.title) {
            this.setState({
              SubmissionSuccess:true,
              subMessage:`Article status code: ${article}`
            })
          } 
        } catch {
          this.setState({
            subMessage:`Error! JSON returned: ${error}`
          })
          console.log(article)
        }
  }


  render() { 
    return ( 
      <div>
        { this.state.isSubmitted && this.state.submissionSuccess?
          <h4 className='bg-success text-dark'> {this.state.subMessage}</h4>
          : !this.state.isSubmitted ? <h4 className='bg-secondary text-light'> Please fill out the form: </h4>
          : <h4 className='bg-danger text-warning'>{this.state.subMessage}</h4>
        }
        <UserContext.Consumer>
          {userContext => (
            <Form onSubmit={this.handleForm}>
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
                <Input required type='textarea' name='abstract' placeholder='Article Abstract Goes Here' />
              </FormGroup>
              <Button color='success' type='submit'>Submit Article</Button>
            </Form>
          )}
        </UserContext.Consumer>
      </div>
     );
  }
}
 
export default AddArticlePage;