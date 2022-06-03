import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAddDocument } from '../hooks/useAddDocument'
import { useGetDocument } from '../hooks/useGetDocument'
import Spinner from '../components/spinner/Spinner'
import Error from '../components/error/Error'
import Form from '../components/form/Form'
import Input from '../components/input/Input'
import Button from '../components/button/Button'
import styles from './Home.module.css'
import Income from '../components/income/Income'
import Budget from '../components/budget/Budget'


export default function Home() {
  const [isCreateBoxVisible, setIsCreateBoxVisible] = useState(false)
  const [budgetTitle, setBudgetTitle] = useState('')
  const { user } = useAuthContext()
  const { addDocument, isPending: addDocIsPending, error: addDocError, docID: newBudgetID } = useAddDocument()
  const { document: userDoc, isPending: userDocIsPending, error: userDocError} = useGetDocument('users', user.uid)
  const currentBudgetID = userDoc?.currentBudgetID || newBudgetID
  const { document: currentBudget, isPending: getCurrentBudgetIsPending, error: getCurrentBudgetError } = useGetDocument('budgets', currentBudgetID)
  const [incomesSum, setIncomesSum] = useState(null)


  const handleClick = () => {
    setIsCreateBoxVisible(true)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    await addDocument('budgets', {
      budgetTitle,
      createdBy: user.uid,
      incomes: [{type: '', amount: 0}],
      incomesSum: 0,
      categories: [{
        name: '',
        share: 0,
        startingBalance: 0,
        expenses: [{
          name: '',
          amount: 0
        }],
      }]    
    })
  }

  useEffect(() => {
    if (newBudgetID) {
      addDocument('users',{
        currentBudgetID: newBudgetID
      }, user.uid)
    }
  },[newBudgetID])


  

  if (addDocIsPending || getCurrentBudgetIsPending || userDocIsPending) {
    return <Spinner />
  }

  if (addDocError  || getCurrentBudgetError || userDocError) {
    return <Error error={addDocError || getCurrentBudgetError || userDocError}/>
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>sidebar</div>
      <div className={styles.budgetContainer}>    
        {currentBudget ?
          <>
            <Income currentBudget={currentBudget} setIncomesSum={setIncomesSum}/>
            <Budget currentBudget={currentBudget} incomesSum={incomesSum}/>
          </> : (
            <>
          {isCreateBoxVisible ? (
            <Form buttonLabel='create' onSubmit={handleSubmit}>
              <Input text='Set a title for your budget:' type='text'onChange={setBudgetTitle} value={budgetTitle} />
            </Form> 
          ) : (
            <div className={styles.createBox}>
              <p>Manage your money:</p>
              <Button label='start' onClick={handleClick} type='square' size='regular' color='green'/>
            </div>
          )}
        </>
          )}     
      </div>
    </div>
  )
}
