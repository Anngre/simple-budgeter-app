import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import Form from '../components/form/Form'
import Input from '../components/input/Input'
import Error from '../components/error/Error'
import Spinner from '../components/spinner/Spinner'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()
  
  const handleSubmit = async (e) => {   
    e.preventDefault()
    await login(email, password);
  }

  return (
    <>
      {isPending ? <Spinner /> : 
       (<Form buttonLabel='Login' onSubmit={handleSubmit} >
          <Input text='Email:' type='email' onChange={setEmail} value={email}/>
          <Input text='Password:' type='password' onChange={setPassword} value={password}/>
          {error && <Error error={error}/>}
        </Form>)
      }
    </>
  )
}
