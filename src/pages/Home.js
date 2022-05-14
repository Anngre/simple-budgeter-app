import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAddDocument } from '../hooks/useAddDocument'
import { useUpdateDocument } from '../hooks/useUpdateDocument'
import { useGetDocument } from '../hooks/useGetDocument'
import Spinner from '../components/spinner/Spinner'
import Error from '../components/error/Error'
import Form from '../components/form/Form'
import Input from '../components/input/Input'
import Button from '../components/button/Button'
import styles from './Home.module.css'
import Income from '../components/income/Income'


export default function Home() {
  const [isCreateBoxVisible, setIsCreateBoxVisible] = useState(false)
  const [budgetTitle, setBudgetTitle] = useState('')
  const { user } = useAuthContext()
  const { addDocument, isPending: addDocIsPending, error: addDocError, docID: newBudgetID } = useAddDocument()
  const { updateDocument, isPending: updateDocIsPending, error: updateDocError } = useUpdateDocument()
  const { document: userDoc } = useGetDocument('users', user.uid)
  const currentBudgetID = userDoc?.currentBudgetID || newBudgetID
  const { document: currentBudget, isPending: getCurrentBudgetIsPending, error: getCurrentBudgetError, } = useGetDocument('budgets', currentBudgetID)

  const handleClick = () => {
    setIsCreateBoxVisible(true)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    await addDocument('budgets', {
      budgetTitle,
      createdBy: user.uid,
      incomes: [{type: '', amount: ''}],
      incomesSum: 0,
      categories: []     
    })
  }

  useEffect(() => {
    if (newBudgetID) {
      updateDocument('users', user.uid, {
        currentBudgetID: newBudgetID
      })
    }
  },[newBudgetID])


  

  if (addDocIsPending || updateDocIsPending || getCurrentBudgetIsPending) {
    return <Spinner />
  }

  if (addDocError || updateDocError || getCurrentBudgetError) {
    return <Error error={addDocError || updateDocError || getCurrentBudgetError}/>
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>sidebar</div>
      <div className={styles.budgetContainer}>    
        {currentBudget ?
          <>
            <Income currentBudget={currentBudget}/>
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
