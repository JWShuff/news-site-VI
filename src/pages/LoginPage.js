import { Component } from "react";
import { Form, FormGroup, Button, Input, Label} from "reactstrap";
import UsersAPI from "../api/UsersAPI";


class LoginPage extends Component {

  handleLogin = async (evt) => {
    evt.preventDefault();
    let emailValue = (evt.target.email.value)
    let passwordValue = (evt.target.password.value)
    let credentials = {
      email: emailValue,
      password: passwordValue
    }
    console.log(credentials)
    let user = await UsersAPI.login(credentials)
    this.props.handleLogin(user)
  }
  render() {
    return ( 
      <div>
        <h1 className='m-2'>Login Page!</h1>
        <Form onSubmit={this.handleLogin}>
          <FormGroup>
            <Label>Email Address</Label>
            <Input required name='email' placeholder='user@mail.com'></Input>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input required name='password' type='password' placeholder='password'></Input>
          </FormGroup>
          <Button variant='secondary' type='submit'>Submit</Button>
        </Form>
      </div>
     );

  }
}
 
export default LoginPage;