import {useState} from 'react'
import { Form, FormGroup, Button, Input, Label } from "reactstrap"
import ArticlesAPI from "../api/ArticlesAPI"

const AddArticlePage = () => {

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [subMessage, setSubMessage] = useState('')

  const handleForm = (evt) => {
    evt.preventDefault();
    let articleObject = {
      'title':evt.target.title.value,
      'byline':evt.target.byline.value,
      'abstract':evt.target.abstract.value
    }
    setIsSubmitted(true)
    ArticlesAPI.addArticle(articleObject)
    .then((json) => {
      if(json.isError == false) {
        setSubmissionSuccess(true)
        setSubMessage(json.message)
      } else if(json.isError == true) {
        setSubMessage(json.message)

      }
      console.log(json.isError)
    })
  }


  return(
    <div>
      { isSubmitted && submissionSuccess?
        <h4 className='bg-success text-dark'> {subMessage}</h4>
        : !isSubmitted ? <h4 className='bg-secondary text-light'> Please fill out the form: </h4>
        : <h4 className='bg-danger text-warning'>{subMessage}</h4>
      }
      <Form onSubmit={handleForm}>
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
    </div>
  )
}

export default AddArticlePage