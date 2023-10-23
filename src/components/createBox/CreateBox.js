import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAddDocument } from "../../hooks/useAddDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import Form from "../form/Form";
import Input from "../input/Input";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import { sumArray } from "../../utilities/Utilities";

export default function CreateBox({ currentBudget, onBudgetCreated }) {
  const [budgetTitle, setBudgetTitle] = useState("");
  const { user } = useAuthContext();
  const {
    addDocument,
    error,
    isPending,
    docID: newBudgetID,
  } = useAddDocument();
  const {
    updateDocument,
    error: updateDocError,
    isPending: updateDocIsPending,
  } = useUpdateDocument();

  useEffect(() => {
    if (newBudgetID) {
      updateDocument("users", user.uid, {
        currentBudgetID: newBudgetID,
      });
      onBudgetCreated && onBudgetCreated();
    }
  }, [newBudgetID, onBudgetCreated, updateDocument, user.uid]);

  const createBudget = async (previousBudget) => {
    await addDocument("budgets", {
      budgetTitle,
      previousBudgetTitle: previousBudget ? previousBudget.budgetTitle : null,
      createdBy: user.uid,
      incomes: [{ name: "", amount: 0 }],
      incomesSum: 0,
      previousIncome: previousBudget
        ? previousBudget.incomesSum -
          (previousBudget.incomesSum *
            sumArray(previousBudget.categories, "share")) /
            100
        : 0,
      categories: previousBudget
        ? previousBudget.categories.map((category) => {
            const previousFinalBalance =
              category.startingBalance -
              category.expenses.reduce((acc, exp) => {
                return acc + exp.amount;
              }, 0);
            return {
              name: category.name,
              share: category.share,
              startingBalance: previousFinalBalance,
              previousFinalBalance,
              expenses: [],
            };
          })
        : [
            {
              name: "",
              share: 100,
              startingBalance: 0,
              previousFinalBalance: 0,
              expenses: [],
            },
          ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    currentBudget ? createBudget(currentBudget) : createBudget();
    setBudgetTitle("");
  };

  if (isPending || updateDocIsPending) {
    return <Spinner />;
  }

  if (error || updateDocError) {
    return <Error error={error || updateDocError} />;
  }

  return (
    <Form buttonLabel="create" onSubmit={handleSubmit}>
      <Input
        text="Set a title for your budget:"
        type="text"
        onChange={setBudgetTitle}
        value={budgetTitle}
        autoFocus={true}
      />
    </Form>
  );
}
