import { Form, FormGroup, Button, Input, Label} from "reactstrap";
import UsersAPI from "../api/UsersAPI";


const LoginPage = () => {

  const handleLogin = async (evt) => {
    evt.preventDefault();
    let emailValue = (evt.target.email.value)
    let passwordValue = (evt.target.password.value)
    let credentials = {
      email: emailValue,
      password: passwordValue
    }
    console.log(credentials)
    let data = await UsersAPI.login(credentials)
    console.log(data)
  }

  return ( 
    <div>
      <h1 className='m-2'>Login Page!</h1>
      <Form onSubmit={handleLogin}>
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
 
export default LoginPage;