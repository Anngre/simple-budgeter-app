import React, { useEffect, useState } from "react";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import SectionTitle from "../section/SectionTitle";
import InputCell from "../input/InputCell";
import ColumnHeader from "../section/ColumnHeader";
import Button from "../button/Button";
import Error from "../error/Error";
import {
  calculateStartingBalance,
  sumArray,
  roundToTwoDecimals,
} from "../../utilities/Utilities";
import styles from "./CurrentBudget.module.css";

export default function CurrentBudget({
  currentBudget,
  incomesSum,
  handleModal,
}) {
  const [categories, setCategories] = useState(currentBudget.categories);
  const [expensesState, setExpensesState] = useState(
    categories.map(() => {
      return false;
    })
  );
  console.log(categories[0].startingBalance);
  const categoryStates = categories.map((category) => {
    const expensesSum = roundToTwoDecimals(
      sumArray(category.expenses, "amount")
    );
    return {
      expensesSum,
      finalBalance: roundToTwoDecimals(category.startingBalance - expensesSum),
    };
  });

  const { updateDocument, error } = useUpdateDocument();

  useEffect(() => {
    setCategories((prevCategories) => {
      return prevCategories.map((category) => {
        return {
          ...category,
          startingBalance: calculateStartingBalance(
            category.previousFinalBalance,
            incomesSum,
            category.share
          ),
        };
      });
    });
  }, [incomesSum]);

  const totalExpenses = sumArray(categoryStates, "expensesSum");

  const totalShares = sumArray(categories, "share");

  const handleAddClick = () => {
    setCategories([
      ...categories,
      {
        name: "",
        share: 100 - totalShares,
        startingBalance: ((100 - totalShares) * incomesSum) / 100,
        previousFinalBalance: 0,
        expenses: [],
      },
    ]);
    setExpensesState([...expensesState, false]);
  };
  const handleDelClick = (index) => {
    const categoriesAfterRemove = categories.filter((category, i) => {
      return i !== index;
    });
    setExpensesState(
      expensesState.filter((exp, i) => {
        return i !== index;
      })
    );
    setCategories(categoriesAfterRemove);
    updateDataInAPI(categoriesAfterRemove);
  };

  const handleAddExpClick = (index) => {
    setCategories(
      categories.map((category, i) => {
        return i === index
          ? {
              ...category,
              expenses: [...category.expenses, { amount: 0, name: "" }],
            }
          : category;
      })
    );
    setExpensesState(
      expensesState.map((expense, i) => {
        return i === index ? true : expense;
      })
    );
  };

  const handleDelExpClick = (index) => {
    setCategories(
      categories.map((category, i) => {
        if (i === index && category.expenses.length === 1) {
          setExpensesState(
            expensesState.map((expense, expIndex) => {
              return expIndex === index ? false : expense;
            })
          );
        }

        return i === index && expensesState[index]
          ? { ...category, expenses: category.expenses.slice(0, -1) }
          : category;
      })
    );
  };

  const handleIconClick = (index) => {
    setExpensesState(
      expensesState.map((expense, i) => (index === i ? !expense : expense))
    );
  };

  const handleChange = (value, index, name, extraData) => {
    setCategories(
      categories.map((category, i) => {
        if (i !== index) {
          return category;
        }
        switch (name) {
          case "name":
            return { ...category, name: value };
          case "share":
            const share = parseFloat(value);
            if (
              share >= 0 &&
              categories.reduce((acc, category, i) => {
                return acc + (index === i ? share : category.share);
              }, 0) <= 100
            ) {
              return {
                ...category,
                share,
                startingBalance: calculateStartingBalance(
                  category.previousFinalBalance,
                  incomesSum,
                  share
                ),
              };
            } else {
              return {
                ...category,
                share: 0,
                startingBalance: category.previousFinalBalance,
              };
            }
          case "expenseName":
          case "expenseAmount":
            return {
              ...category,
              expenses: category.expenses.map((expense, expIndex) => {
                if (expIndex === extraData.expIndex) {
                  return extraData.name === "expenseName"
                    ? { ...expense, name: value }
                    : { ...expense, amount: parseFloat(value) || 0 };
                } else return expense;
              }),
            };
          default:
            return category;
        }
      })
    );
  };

  const updateDataInAPI = (data) => {
    updateDocument("budgets", currentBudget.docID, {
      categories: data,
    });
  };

  const handleBlur = () => {
    updateDataInAPI(categories);
  };

  return (
    <div className={styles.budgetContainer}>
      <SectionTitle
        title="Budget categories:"
        handleAddClick={handleAddClick}
      />
      {error && (
        <Error error="There was a problem with saving your data. Please type your changes in budget categories again." />
      )}
      {categories.map((category, i) => {
        return (
          <div className={styles.categoryContainer} key={i}>
            <div className={styles.budgets}>
              <ColumnHeader text="Name" extraClassName={styles.name} />
              <ColumnHeader text="Share(%)" extraClassName={styles.share} />
              <ColumnHeader
                text="Starting balance"
                extraClassName={styles.startingBalance}
              />
              <ColumnHeader
                text="Total expenses"
                extraClassName={styles.totalExpenses}
              />
              <ColumnHeader
                text="Final balance"
                extraClassName={styles.finalBalance}
              />
              <InputCell
                type="text"
                index={i}
                value={category.name}
                handleChange={handleChange}
                name="name"
                handleBlur={handleBlur}
                extraClassName={styles.nameInput}
              />
              <InputCell
                type="number"
                index={i}
                value={category.share.toString()}
                handleChange={handleChange}
                name="share"
                handleBlur={handleBlur}
                extraClassName={styles.shareInput}
              />
              <InputCell
                disabled={true}
                type="number"
                value={category.startingBalance.toString()}
              />
              <InputCell
                disabled={true}
                type="text"
                value={categoryStates[i].expensesSum}
              />
              <InputCell
                disabled={true}
                type="text"
                value={categoryStates[i].finalBalance}
                extraClassName={
                  categoryStates[i].finalBalance < 0
                    ? styles.negativeFinalBalance
                    : ""
                }
              />
            </div>
            <div className={styles.expensesContainer}>
              <SectionTitle
                title="expenses"
                handleAddClick={handleAddExpClick}
                handleDelClick={handleDelExpClick}
                handleIconClick={() => {
                  category.expenses.length > 0
                    ? handleIconClick(i)
                    : handleAddExpClick(i);
                }}
                index={i}
                isContainerVisible={expensesState[i]}
                size="small"
              />
              <div className={styles.expensesDetails}>
                {category.expenses.length > 0 && expensesState[i] && (
                  <>
                    <ColumnHeader text="Name" size="small" />
                    <ColumnHeader
                      text="Amount"
                      size="small"
                      style={{ gridColumn: "4/-1" }}
                    />
                    {category.expenses.map((expense, expIndex) => {
                      return (
                        <React.Fragment key={expIndex}>
                          <InputCell
                            type="text"
                            index={i}
                            extraData={{ expIndex, name: "expenseName" }}
                            size="small"
                            style={{ gridColumn: "1/4" }}
                            value={expense.name}
                            handleChange={handleChange}
                            name="expenseName"
                            handleBlur={handleBlur}
                          />
                          <InputCell
                            type="number"
                            index={i}
                            extraData={{ expIndex, name: "expenseAmount" }}
                            style={{ gridColumn: "4/-1", width: "50%" }}
                            value={expense.amount.toString()}
                            handleChange={handleChange}
                            name="expenseAmount"
                            handleBlur={handleBlur}
                          />
                        </React.Fragment>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            <div className={styles.deleteButtonBox}>
              <Button
                label="delete"
                size="small"
                onClick={() => handleDelClick(i)}
                style={{
                  width: "8rem",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                  padding: "0.4rem",
                }}
              />
            </div>
          </div>
        );
      })}
      <div className={styles.budgetEnd}>
        <ColumnHeader text="income to share" />
        <ColumnHeader text="overall expenses" />
        <ColumnHeader text="budget balance" />
        <div className={styles.incomeToShare}>
          {roundToTwoDecimals(incomesSum - (incomesSum * totalShares) / 100)}
        </div>
        <div className={styles.overallExpenses}>
          {roundToTwoDecimals(totalExpenses)}
        </div>
        <div className={styles.budgetBalance}>
          {sumArray(categories, "startingBalance") +
            incomesSum -
            roundToTwoDecimals(totalExpenses)}
        </div>
        <Button
          label="next budget"
          onClick={() => handleModal(true)}
          size="small"
          style={{
            textTransform: "uppercase",
            fontSize: "1.2rem",
            gridColumn: "1/-1",
            marginTop: "1.5rem",
            justifySelf: "center",
            width: "50%",
          }}
        />
      </div>
    </div>
  );
}
