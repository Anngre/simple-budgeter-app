import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  { useGetDocument } from '../hooks/useGetDocument'
import Icon from "../components/Icon/Icon";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import styles from './CompletedBudget.module.css'
import Spinner from "../components/spinner/Spinner";

export default function CompletedBudget() {
  const { id } = useParams()
  const { document: budget, isPending, error } = useGetDocument('budgets', id)
  const [expensesState, setExpensesState] = useState([])
  
  useEffect(() => {
    if (budget) {
      setExpensesState(budget.categories.map(() => {
        return false
      }))
    }
  },[budget])

  const handleIconClick = (index) => {
    setExpensesState(expensesState.map((expense, i) => {
        return index ===  i ? !expense : expense
      })
    )
  }
  return (
    <div  className={styles.container}>
      <Navbar />
      {isPending ? <div className={styles.spinnerContainer}><Spinner /></div> :
      <>
        <Sidebar />
        {budget && <div className={styles.budgetContainer}><div className={styles.budget}>
          <div className={styles.titleContainer}>
            <h1>{budget.budgetTitle}</h1>
          </div>
          <div className={styles.incomesContainer}>
            <h2>{budget.incomes.length > 1 ? 'Incomes' : 'Income'}</h2>
            {budget.incomes.map((income, i) => {
              return (<React.Fragment key={i}>
                <span className={styles.text}>{income.name || `Income #${i+1}`}</span>
                <div className={styles.amount}>{income.amount}</div>
            </React.Fragment>)
            })}
            {budget.incomes.length > 1 && <>
              <span className={styles.summary}>Total incomes</span>
              <div className={styles.amount}>{budget.incomesSum}</div>
            </>}
          </div>
          {budget.categories.map((category, i) => {
            const expensesSum = category.expenses.reduce((acc, expense) => {
              return (acc + expense.amount)
            }, 0)
          return (<div className={styles.categoryContainer} key={i}>
            <h2>{category.name  || `Category #${i + 1}`}</h2>
            <span className={styles.text}>Income share - {category.share}%</span>
            <div className={styles.amount}>{category.share * budget.incomesSum / 100}</div>
            {budget.previousBudgetTitle && <>
            <span className={styles.text}>Balance from {budget.previousBudgetTitle}</span>
            <div className={styles.amount}>{category.previousFinalBalance}</div>
            </>}
            <div className={styles.totalExpensesBox}>
              <span className={styles.text}>Total expenses</span>
              {expensesSum !== 0 && <Icon name={expensesState[i] ? 'hideIcon' : 'showIcon'} handleIconClick={() => handleIconClick(i)}/>}
            </div>
            <div className={styles.amount}>{expensesSum}</div>
            {expensesState[i] && category.expenses.map((expense, expIndex) => {
              return (<React.Fragment key={expIndex}>
              <span className={styles.expense}>{expense.name || `Expense #${expIndex + 1}`}</span>
              <div className={styles.expenseAmount}>{expense.amount}</div>
              </React.Fragment>)
            })}
            <span className={styles.summary}>Final balance</span>
            <div className={styles.amount}>{category.startingBalance - expensesSum}</div>
          </div>)
          })}
          </div>
        </div>}
      </>}
      
    </div>
  )
}
