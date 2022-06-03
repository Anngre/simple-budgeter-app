import React, { useEffect, useMemo, useState } from 'react'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import SectionTitle from '../section/SectionTitle'
import Error from '../error/Error'
import styles from './Income.module.css'
import InputCell from '../input/InputCell'
import ColumnHeader from '../section/ColumnHeader'


export default function Income({currentBudget, setIncomesSum}) {
  const [incomes, setIncomes] = useState(currentBudget.incomes)
  const { updateDocument, error} = useUpdateDocument()

  const incomesSum = useMemo(() => {
    return incomes.reduce((acc, income) => {
      return acc + income.amount
   }, 0)
  },[incomes])

  useEffect(() =>  {
    setIncomesSum(incomesSum)
  },[incomesSum])

  const handleAddClick = () => {
    setIncomes([...incomes, {type: '', amount: 0}])
  }

  const handleDelClick = () => {
    if (incomes.length > 1) {
      setIncomes(incomes.slice(0,-1))
    }
  }

  const handleChange = (value, index, name) => {
    setIncomes(incomes.map((income, i) => { 
      if(i !== index) {
        return income
      }  
      return (name === 'type' ? {...income, type: value || ''} : {...income, amount: parseFloat(value) || 0}) 
    }))
  }

  const handleAmountChange = (value, index) => {
    // FIXME: Cannot remove single 0
      handleChange(value, index, 'amount')
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
    }
  }

  const handleBlur = () => {
    updateDocument('budgets', currentBudget.docID, {incomes, incomesSum})
  }

  return (
    <div className={styles.incomesContainer}>
      <h3 className={styles.budgetTitle}>{currentBudget.budgetTitle}</h3>
      <SectionTitle title='Incomes:' handleAddClick={handleAddClick} handleDelClick={handleDelClick}/>
      <div className={styles.incomes}>
        <ColumnHeader text='Type of the income' />
        <ColumnHeader text='Amount' />
        {incomes.map((income, i) => {
          return (<React.Fragment key={i}>
            <InputCell index={i} type='text' value={income.type || ''} handleChange={handleChange} name='type' onKeyUp={handleKeyUp} handleBlur={handleBlur}/>
            <InputCell index={i} type='number' value={income.amount.toString()} handleChange={handleAmountChange} name='amount' onKeyUp={handleKeyUp} handleBlur={handleBlur}/>
          </React.Fragment>)
        })}
        
        <div className={styles.incomeTotal}>Total income:</div>
        <div className={styles.incomeTotalAmount}>{incomesSum}</div>
      </div>
      {error && <Error error='There was a problem with saving the data. Please type your update again.'/>}
    </div>
  )
}
