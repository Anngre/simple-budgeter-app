import { useState } from 'react'
import { context, useAuthContext } from '../hooks/useAuthContext'
import { useAddDocument } from '../hooks/useAddDocument'
import Spinner from '../components/spinner/Spinner'
import Error from '../components/error/Error'
import Form from '../components/form/Form'
import Input from '../components/input/Input'
import Button from '../components/button/Button'
import styles from './Home.module.css'


export default function Home() {
  const [isCreateBoxVisible, setIsCreateBoxVisible] = useState(false)
  const [budgetTitle, setBudgetTitle] = useState('')
  const { user } = useAuthContext()
  const { docID, addDocument, error, isPending } = useAddDocument()

  const handleClick = () => {
    setIsCreateBoxVisible(true)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    await addDocument('budgets', {
      budgetTitle,
      createdBy: user.uid,
      incomes: [],
      categories: []     
    })
  }

  if (isPending) {
    return <Spinner />
  }

  if (error) {
    return <Error error={error}/>
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>sidebar</div>
      <div className={styles.budgetContainer}>    
        {docID ?
          <>
            <p>Incomes</p>
            <p>Budgets</p>
          </> : (
            <>
          {isCreateBoxVisible ? (
            <Form buttonLabel='create' onSubmit={handleSubmit}>
              <Input text='Set a title for your budget:' type='text'onChange={setBudgetTitle} value={budgetTitle} />
            </Form> 
          ) : (
            <div className={styles.createBox}>
              <p>Manage your money:</p>
              <Button label='start' onClick={handleClick}/>
            </div>
          )}
        </>
          )}     
      </div>
    </div>
  )
}
