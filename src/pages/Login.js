import { useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {   
    e.preventDefault()
    console.log(email, password);
  }


  return (
    <Form buttonLabel='Login' onSubmit={handleSubmit} >
      <Input text='Email:' type='email' onChange={setEmail} value={email}/>
      <Input text='Password:' type='password' onChange={setPassword} value={password}/>
    </Form>
  )
}
