import { useState } from 'react'
import Form from '../components/form/Form'
import Input from '../components/input/Input'
import Error from '../components/error/Error'
import { useSignup } from '../hooks/useSignup'
import Spinner from '../components/spinner/Spinner'
import Navbar from '../components/navbar/Navbar'

export default function Signup() {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isPending } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, displayName);
  }

  return (
   <div>
     <Navbar  />
     {isPending ? <Spinner /> :
       (<Form buttonLabel='Signup' onSubmit={handleSubmit}>
         <Input text='Your name:' type='text' onChange={setDisplayName} value={displayName} autoFocus={true}/>
         <Input text='Email:' type='email' onChange={setEmail} value={email}/>
         <Input text='Password:' type='password' onChange={setPassword} value={password}/>
         {error && <Error error={error} />}
       </Form>)
     }
   </div>
  )
}
