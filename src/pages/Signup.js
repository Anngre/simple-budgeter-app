import { useState } from 'react'
import Form from '../components/Form'
import Input from '../components/Input'
import { useSignUp } from '../hooks/useSignUp'

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error } = useSignUp()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, displayName);
  }

  console.log(error);

  return (
    <Form buttonLabel='Signup' onSubmit={handleSubmit}>
      <Input text='Your name:' type='text' onChange={setDisplayName} value={displayName}/>
      <Input text='Email:' type='email' onChange={setEmail} value={email}/>
      <Input text='Password:' type='password' onChange={setPassword} value={password}/>
    </Form>
  )
}
