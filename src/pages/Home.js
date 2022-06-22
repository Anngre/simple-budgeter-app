import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useGetDocument } from '../hooks/useGetDocument'
import Navbar from '../components/navbar/Navbar';
import Spinner from '../components/spinner/Spinner'
import Error from '../components/error/Error'
import Button from '../components/button/Button'
import styles from './Home.module.css'
import Income from '../components/income/Income'
import Budget from '../components/budget/Budget'
import Modal from '../components/modal/Modal'
import CreateBox from '../components/createBox/CreateBox';


export default function Home() {
  const [isCreateBoxVisible, setIsCreateBoxVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] =useState(false)
  const [isCurrentBudgetNeeded, setIsCurrentBudgetNeeded] = useState(false)
  const { user } = useAuthContext()
  const { document: userDoc, isPending: userDocIsPending, error: userDocError} = useGetDocument('users', user.uid)
  const currentBudgetID = userDoc?.currentBudgetID
  const { document: currentBudget, isPending: getCurrentBudgetIsPending, error: getCurrentBudgetError } = useGetDocument('budgets', currentBudgetID)
  const [incomesSum, setIncomesSum] = useState(null)

  const handleCreateBudgetClick = (isCurrentBudgetNeeded) => {
    setIsCurrentBudgetNeeded(isCurrentBudgetNeeded)
    setIsCreateBoxVisible(true)
    hideModal()
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  if (getCurrentBudgetIsPending || userDocIsPending) {
    return <Spinner />
  }

  if (getCurrentBudgetError || userDocError) {
    return <Error error={getCurrentBudgetError || userDocError}/>
  }

  const currentView = (() => {
    if (!currentBudget && !isCreateBoxVisible) {
      return 'start'
    }

    if (currentBudget && !isCreateBoxVisible) {
      return 'budget'
    }

    if (isCreateBoxVisible) {
      return 'newBudget'
    }

    console.error('Missing current view')
  })()

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        {(currentView === 'start') &&
        <div className={styles.startBox}>
          <p>Manage your money:</p>
          <Button label='start' onClick={() => handleCreateBudgetClick(false)} style={{textTransform: 'uppercase'}}/>
        </div>}
        {currentView === 'budget' && 
        <>
          <div className={styles.sidebarContainer}>sidebar</div>
          <div className={styles.budgetContainer}>   
            <Income currentBudget={currentBudget} setIncomesSum={setIncomesSum}/>
            <Budget currentBudget={currentBudget} incomesSum={incomesSum} handleModal={setIsModalOpen}/>
          </div>
        </>}
        {currentView === 'newBudget' && 
        <div className={styles.createBoxContainer}>
          <CreateBox currentBudget={isCurrentBudgetNeeded ? currentBudget : null} onBudgetCreated={() =>  setIsCreateBoxVisible(false)}/>
        </div>}        
      </div>
        {isModalOpen && 
        <Modal onBackgroundClick={hideModal} text='Do you want to set up a new budget based on your current categories and their final balances?'>
          <Button label='Yes - include current data' size='small' onClick={() => handleCreateBudgetClick(true)} />
          <Button label='No - start from scratch' size='small' color='red' onClick={() => handleCreateBudgetClick(false)}/>
        </Modal>}
    </>
  )
}
