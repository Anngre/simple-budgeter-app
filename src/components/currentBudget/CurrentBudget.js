import React, { useEffect, useState } from 'react'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import SectionTitle from '../section/SectionTitle'
import InputCell from '../input/InputCell'
import ColumnHeader from '../section/ColumnHeader'
import Button from '../button/Button'
import Error from '../error/Error'
import { calculateStartingBalance } from '../../utilities/Utilities'
import styles from './CurrentBudget.module.css'


export default function CurrentBudget({currentBudget, incomesSum, handleModal}) {
  const [categories, setCategories] = useState(currentBudget.categories)
  const [expensesState, setExpensesState] = useState(categories.map(() => {
    return false
  }))

  const categoryStates = categories.map((category) => {
    const expensesSum = Math.round((category.expenses.reduce((acc, expense) => {
      return (acc + expense.amount)
    }, 0)) * 100) / 100
    return {
      expensesSum,
      finalBalance: category.startingBalance - expensesSum
    }
  })

  const { updateDocument, error } = useUpdateDocument()
  
  useEffect(() => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        return {...category, startingBalance: calculateStartingBalance(category.previousFinalBalance, incomesSum, category.share)}
      })
    })
  }, [incomesSum])

  const handleAddClick = () => {
    setCategories([...categories, {
      name: '',
      share: 0,
      startingBalance: 0,
      previousFinalBalance: 0,
      expenses: []
    }])
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
      if (i === index && category.expenses.length === 1) {
        setExpensesState(expensesState.map((expense, expIndex) => {
          return expIndex === index ? false : expense
        }))
      }
     
      return i === index && expensesState[index] ? {...category, expenses: category.expenses.slice(0, -1)} : category
      
    }))
    
  }

  const handleIconClick = (index) => {
    setExpensesState(expensesState.map((expense, i) => index === i ? !expense : expense
    ))
  }

  const handleChange = (value, index, name, extraData) => {
    setCategories(categories.map((category, i) => {
      if (i !== index) {
        return category
      }
      switch (name) {
        case 'name':
          return {...category, name: value}
        case 'share':
          const share = parseFloat(value)
          if (share >= 0  && categories.reduce((acc, category, i) => {
            return acc + (index === i ? share : category.share)
          }, 0) <= 100) {
            return {...category, share, startingBalance: calculateStartingBalance(category.previousFinalBalance, incomesSum, share)}
          }       
         else {
            return {...category, share: 0, startingBalance: category.previousFinalBalance}
          }
        case 'expenseName':
        case 'expenseAmount':
          return {...category, expenses: category.expenses.map((expense, expIndex) => {
            if  (expIndex === extraData.expIndex) {
              return extraData.name === 'expenseName' ? {...expense, name: value} : {...expense, amount: parseFloat(value) || 0}
            } else return expense
          })}    
        default:
          return category
        }
    }
    ))
  }

  const handleBlur  = () => {
    updateDocument('budgets', currentBudget.docID, {
      categories
    })
  }

  return (
    <div className={styles.budgetContainer}>
      <SectionTitle title='Budget categories:' handleAddClick={handleAddClick} handleDelClick={handleDelClick}/>
      {error && <Error error='There was a problem with saving your data. Please type your changes in budget categories again.'/>}
      {categories.map((category, i) => {
        return ( 
      <div className={styles.categoryContainer} key={i}>
        <div className={styles.budgets}>
          <ColumnHeader text='Name' extraClassName={styles.name}/>
          <ColumnHeader text='Share(%)' extraClassName={styles.share}/>
          <ColumnHeader text='Starting balance' extraClassName={styles.startingBalance}/>
          <ColumnHeader text='Total expenses' extraClassName={styles.totalExpenses}/>
          <ColumnHeader text='Final balance' extraClassName={styles.finalBalance}/>
          <InputCell type='text' index={i} value={category.name} handleChange={handleChange} name='name' handleBlur={handleBlur} extraClassName={styles.nameInput}/>
          <InputCell type='number' index={i} value={category.share.toString()} handleChange={handleChange} name='share' handleBlur={handleBlur} extraClassName={styles.shareInput}/>
          <InputCell disabled={true} type='number' value={category.startingBalance.toString()}/>
          <InputCell disabled={true} type='text' value={categoryStates[i].expensesSum}/>
          <InputCell disabled={true} type='text' value={categoryStates[i].finalBalance}/>
        </div>
        <div className={styles.expensesContainer}>
          <SectionTitle title='expenses' handleAddClick={handleAddExpClick} handleDelClick={handleDelExpClick} handleIconClick={() => {category.expenses.length > 0 ? handleIconClick(i) : handleAddExpClick(i)}} index={i} isContainerVisible={expensesState[i]} size='small'/>
          <div className={styles.expensesDetails}>
            {category.expenses.length > 0 && expensesState[i] &&
            <>
              <ColumnHeader text='Name' size='small' />
              <ColumnHeader text='Amount' size='small' style={{gridColumn: '4/-1'}} />
              {category.expenses.map((expense, expIndex) => {
                return (
                  <React.Fragment  key={expIndex}>
                    <InputCell type='text' index={i} extraData={{expIndex, name: 'expenseName'}} size='small' style={{gridColumn: '1/4'}} value={expense.name} handleChange={handleChange} name='expenseName' handleBlur={handleBlur}/>
                    <InputCell type='number' index={i} extraData={{expIndex, name: 'expenseAmount'}} size='small' style={{gridColumn: '4/-1', width: '50%'}} value={expense.amount.toString()} handleChange={handleChange} name='expenseAmount' handleBlur={handleBlur}/> 
                  </React.Fragment>
                )
              })}
            </>}
          </div>
        </div>
      </div>)
      })}
      <Button label='Next budget' onClick={() => handleModal(true)} size='small' style={{textTransform: 'uppercase', width: '25%', alignSelf: 'end', fontSize: '1.2rem'}}/>
    </div>
  )
}
