import { useEffect, useState } from 'react'
import {Button, Form, FormGroup, Input, InputGroup, InputGroupAddon } from 'reactstrap' 

const SearchBar = (props) => {

  const handleSearch = (evt) => {
    evt.preventDefault()
    console.log(evt.target.input.value)
    props.handleFilterText(evt.target.input.value)
  }

  return (
    <Form className='form-inline' onSubmit={handleSearch}>
      <FormGroup>
        <InputGroup>
          <InputGroupAddon addonType='prepend' type='submit'>
            <Button color='secondary'>Search</Button>
          </InputGroupAddon>
          <Input name='input' type="text" placeholder="Filter Articles" />
        </InputGroup>
      </FormGroup>
    </Form>
  );
}
 
export default SearchBar;