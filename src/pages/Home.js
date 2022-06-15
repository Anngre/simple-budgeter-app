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
import Modal from '../components/modal/Modal'


export default function Home() {
  const [isCreateBoxVisible, setIsCreateBoxVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] =useState(false)
  const [budgetTitle, setBudgetTitle] = useState('')
  const [isCurrentBudgetNeeded, setIsCurrentBudgetNeeded] = useState(false)
  const { user } = useAuthContext()
  const { addDocument, isPending: addDocIsPending, error: addDocError, docID: newBudgetID } = useAddDocument()
  const { document: userDoc, isPending: userDocIsPending, error: userDocError} = useGetDocument('users', user.uid)
  const currentBudgetID = userDoc?.currentBudgetID || newBudgetID
  const { document: currentBudget, isPending: getCurrentBudgetIsPending, error: getCurrentBudgetError } = useGetDocument('budgets', currentBudgetID)
  const [incomesSum, setIncomesSum] = useState(null)

  const createBudget = async (previousBudget) => {
    await addDocument('budgets', {
      budgetTitle,
      createdBy: user.uid,
      incomes: [{type: '', amount: 0}],
      incomesSum: 0,
      categories: previousBudget ? previousBudget.categories.map((category)  => {
        const previousFinalBalance = category.startingBalance - category.expenses.reduce((acc, exp) => { return acc + exp.amount },0)
        return {
          name: category.name,
          share: category.share,
          startingBalance: previousFinalBalance,
          previousFinalBalance,
          expenses: []}
        }) : 
      [{
        name: '',
        share: 0,
        startingBalance: 0,
        previousFinalBalance: 0,
        expenses: []
      }]    
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    isCurrentBudgetNeeded ? createBudget(currentBudget) : createBudget()
    setBudgetTitle('')
    setIsCreateBoxVisible(false)
  }

  useEffect(() => {
    if (newBudgetID) {
      addDocument('users',{
        currentBudgetID: newBudgetID
      }, user.uid)
    }
  },[newBudgetID])

  const handleCreateBudgetClick = (isCurrentBudgetNeeded) => {
    setIsCurrentBudgetNeeded(isCurrentBudgetNeeded)
    setIsCreateBoxVisible(true)
    hideModal()
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }




  

  if (addDocIsPending || getCurrentBudgetIsPending || userDocIsPending) {
    return <Spinner />
  }

  if (addDocError  || getCurrentBudgetError || userDocError) {
    return <Error error={addDocError || getCurrentBudgetError || userDocError}/>
  }

  return (
    <>
      <div className={styles.container}>
        {currentBudget  && <div className={styles.sidebarContainer}>sidebar</div>}
        <div className={styles.budgetContainer}>   
          {currentBudget && !isCreateBoxVisible ?
            <>
              <Income currentBudget={currentBudget} setIncomesSum={setIncomesSum}/>
              <Budget currentBudget={currentBudget} incomesSum={incomesSum} handleModal={setIsModalOpen}/>
            </> : (
              <>
            {isCreateBoxVisible ? (
              <Form buttonLabel='create' onSubmit={handleSubmit}>
                <Input text='Set a title for your budget:' type='text' onChange={setBudgetTitle} value={budgetTitle} />
              </Form> 
            ) : (
              <div className={styles.createBox}>
                <p>Manage your money:</p>
                <Button label='start' onClick={() => handleCreateBudgetClick(false)} style={{textTransform: 'uppercase'}}/>
              </div>
            )}
          </>
            )}     
        </div>
      </div>
        {isModalOpen && 
        <Modal onBackgroundClick={hideModal} text='Do you want to set up a new budget based on your current categories and their final balances?'>
          <Button label='Yes - include current data' size='small' onClick={() => handleCreateBudgetClick(true)} />
          <Button label='No - start from scratch' size='small' color='red' onClick={() => handleCreateBudgetClick(false)}/>
        </Modal>}
    </>
  )
}
