import React, { useEffect, useMemo, useState } from "react";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import SectionTitle from "../section/SectionTitle";
import Error from "../error/Error";
import styles from "./Income.module.css";
import InputCell from "../input/InputCell";
import ColumnHeader from "../section/ColumnHeader";
import {
  calculateStartingBalance,
  roundToTwoDecimals,
  sumArray,
} from "../../utilities/Utilities";

export default function Income({ currentBudget, setIncomesSum }) {
  const [incomes, setIncomes] = useState(currentBudget.incomes);
  const { updateDocument, error } = useUpdateDocument();
  const { categories, previousIncome } = currentBudget;

  const incomesSum = useMemo(() => {
    return (
      incomes.reduce((acc, income) => {
        return acc + income.amount;
      }, 0) + previousIncome
    );
  }, [incomes, previousIncome]);

  const totalShares = sumArray(categories, "share");

  const incomeToShare = roundToTwoDecimals(
    incomesSum - (incomesSum * totalShares) / 100
  );

  useEffect(() => {
    setIncomesSum(incomesSum);
  }, [incomesSum, setIncomesSum]);

  const handleAddClick = () => {
    setIncomes([...incomes, { name: "", amount: 0 }]);
  };

  const handleDelClick = () => {
    if (incomes.length > 1) {
      setIncomes(incomes.slice(0, -1));
    }
  };

  const handleChange = (value, index, name) => {
    setIncomes(
      incomes.map((income, i) => {
        if (i !== index) {
          return income;
        }
        return name === "name"
          ? { ...income, name: value || "" }
          : { ...income, amount: parseFloat(value) || 0 };
      })
    );
  };

  const handleAmountChange = (value, index) => {
    // FIXME: Cannot remove single 0
    handleChange(value, index, "amount");
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  const handleBlur = () => {
    updateDocument("budgets", currentBudget.docID, {
      incomes,
      incomesSum,
      categories: currentBudget.categories.map((category) => {
        return {
          ...category,
          startingBalance: calculateStartingBalance(
            category.previousFinalBalance,
            incomesSum,
            category.share
          ),
        };
      }),
    });
  };

  return (
    <div className={styles.incomesContainer}>
      <h3 className={styles.budgetTitle}>{currentBudget.budgetTitle}</h3>
      <SectionTitle
        title="Incomes:"
        handleAddClick={handleAddClick}
        handleDelClick={handleDelClick}
      />
      <div className={styles.incomes}>
        <ColumnHeader text="Type of the income" />
        <ColumnHeader text="Amount" />
        {incomes.map((income, i) => {
          return (
            <React.Fragment key={i}>
              <InputCell
                index={i}
                type="text"
                value={income.name || ""}
                handleChange={handleChange}
                name="name"
                onKeyUp={handleKeyUp}
                handleBlur={handleBlur}
              />
              <InputCell
                index={i}
                type="number"
                value={income.amount.toString()}
                handleChange={handleAmountChange}
                name="amount"
                onKeyUp={handleKeyUp}
                handleBlur={handleBlur}
              />
            </React.Fragment>
          );
        })}
        {previousIncome ? (
          <div className={styles.incomeTotal}>Income from previous budget:</div>
        ) : null}
        {previousIncome ? (
          <div className={styles.incomeTotalAmount}>{previousIncome}</div>
        ) : null}
        <div className={styles.incomeTotal}>Total income:</div>
        <div className={styles.incomeTotalAmount}>{incomesSum}</div>
      </div>
      {error && (
        <Error error="There was a problem with saving the data. Please type your update again." />
      )}
    </div>
  );
}
