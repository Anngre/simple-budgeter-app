import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useNarrowScreen } from '../hooks/useNarrowScreen'
import Form from '../components/form/Form'
import Input from '../components/input/Input'
import Error from '../components/error/Error'
import Spinner from '../components/spinner/Spinner'
import Navbar from '../components/navbar/Navbar'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()
  const isNarrowScreen = useNarrowScreen()
  
  const handleSubmit = async (e) => {   
    e.preventDefault()
    await login(email, password);
  }

  return (
      <div>
        <Navbar isNarrowScreen={isNarrowScreen}/>
        {isPending ? <Spinner /> : 
        (<Form buttonLabel='Login' onSubmit={handleSubmit}>
            <Input text='Email:' type='email' onChange={setEmail} value={email} autoFocus={true}/>
            <Input text='Password:' type='password' onChange={setPassword} value={password}/>
            {error && <Error error={error}/>}
          </Form>)}
      </div>
  )
}
