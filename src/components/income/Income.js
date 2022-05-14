import React, { useMemo, useState } from 'react'
import Button from '../button/Button'
import styles from './Income.module.css'


export default function Income({currentBudget}) {
  const [incomes, setIncomes] = useState(currentBudget.incomes)

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
  
  
  return (
    <div className={styles.incomesContainer}>
      <h3 className={styles.budgetTitle}>{currentBudget.budgetTitle}</h3>
      <div className={styles.addIncomeBox}>
        <h4 className={styles.title}>Incomes:</h4>
        <Button label='+' onClick={handleAddClick}/>
        <Button label='-' onClick={handleDelClick} color='red'/>
      </div>
      <div className={styles.incomes}>
        <span className={styles.inputType}>Type of the income:</span>
        <span className={styles.inputType}>Amount:</span>
        {incomes.map((income, i) => {
          return (<React.Fragment key={i}>
            <input className={styles.incomeInput} type='text' value={income.type || ''} onChange={(e) => handleChange('type', e.target.value, i)}></input>
            <input className={styles.incomeInput} type='number' value={income.amount || ''} onChange={(e)=>handleChange('amount', e.target.value, i)}></input>
          </React.Fragment>)
        })}
        
        <div className={styles.incomeTotal}>Total income:</div>
        <div className={styles.incomeTotalAmount}>{incomesSum}</div>
      </div>

    </div>
  )
}
