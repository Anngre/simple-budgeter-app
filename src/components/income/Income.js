import React, { useMemo, useState } from 'react'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import SectionTitle from '../../section/SectionTitle'
import Error from '../error/Error'
import styles from './Income.module.css'


export default function Income({currentBudget}) {
  const [incomes, setIncomes] = useState(currentBudget.incomes)
  const { updateDocument, error} =useUpdateDocument()
  const incomesSum = useMemo(() => {
    return incomes.reduce((acc, income) => {
      return acc + income.amount
   }, 0)
  },[incomes])


  const handleAddClick = () => {
    setIncomes([...incomes, {type: '', amount: 0}])
  }

  const handleDelClick = () => {
    if (incomes.length > 1) {
      setIncomes(incomes.slice(0,-1))
    }
  }

  const handleChange = (key, value, index) => {
    setIncomes(incomes.map((income, i) => { 
      if(i !== index) {
        return income
      }  
      return (key === 'type' ? {...income, type: value || ''} : {...income, amount: parseFloat(value) || 0}) 
    }))
  }

  const handleAmountChange = (value, index) => {
    // FIXME: Cannot remove single 0
      handleChange('amount', value, index)
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
        <span className={styles.inputType}>Type of the income:</span>
        <span className={styles.inputType}>Amount:</span>
        {incomes.map((income, i) => {
          return (<React.Fragment key={i}>
            <input className={styles.incomeInput} type='text' value={income.type || ''} onChange={(e) => handleChange('type', e.target.value, i)} onKeyUp={handleKeyUp} onBlur={handleBlur}></input>
            <input className={styles.incomeInput} type='number' value={income.amount.toString()} onChange={(e)=>handleAmountChange(e.target.value, i)} onKeyUp={handleKeyUp} onBlur={handleBlur}></input>
          </React.Fragment>)
        })}
        
        <div className={styles.incomeTotal}>Total income:</div>
        <div className={styles.incomeTotalAmount}>{incomesSum}</div>
      </div>
      {error && <Error error='There was a problem with saving the data. Please type your update again.'/>}

    </div>
  )
}
