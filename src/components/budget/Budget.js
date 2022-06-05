import SectionTitle from '../section/SectionTitle'
import InputCell from '../input/InputCell'
import ColumnHeader from '../section/ColumnHeader'
import styles from './Budget.module.css'
import React, { useEffect, useState } from 'react'


export default function Budget({currentBudget, incomesSum}) {
  const [categories, setCategories] = useState(currentBudget.categories)
  const [expensesState, setExpensesState] = useState(categories.map((category) => {
    return false
  }))

  console.log(categories);
  useEffect(() => {
    setCategories(categories.map((category) => {
      return {...category, startingBalance: category.share /100 * incomesSum }
    }))
  }, [incomesSum])

  const handleAddClick = () => {
    setCategories([...categories, {
      name: '',
      share: 0,
      startingBalance: 0,
      expenses: [{
        name: '',
        amount: 0
      }]}])
    setExpensesState([...expensesState, false])
  }
  const handleDelClick = () => {
    if (categories.length >1) {
      setCategories(categories.slice(0, -1))
      setExpensesState(expensesState.slice(0, -1))
    }
  }

  const handleAddExpClick = (index) => {
    setCategories(categories.map((category, i) => {
      return i === index ? {...category, expenses: [...category.expenses, {amount: 0, name: ''}]} : category
    }))
    setExpensesState(expensesState.map((expense, i) => {
      return i === index ? true : expense
    }))
  }

  const handleDelExpClick = (index) => {
    setCategories(categories.map((category, i) => {
      if (category.expenses.length === 1) {
        setExpensesState(expensesState.map((expense, expIndex) => {
          return expIndex === index ? false : expense
        }))
      }
      return i === index ? {...category, expenses: category.expenses.slice(0, -1)} : category
    }))
    
  }

  const handleIconClick = (index) => {
    setExpensesState(expensesState.map((expense, i) => index === i ? !expense : expense
    ))
  }

  const handleChange = (value, index, name) => {
    setCategories(categories.map((category, i) => {
      if (i !== index) {
        return category
      }
      switch (name) {
        case 'name':
          return {...category, name: value}
        case 'share':
          if (0 <= parseFloat(value) &&  parseFloat(value) <= 100) {
            return {...category, share: parseFloat(value), startingBalance: parseFloat(value) / 100 * incomesSum}
          } else {
            return {...category, share: 0, startingBalance: 0}
          }         
        default:
          return category
        }
    }
    ))
  }

  return (
    <div className={styles.budgetContainer}>
      <SectionTitle title='Budget categories:' handleAddClick={handleAddClick} handleDelClick={handleDelClick}/>
      {categories.map((category, i) => {
        return ( 
      <React.Fragment key={i}>
        <div className={styles.budgets}>
          <ColumnHeader text='Name' />
          <ColumnHeader text='Share in %' />
          <ColumnHeader text='Starting balance' />
          <ColumnHeader text='Total expenses' />
          <ColumnHeader text='Final balance' />
          <InputCell type='text' index={i} value={category.name} handleChange={handleChange} name='name'/>
          <InputCell type='number' index={i} value={category.share.toString()} handleChange={handleChange} name='share'/>
          <InputCell disabled={true} type='number' value={category.startingBalance.toString()} />
          <InputCell disabled={true} type='text' />
          <InputCell disabled={true} type='text' />
        </div>
        <div className={styles.expensesContainer}>
          <SectionTitle title='expenses' handleAddClick={handleAddExpClick} handleDelClick={handleDelExpClick} handleIconClick={handleIconClick} index={i} isContainerVisible={expensesState[i]} size='small'/>
          <div className={styles.expensesDetails}>
            {category.expenses.length > 0 && expensesState[i] &&
            <>
              <ColumnHeader text='Name' size='small' />
              <ColumnHeader text='Amount' size='small' style={{gridColumn: '4/-1'}} />
              {category.expenses.map((expense, expIndex) => {
                return (
                  <React.Fragment  key={expIndex}>
                    <InputCell type='text' size='small' style={{gridColumn: '1/4'}}/>
                    <InputCell type='text' size='small' style={{gridColumn: '4/-1', width: '50%'}} /> 
                  </React.Fragment>
                )
              })}
            </>}
          </div>
        </div>
      </React.Fragment>)
      })}
    </div>
  )
}
