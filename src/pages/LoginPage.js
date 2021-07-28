import { Form, FormGroup, Button, Input, Label} from "reactstrap";


const LoginPage = () => {

  const handleLogin = (evt) => {
    evt.preventDefault();
    console.log(evt.target.email.value)
    console.log(evt.target.password.value)
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